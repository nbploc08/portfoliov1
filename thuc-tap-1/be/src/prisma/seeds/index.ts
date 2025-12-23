/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { seedUsersOnly } from '@/prisma/seeds/user.seed';
// Import thêm các seed khác ở đây
import { seedCategoriesOnly } from '@/prisma/seeds/category.seed';
import { seedTagsOnly } from '@/prisma/seeds/tag.seed';
import { seedSuppliersOnly } from '@/prisma/seeds/supplier.seed';
import { seedStaffOnly } from '@/prisma/seeds/staff.seed';
import { seedProductsOnly } from '@/prisma/seeds/product.seed';
import { seedCommentsOnly } from '@/prisma/seeds/comment.seed';
import { seedPurchaseOrdersOnly } from '@/prisma/seeds/purchase-order.seed';
import { seedSalesOrdersOnly } from '@/prisma/seeds/sales-order.seed';
import { seedInventoryTransactionsOnly } from '@/prisma/seeds/inventory-transaction.seed';

const prisma = new PrismaClient();

/**
 * Runner để chạy seed từng bảng riêng biệt
 */
async function runSingleSeed() {
  const seedType = process.argv[2];

  try {
    switch (seedType) {
      case 'users':
        await seedUsersOnly(prisma);
        break;

      // Thêm cases khác khi có thêm table
      case 'categories':
        await seedCategoriesOnly(prisma);
        break;

      case 'tags':
        await seedTagsOnly(prisma);
        break;

      case 'suppliers':
        await seedSuppliersOnly(prisma);
        break;

      case 'staff':
        await seedStaffOnly(prisma);
        break;

      case 'products':
        await seedProductsOnly(prisma);
        break;

      case 'comments':
        await seedCommentsOnly(prisma);
        break;

      case 'purchase-orders':
        await seedPurchaseOrdersOnly(prisma);
        break;

      case 'sales-orders':
        await seedSalesOrdersOnly(prisma);
        break;

      case 'inventory-transactions':
        await seedInventoryTransactionsOnly(prisma);
        break;

      case 'all':
        console.log('🌱 Bắt đầu seed tất cả test data...');
        await seedUsersOnly(prisma);
        console.log('✅ Users seeded');
        await seedCategoriesOnly(prisma);
        console.log('✅ Categories seeded');
        await seedTagsOnly(prisma);
        console.log('✅ Tags seeded');
        await seedSuppliersOnly(prisma);
        console.log('✅ Suppliers seeded');
        await seedStaffOnly(prisma);
        console.log('✅ Staff seeded');
        await seedProductsOnly(prisma);
        console.log('✅ Products seeded');
        await seedCommentsOnly(prisma);
        console.log('✅ Comments seeded');
        await seedPurchaseOrdersOnly(prisma);
        console.log('✅ Purchase Orders seeded');
        await seedSalesOrdersOnly(prisma);
        console.log('✅ Sales Orders seeded');
        await seedInventoryTransactionsOnly(prisma);
        console.log('✅ Inventory Transactions seeded');
        console.log('🎉 Tất cả test data đã được seed thành công!');
        break;

      default:
        console.log('❌ Seed type không hợp lệ');
        console.log('Các seed type có sẵn:');
        console.log('- all (chạy tất cả test data)');
        console.log('- users');
        console.log('- categories');
        console.log('- tags');
        console.log('- suppliers');
        console.log('- staff');
        console.log('- products');
        console.log('- comments');
        console.log('- purchase-orders');
        console.log('- sales-orders');
        console.log('- inventory-transactions');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Lỗi khi seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Chạy nếu file này được gọi trực tiếp
if (require.main === module) {
  runSingleSeed();
}

// Export các seed functions
export { seedUsersOnly } from '@/prisma/seeds/user.seed';
// Export thêm khi có
// export { seedProductsOnly } from '@/prisma/seeds/product.seed';

// TODO: Uncomment khi có product và category
export { seedCategoriesOnly } from '@/prisma/seeds/category.seed';
export { seedTagsOnly } from '@/prisma/seeds/tag.seed';
export { seedSuppliersOnly } from '@/prisma/seeds/supplier.seed';
export { seedStaffOnly } from '@/prisma/seeds/staff.seed';
export { seedProductsOnly } from '@/prisma/seeds/product.seed';
export { seedCommentsOnly } from '@/prisma/seeds/comment.seed';
export { seedPurchaseOrdersOnly } from '@/prisma/seeds/purchase-order.seed';
export { seedSalesOrdersOnly } from '@/prisma/seeds/sales-order.seed';
export { seedInventoryTransactionsOnly } from '@/prisma/seeds/inventory-transaction.seed';