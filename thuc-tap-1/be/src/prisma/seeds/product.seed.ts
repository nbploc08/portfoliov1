/* eslint-disable */
import { PrismaClient } from '@prisma/client';

/**
 * Helper function để tạo mã sản phẩm
 */
function generateProductCode(index: number): string {
  return `SP${String(index + 1).padStart(5, '0')}`;
}

/**
 * Seed dữ liệu cho bảng Products và các bảng liên quan
 */
export async function seedProducts(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.productTag.deleteMany();
    await client.productImage.deleteMany();
    await client.productSupplier.deleteMany();
    await client.inventory.deleteMany();
    await client.product.deleteMany();
    console.log('🗑️ Đã xóa products và dữ liệu liên quan');
  }

  // Kiểm tra categories, tags, suppliers
  const categories = await client.category.findMany();
  const tags = await client.tag.findMany();
  const suppliers = await client.supplier.findMany();

  if (categories.length === 0) {
    console.log('⚠️ Cần seed categories trước');
    return;
  }

  // Data sản phẩm
  const productsData = [
    // Đồ ăn nhanh
    {
      name: 'Mì 3 Miền tôm chua cay gói 65g',
      code: generateProductCode(0),
      categoryName: 'Đồ ăn nhanh',
      description: 'Mì ăn liền 3 Miền vị tôm chua cay thơm ngon, tiện lợi cho bữa ăn nhanh',
      originalPrice: 4000,
      salePrice: 3500,
      purchaseCount: 150,
      isActive: true,
    },
    {
      name: 'Snack Oishi bắp ngọt 45g',
      code: generateProductCode(1),
      categoryName: 'Đồ ăn nhanh',
      description: 'Snack bắp ngọt Oishi giòn tan, vị ngọt tự nhiên',
      originalPrice: 7000,
      salePrice: 7000,
      purchaseCount: 200,
      isActive: true,
    },
    {
      name: 'Bánh Oreo Original 137g',
      code: generateProductCode(2),
      categoryName: 'Đồ ăn nhanh',
      description: 'Bánh quy Oreo nhân kem vani, nhập khẩu từ Mỹ',
      originalPrice: 25000,
      salePrice: 22000,
      purchaseCount: 80,
      isActive: true,
    },
    // Nước giải khát
    {
      name: 'Coca Cola lon 330ml',
      code: generateProductCode(3),
      categoryName: 'Nước giải khát',
      description: 'Nước ngọt Coca Cola lon 330ml - Thương hiệu nổi tiếng thế giới',
      originalPrice: 10000,
      salePrice: 9000,
      purchaseCount: 300,
      isActive: true,
    },
    {
      name: 'Trà xanh C2 hương chanh 455ml',
      code: generateProductCode(4),
      categoryName: 'Nước giải khát',
      description: 'Trà xanh C2 hương chanh tự nhiên, giải khát',
      originalPrice: 8000,
      salePrice: 8000,
      purchaseCount: 250,
      isActive: true,
    },
    {
      name: 'Nước suối Aquafina 500ml',
      code: generateProductCode(5),
      categoryName: 'Nước giải khát',
      description: 'Nước suối tinh khiết Aquafina 500ml',
      originalPrice: 5000,
      salePrice: 5000,
      purchaseCount: 500,
      isActive: true,
    },
    // Đồ gia dụng
    {
      name: 'Nước rửa chén Sunlight chanh 750ml',
      code: generateProductCode(6),
      categoryName: 'Đồ gia dụng',
      description: 'Nước rửa chén Sunlight hương chanh tươi, sạch dầu mỡ hiệu quả',
      originalPrice: 35000,
      salePrice: 32000,
      purchaseCount: 120,
      isActive: true,
    },
    {
      name: 'Giấy vệ sinh Pulppy 10 cuộn',
      code: generateProductCode(7),
      categoryName: 'Đồ gia dụng',
      description: 'Giấy vệ sinh cao cấp Pulppy 3 lớp, mềm mại',
      originalPrice: 55000,
      salePrice: 55000,
      purchaseCount: 90,
      isActive: true,
    },
    // Văn phòng phẩm
    {
      name: 'Bút bi Thiên Long TL-027',
      code: generateProductCode(8),
      categoryName: 'Văn phòng phẩm',
      description: 'Bút bi Thiên Long màu xanh, viết êm',
      originalPrice: 3000,
      salePrice: 3000,
      purchaseCount: 400,
      isActive: true,
    },
    {
      name: 'Vở kẻ ngang 200 trang',
      code: generateProductCode(9),
      categoryName: 'Văn phòng phẩm',
      description: 'Vở học sinh 200 trang, giấy trắng chất lượng',
      originalPrice: 15000,
      salePrice: 14000,
      purchaseCount: 150,
      isActive: true,
    },
    // Chăm sóc cá nhân
    {
      name: 'Dầu gội Clear Men 180ml',
      code: generateProductCode(10),
      categoryName: 'Chăm sóc cá nhân',
      description: 'Dầu gội Clear Men mát lạnh, sạch gàu',
      originalPrice: 65000,
      salePrice: 60000,
      purchaseCount: 100,
      isActive: true,
    },
    {
      name: 'Kem đánh răng PS bảo vệ 123 180g',
      code: generateProductCode(11),
      categoryName: 'Chăm sóc cá nhân',
      description: 'Kem đánh răng PS bảo vệ toàn diện',
      originalPrice: 32000,
      salePrice: 30000,
      purchaseCount: 180,
      isActive: true,
    },
  ];

  // Tạo products
  for (const productData of productsData) {
    const category = categories.find(c => c.name === productData.categoryName);
    if (!category) continue;

    // Tạo product
    const product = await client.product.create({
      data: {
        name: productData.name,
        code: productData.code,
        categoryId: category.id,
        description: productData.description,
        originalPrice: productData.originalPrice,
        salePrice: productData.salePrice,
        purchaseCount: productData.purchaseCount,
        isActive: productData.isActive,
      },
    });

    // Tạo product images (2 ảnh cho mỗi sản phẩm)
    await client.productImage.create({
      data: {
        productId: product.id,
        imageUrl: `/images/products/${product.code}-1.jpg`,
        isPrimary: true,
        sortOrder: 0,
      },
    });

    await client.productImage.create({
      data: {
        productId: product.id,
        imageUrl: `/images/products/${product.code}-2.jpg`,
        isPrimary: false,
        sortOrder: 1,
      },
    });

    // Tạo product tags (random 2-3 tags)
    if (tags.length > 0) {
      const numTags = Math.floor(Math.random() * 2) + 2; // 2-3 tags
      const shuffledTags = [...tags].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numTags && i < shuffledTags.length; i++) {
        await client.productTag.create({
          data: {
            productId: product.id,
            tagId: shuffledTags[i].id,
          },
        });
      }
    }

    // Tạo inventory
    await client.inventory.create({
      data: {
        productId: product.id,
        currentQty: Math.floor(Math.random() * 100) + 50, // 50-150
        minQty: 10,
        maxQty: 200,
        location: `A${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 10) + 1}`,
      },
    });

    // Tạo product-supplier (1-2 suppliers cho mỗi product)
    if (suppliers.length > 0) {
      const numSuppliers = Math.floor(Math.random() * 2) + 1; // 1-2 suppliers
      const shuffledSuppliers = [...suppliers].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < numSuppliers && i < shuffledSuppliers.length; i++) {
        await client.productSupplier.create({
          data: {
            productId: product.id,
            supplierId: shuffledSuppliers[i].id,
            purchasePrice: product.originalPrice * 0.6, // Giá nhập = 60% giá gốc
            leadTime: Math.floor(Math.random() * 7) + 1, // 1-7 ngày
            isPreferred: i === 0,
          },
        });
      }
    }
  }

  console.log(`📦 Tạo ${productsData.length} products với images, tags, inventory và suppliers`);
}

/**
 * Seed dữ liệu products để test riêng biệt
 * Chạy: yarn seed:products
 */
export async function seedProductsOnly(prisma: PrismaClient) {
  console.log('📦 Seed Products...');
  await seedProducts(prisma);
  console.log('✅ Hoàn thành!');
}