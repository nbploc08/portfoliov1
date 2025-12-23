/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { OrderStatus, PaymentStatus, UserRole } from '@/share/enum';

/**
 * Generate mã đơn bán hàng
 */
function generateSalesOrderCode(index: number): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `SO${year}${month}${String(index + 1).padStart(4, '0')}`;
}

/**
 * Seed dữ liệu cho bảng Sales Orders
 */
export async function seedSalesOrders(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.salesOrderItem.deleteMany();
    await client.salesOrder.deleteMany();
    console.log('🗑️ Đã xóa sales orders cũ');
  }

  // Lấy data cần thiết
  const customers = await client.user.findMany({ where: { role: UserRole.USER } });
  const staff = await client.staff.findMany();
  const products = await client.product.findMany();
  
  if (customers.length === 0 || staff.length === 0 || products.length === 0) {
    console.log('⚠️ Cần có customers, staff và products trước khi seed sales orders');
    return;
  }

  // Dữ liệu sales orders mẫu
  const salesOrdersData = [
    {
      orderCode: generateSalesOrderCode(0),
      customerId: customers[0].id,
      staffId: staff[0].id,
      orderDate: new Date('2024-01-10'),
      deliveryAddress: customers[0].address,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      notes: 'Đơn hàng đã giao thành công',
    },
    {
      orderCode: generateSalesOrderCode(1),
      customerId: customers[1].id,
      staffId: staff[1].id,
      orderDate: new Date('2024-01-15'),
      deliveryAddress: customers[1].address,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      notes: 'Khách hàng hài lòng',
    },
    {
      orderCode: generateSalesOrderCode(2),
      customerId: customers[2].id,
      staffId: staff[2].id,
      orderDate: new Date('2024-01-20'),
      deliveryAddress: '123 Lý Thái Tổ, Q.10, TP.HCM',
      status: OrderStatus.SHIPPED,
      paymentStatus: PaymentStatus.PAID,
      notes: 'Đang giao hàng',
    },
    {
      orderCode: generateSalesOrderCode(3),
      customerId: customers[0].id,
      staffId: staff[0].id,
      orderDate: new Date('2024-01-25'),
      deliveryAddress: customers[0].address,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.PENDING,
      notes: 'Đang chuẩn bị hàng',
    },
    {
      orderCode: generateSalesOrderCode(4),
      customerId: customers[1].id,
      staffId: staff[1].id,
      orderDate: new Date('2024-02-01'),
      deliveryAddress: customers[1].address,
      status: OrderStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PENDING,
      notes: 'Đã xác nhận đơn',
    },
    {
      orderCode: generateSalesOrderCode(5),
      customerId: customers[2].id,
      staffId: staff[2].id,
      orderDate: new Date('2024-02-05'),
      deliveryAddress: customers[2].address,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      notes: 'Đơn hàng mới',
    },
    {
      orderCode: generateSalesOrderCode(6),
      customerId: customers[0].id,
      staffId: staff[0].id,
      orderDate: new Date('2024-01-18'),
      deliveryAddress: customers[0].address,
      status: OrderStatus.CANCELLED,
      paymentStatus: PaymentStatus.REFUNDED,
      notes: 'Khách hủy đơn - đã hoàn tiền',
    },
  ];

  // Tạo sales orders
  for (const orderData of salesOrdersData) {
    // Random 2-5 sản phẩm cho mỗi đơn
    const numProducts = Math.floor(Math.random() * 4) + 2;
    const selectedProducts = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, numProducts);

    // Tạo sales order
    const salesOrder = await client.salesOrder.create({
      data: {
        orderCode: orderData.orderCode,
        customerId: orderData.customerId,
        staffId: orderData.staffId,
        orderDate: orderData.orderDate,
        deliveryAddress: orderData.deliveryAddress,
        totalAmount: 0, // Sẽ update sau
        discountAmount: 0,
        finalAmount: 0,
        status: orderData.status,
        paymentStatus: orderData.paymentStatus,
        notes: orderData.notes,
      },
    });

    // Tạo sales order items
    let totalAmount = 0;
    
    for (const product of selectedProducts) {
      const quantity = Math.floor(Math.random() * 5) + 1; // 1-5
      const unitPrice = product.salePrice;
      const discountPercent = Math.random() > 0.7 ? 10 : 0; // 30% chance discount 10%
      const totalPrice = quantity * Number(unitPrice) * (1 - discountPercent / 100);
      
      await client.salesOrderItem.create({
        data: {
          salesOrderId: salesOrder.id,
          productId: product.id,
          quantity: quantity,
          unitPrice: unitPrice,
          discountPercent: discountPercent,
          totalPrice: totalPrice,
        },
      });
      
      totalAmount += totalPrice;
    }

    // Apply order discount cho đơn > 500k
    const orderDiscount = totalAmount > 500000 ? totalAmount * 0.05 : 0;
    const finalAmount = totalAmount - orderDiscount;

    // Update amounts
    await client.salesOrder.update({
      where: { id: salesOrder.id },
      data: { 
        totalAmount: totalAmount,
        discountAmount: orderDiscount,
        finalAmount: finalAmount,
      },
    });
  }

  console.log(`💰 Tạo ${salesOrdersData.length} sales orders`);
}

/**
 * Seed dữ liệu sales orders để test riêng biệt
 * Chạy: yarn seed:sales-orders
 */
export async function seedSalesOrdersOnly(prisma: PrismaClient) {
  console.log('💰 Seed Sales Orders...');
  await seedSalesOrders(prisma);
  console.log('✅ Hoàn thành!');
}