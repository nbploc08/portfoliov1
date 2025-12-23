/* eslint-disable */
import { OrderStatus, TransactionType } from '@/share/enum';
import { PrismaClient} from '@prisma/client';

/**
 * Seed dữ liệu cho bảng Inventory Transactions
 */
export async function seedInventoryTransactions(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.inventoryTransaction.deleteMany();
    console.log('🗑️ Đã xóa inventory transactions cũ');
  }

  // Lấy data cần thiết
  const staff = await client.staff.findMany();
  const purchaseOrders = await client.purchaseOrder.findMany({
    where: { status: OrderStatus.DELIVERED },
    include: { items: true }
  });
  const salesOrders = await client.salesOrder.findMany({
    where: { status: { in: [OrderStatus.SHIPPED, OrderStatus.DELIVERED] } },
    include: { items: true }
  });
  
  if (staff.length === 0) {
    console.log('⚠️ Cần có staff trước khi seed inventory transactions');
    return;
  }

  // Dữ liệu inventory transactions từ purchase orders (IN)
  for (const po of purchaseOrders) {
    for (const item of po.items) {
      await client.inventoryTransaction.create({
        data: {
          productId: item.productId,
          transactionType: TransactionType.IN,
          quantity: item.receivedQty,
          referenceType: 'PURCHASE_ORDER',
          referenceId: po.id,
          staffId: po.staffId,
          notes: `Nhập hàng từ đơn ${po.orderCode}`,
          createdAt: po.createdAt,
        },
      });

      // Update inventory
      await client.inventory.update({
        where: { productId: item.productId },
        data: { 
          currentQty: { increment: item.receivedQty },
          lastUpdated: new Date()
        },
      });
    }
  }

  // Dữ liệu inventory transactions từ sales orders (OUT)
  for (const so of salesOrders) {
    for (const item of so.items) {
      await client.inventoryTransaction.create({
        data: {
          productId: item.productId,
          transactionType: TransactionType.OUT,
          quantity: item.quantity,
          referenceType: 'SALES_ORDER',
          referenceId: so.id,
          staffId: so.staffId,
          notes: `Xuất hàng cho đơn ${so.orderCode}`,
          createdAt: so.createdAt,
        },
      });

      // Cập nhật inventory
      await client.inventory.update({
        where: { productId: item.productId },
        data: { 
          currentQty: { decrement: item.quantity },
          lastUpdated: new Date()
        },
      });
    }
  }

  // Dữ liệu transactions mẫu
  const products = await client.product.findMany({ take: 5 });
  const adjustmentData = [
    {
      productId: products[0]?.id,
      quantity: 5,
      isIncrease: true,
      notes: 'Điều chỉnh tăng sau kiểm kê tháng 1',
      createdAt: new Date('2024-01-31'),
    },
    {
      productId: products[1]?.id,
      quantity: 3,
      isIncrease: false,
      notes: 'Hàng hỏng, không thể bán',
      createdAt: new Date('2024-02-05'),
    },
    {
      productId: products[2]?.id,
      quantity: 10,
      isIncrease: true,
      notes: 'Tìm thấy hàng tồn chưa ghi nhận',
      createdAt: new Date('2024-02-10'),
    },
  ];

  // Tạo giao dịch
  for (const adjustment of adjustmentData) {
    if (!adjustment.productId) continue;

    await client.inventoryTransaction.create({
      data: {
        productId: adjustment.productId,
        transactionType: TransactionType.ADJUSTMENT,
        quantity: adjustment.quantity,
        referenceType: 'MANUAL_ADJUSTMENT',
        staffId: staff[0].id,
        notes: adjustment.notes,
        createdAt: adjustment.createdAt,
      },
    });

    // Cập nhật inventory
    await client.inventory.update({
      where: { productId: adjustment.productId },
      data: { 
        currentQty: adjustment.isIncrease 
          ? { increment: adjustment.quantity }
          : { decrement: adjustment.quantity },
        lastUpdated: new Date()
      },
    });
  }

  const totalTransactions = await client.inventoryTransaction.count();
  console.log(`📊 Tạo ${totalTransactions} inventory transactions`);
}

/**
 * Seed dữ liệu inventory transactions để test riêng biệt
 * Chạy: yarn seed:inventory-transactions
 */
export async function seedInventoryTransactionsOnly(prisma: PrismaClient) {
  console.log('📊 Seed Inventory Transactions...');
  await seedInventoryTransactions(prisma);
  console.log('✅ Hoàn thành!');
}