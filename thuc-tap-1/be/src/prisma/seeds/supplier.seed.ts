/* eslint-disable */
import { PrismaClient } from '@prisma/client';

/**
 * Seed dữ liệu cho bảng Suppliers
 */
export async function seedSuppliers(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.supplier.deleteMany();
    console.log('🗑️ Đã xóa suppliers cũ');
  }

  // Dữ liệu supplier mẫu
  const suppliers = [
    {
      name: 'Công ty TNHH Unilever Việt Nam',
      code: 'SUP001',
      address: '156 Nguyễn Lương Bằng, P. Tân Phú, Q.7, TP.HCM',
      phone: '02854135555',
      email: 'contact@unilever.com.vn',
      taxCode: '0301234567',
      contactPerson: 'Nguyễn Văn A',
      rating: 4.5,
      paymentTerms: 'Net 30 - Thanh toán trong 30 ngày',
      isActive: true,
    },
    {
      name: 'Công ty CP Thực phẩm Masan',
      code: 'SUP002',
      address: 'Tầng 12, Kumho Asiana Plaza, 39 Lê Duẩn, Q.1, TP.HCM',
      phone: '02862888888',
      email: 'info@masangroup.com',
      taxCode: '0302345678',
      contactPerson: 'Trần Thị B',
      rating: 4.8,
      paymentTerms: 'Net 15 - Thanh toán trong 15 ngày',
      isActive: true,
    },
    {
      name: 'Công ty TNHH PepsiCo Việt Nam',
      code: 'SUP003',
      address: 'Lầu 5, Empress Tower, 138-142 Hai Bà Trưng, Q.1, TP.HCM',
      phone: '02839143888',
      email: 'vietnam@pepsico.com',
      taxCode: '0303456789',
      contactPerson: 'Lê Văn C',
      rating: 4.6,
      paymentTerms: 'COD - Thanh toán khi nhận hàng',
      isActive: true,
    },
    {
      name: 'Công ty CP Acecook Việt Nam',
      code: 'SUP004',
      address: 'Lô II-3, Đường số 11, KCN Tân Bình, TP.HCM',
      phone: '02837510100',
      email: 'contact@acecookvietnam.com',
      taxCode: '0304567890',
      contactPerson: 'Phạm Thị D',
      rating: 4.3,
      paymentTerms: 'Net 45 - Thanh toán trong 45 ngày',
      isActive: true,
    },
    {
      name: 'Công ty TNHH Orion Food Vina',
      code: 'SUP005',
      address: 'KCN Mỹ Phước 3, Bến Cát, Bình Dương',
      phone: '02743567999',
      email: 'info@orionvina.com',
      taxCode: '0305678901',
      contactPerson: 'Hoàng Văn E',
      rating: 4.4,
      paymentTerms: 'Net 30 - Thanh toán trong 30 ngày',
      isActive: true,
    },
  ];

  // Tạo suppliers
  for (const supplierData of suppliers) {
    await client.supplier.upsert({
      where: { code: supplierData.code },
      update: supplierData,
      create: supplierData,
    });
  }

  console.log(`🏢 Tạo ${suppliers.length} suppliers`);
}

/**
 * Seed dữ liệu suppliers để test riêng biệt
 * Chạy: yarn seed:suppliers
 */
export async function seedSuppliersOnly(prisma: PrismaClient) {
  console.log('🏢 Seed Suppliers...');
  await seedSuppliers(prisma);
  console.log('✅ Hoàn thành!');
}