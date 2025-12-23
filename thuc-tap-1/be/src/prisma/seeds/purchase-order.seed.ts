/* eslint-disable */
import { OrderStatus } from '@/share/enum';
import { PrismaClient } from '@prisma/client';

/**
 * Generate mã đơn nhập hàng
 */
function generatePurchaseOrderCode(index: number): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `PO${year}${month}${String(index + 1).padStart(4, '0')}`;
}

/**
 * Seed dữ liệu cho bảng Purchase Orders
 */
export async function seedPurchaseOrders(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.purchaseOrderItem.deleteMany();
    await client.purchaseOrder.deleteMany();
    console.log('🗑️ Đã xóa purchase orders cũ');
  }

  // Lấy data cần thiết
  const suppliers = await client.supplier.findMany();
  const staff = await client.staff.findMany();
  const products = await client.product.findMany({ 
    include: { 
      productSuppliers: true 
    } 
  });
  
  if (suppliers.length === 0 || staff.length === 0 || products.length === 0) {
    console.log('⚠️ Cần có suppliers, staff và products trước khi seed purchase orders');
    return;
  }

  // Dữ liệu purchase orders mẫu
  const purchaseOrdersData = [
    {
      orderCode: generatePurchaseOrderCode(0),
      supplierId: suppliers[0].id,
      staffId: staff[0].id,
      orderDate: new Date('2024-01-15'),
      expectedDelivery: new Date('2024-01-22'),
      status: OrderStatus.DELIVERED,
      notes: 'Đơn hàng tháng 1 - Đã nhận đủ hàng',
    },
    {
      orderCode: generatePurchaseOrderCode(1),
      supplierId: suppliers[1].id,
      staffId: staff[1].id,
      orderDate: new Date('2024-01-20'),
      expectedDelivery: new Date('2024-01-25'),
      status: OrderStatus.DELIVERED,
      notes: 'Đơn hàng Tết - Đã giao',
    },
    {
      orderCode: generatePurchaseOrderCode(2),
      supplierId: suppliers[2].id,
      staffId: staff[0].id,
      orderDate: new Date('2024-02-01'),
      expectedDelivery: new Date('2024-02-08'),
      status: OrderStatus.PROCESSING,
      notes: 'Đơn hàng đang xử lý',
    },
    {
      orderCode: generatePurchaseOrderCode(3),
      supplierId: suppliers[0].id,
      staffId: staff[2].id,
      orderDate: new Date('2024-02-05'),
      expectedDelivery: new Date('2024-02-12'),
      status: OrderStatus.PENDING,
      notes: 'Đơn hàng mới tạo',
    },
  ];

  // Tạo purchase orders
  for (const orderData of purchaseOrdersData) {
    // Lấy products của supplier này
    const supplierProducts = products.filter(p => 
      p.productSuppliers.some(ps => ps.supplierId === orderData.supplierId)
    ).slice(0, 5); // Lấy tối đa 5 sản phẩm

    if (supplierProducts.length === 0) continue;

    // Tạo purchase order
    const purchaseOrder = await client.purchaseOrder.create({
      data: {
        orderCode: orderData.orderCode,
        supplierId: orderData.supplierId,
        staffId: orderData.staffId,
        orderDate: orderData.orderDate,
        expectedDelivery: orderData.expectedDelivery,
        totalAmount: 0, // Sẽ update sau
        status: orderData.status,
        notes: orderData.notes,
      },
    });

    // Tạo purchase order items
    let totalAmount = 0;
    
    for (const product of supplierProducts) {
      const productSupplier = product.productSuppliers.find(
        ps => ps.supplierId === orderData.supplierId
      );
      
      const quantity = Math.floor(Math.random() * 50) + 20; // 20-70
      const unitPrice = productSupplier?.purchasePrice || product.originalPrice * 0.6;
      const totalPrice = quantity * Number(unitPrice);
      
      await client.purchaseOrderItem.create({
        data: {
          purchaseOrderId: purchaseOrder.id,
          productId: product.id,
          quantity: quantity,
          unitPrice: unitPrice,
          totalPrice: totalPrice,
          receivedQty: orderData.status === OrderStatus.DELIVERED ? quantity : 0,
        },
      });
      
      totalAmount += totalPrice;
    }

    // Update total amount
    await client.purchaseOrder.update({
      where: { id: purchaseOrder.id },
      data: { totalAmount: totalAmount },
    });
  }

  console.log(`📥 Tạo ${purchaseOrdersData.length} purchase orders`);
}

/**
 * Seed dữ liệu purchase orders để test riêng biệt
 * Chạy: yarn seed:purchase-orders
 */
export async function seedPurchaseOrdersOnly(prisma: PrismaClient) {
  console.log('📥 Seed Purchase Orders...');
  await seedPurchaseOrders(prisma);
  console.log('✅ Hoàn thành!');
}