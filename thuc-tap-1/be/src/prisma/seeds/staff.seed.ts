/* eslint-disable */
import { PrismaClient } from '@prisma/client';

/**
 * Seed dữ liệu cho bảng Staff
 */
export async function seedStaff(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.staff.deleteMany();
    console.log('🗑️ Đã xóa staff cũ');
  }

  // Lấy users với role ADMIN và STAFF
  const adminUser = await client.user.findFirst({
    where: { email: 'admin@minishop.com' }
  });

  const managerUser = await client.user.findFirst({
    where: { email: 'manager@minishop.com' }
  });

  const staffUser = await client.user.findFirst({
    where: { email: 'staff1@minishop.com' }
  });

  if (!adminUser || !managerUser || !staffUser) {
    console.log('⚠️ Cần seed users trước khi seed staff');
    return;
  }

  // Dữ liệu staff mẫu
  const staffData = [
    {
      userId: adminUser.id,
      employeeCode: 'EMP001',
      department: 'Management',
      position: 'Store Manager',
      hireDate: new Date('2020-01-15'),
      salary: 20000000,
      managerId: null,
      isActive: true,
    },
    {
      userId: managerUser.id,
      employeeCode: 'EMP002',
      department: 'Sales',
      position: 'Sales Manager',
      hireDate: new Date('2021-03-20'),
      salary: 15000000,
      managerId: null, // Sẽ update sau
      isActive: true,
    },
    {
      userId: staffUser.id,
      employeeCode: 'EMP003',
      department: 'Sales',
      position: 'Sales Staff',
      hireDate: new Date('2022-06-10'),
      salary: 8000000,
      managerId: null, // Sẽ update sau
      isActive: true,
    },
  ];

  // Tạo staff records
  const createdStaff: any[] = [];
  for (const data of staffData) {
    const staff = await client.staff.upsert({
      where: { employeeCode: data.employeeCode },
      update: data,
      create: data,
    });
    createdStaff.push(staff);
  }

  // Update manager relationships
  await client.staff.update({
    where: { id: createdStaff[1].id },
    data: { managerId: createdStaff[0].id }, // Sales Manager báo cáo cho Store Manager
  });

  await client.staff.update({
    where: { id: createdStaff[2].id },
    data: { managerId: createdStaff[1].id }, // Sales Staff báo cáo cho Sales Manager
  });

  console.log(`👔 Tạo ${createdStaff.length} staff records`);
}

/**
 * Seed dữ liệu staff để test riêng biệt
 * Chạy: yarn seed:staff
 */
export async function seedStaffOnly(prisma: PrismaClient) {
  console.log('👔 Seed Staff...');
  await seedStaff(prisma);
  console.log('✅ Hoàn thành!');
}