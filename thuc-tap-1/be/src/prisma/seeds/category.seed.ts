/* eslint-disable */
import { PrismaClient } from '@prisma/client';

/**
 * Seed dữ liệu cho bảng Categories
 */
export async function seedCategories(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.category.deleteMany();
    console.log('🗑️ Đã xóa categories cũ');
  }

  // Dữ liệu category mẫu
  const categories = [
    {
      name: 'Đồ ăn nhanh',
      description: 'Các loại đồ ăn nhanh, snack, bánh kẹo',
      imageUrl: '/images/categories/fast-food.jpg',
      isActive: true,
    },
    {
      name: 'Nước giải khát',
      description: 'Nước ngọt, nước trái cây, trà, cà phê',
      imageUrl: '/images/categories/beverages.jpg',
      isActive: true,
    },
    {
      name: 'Đồ gia dụng',
      description: 'Đồ dùng gia đình, vệ sinh, nhà bếp',
      imageUrl: '/images/categories/household.jpg',
      isActive: true,
    },
    {
      name: 'Văn phòng phẩm',
      description: 'Bút, vở, giấy và các dụng cụ văn phòng',
      imageUrl: '/images/categories/stationery.jpg',
      isActive: true,
    },
    {
      name: 'Chăm sóc cá nhân',
      description: 'Mỹ phẩm, dầu gội, sữa tắm, kem đánh răng',
      imageUrl: '/images/categories/personal-care.jpg',
      isActive: true,
    },
  ];

  // Tạo categories - dùng create thay upsert vì không unique
  for (const categoryData of categories) {
    await client.category.create({
      data: categoryData,
    });
  }

  console.log(`📁 Tạo ${categories.length} categories`);
}

/**
 * Seed dữ liệu categories để test riêng biệt
 * Chạy: yarn seed:categories
 */
export async function seedCategoriesOnly(prisma: PrismaClient) {
  console.log('📁 Seed Categories...');
  await seedCategories(prisma);
  console.log('✅ Hoàn thành!');
}