/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import { UserRole } from '@/share/enum';

/**
 * Seed dữ liệu cho bảng Users
 */
export async function seedUsers(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.user.deleteMany();
    console.log('🗑️ Đã xóa users cũ');
  }

  // Dữ liệu user mẫu
  const users = [
    {
      email: 'admin@minishop.com',
      username: 'admin',
      password: 'hashed_password_admin', // Trong thực tế nên hash
      fullName: 'Nguyễn Văn A',
      address: '123 Nguyễn Văn A, Q1, TP.HCM',
      phone: '0901234567',
      role: UserRole.ADMIN,
      avatarUrl: '/avatars/admin.jpg',
      isActive: true,
    },
    {
      email: 'manager@minishop.com',
      username: 'manager',
      password: 'hashed_password_manager',
      fullName: 'Nguyễn Văn B',
      address: '456 Lê Lai, Q1, TP.HCM',
      phone: '0901234568',
      role: UserRole.STAFF,
      avatarUrl: '/avatars/manager.jpg',
      isActive: true,
    },
    {
      email: 'staff1@minishop.com',
      username: 'staff1',
      password: 'hashed_password_staff1',
      fullName: 'Lê Nhân Viên',
      address: '789 Hai Bà Trưng, Q3, TP.HCM',
      phone: '0901234569',
      role: UserRole.STAFF,
      avatarUrl: '/avatars/staff1.jpg',
      isActive: true,
    },
    {
      email: 'user1@gmail.com',
      username: 'user1',
      password: 'hashed_password_user1',
      fullName: 'Phạm Văn Khách',
      address: '456 Trần Hưng Đạo, Q5, TP.HCM',
      phone: '0912345678',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user2@gmail.com',
      username: 'user2',
      password: 'hashed_password_user2',
      fullName: 'Hoàng Thị Mai',
      address: '789 Lê Văn Sỹ, Q3, TP.HCM',
      phone: '0923456789',
      role: UserRole.USER,
      isActive: true,
    },
    {
      email: 'user3@gmail.com',
      username: 'user3',
      password: 'hashed_password_user3',
      fullName: 'Võ Minh Tuấn',
      address: '321 Cách Mạng Tháng 8, Q10, TP.HCM',
      phone: '0934567890',
      role: UserRole.USER,
      isActive: true,
    },
  ];

  // Tạo users
  for (const userData of users) {
    await client.user.upsert({
      where: { email: userData.email },
      update: userData,
      create: userData,
    });
  }

  console.log(`📝 Tạo ${users.length} users`);
}

/**
 * Seed dữ liệu users để test riêng biệt
 * Chạy: yarn db:seed:users
 */
export async function seedUsersOnly(prisma: PrismaClient) {
  console.log('👤 Seed Users...');
  await seedUsers(prisma);
  console.log('✅ Hoàn thành!');
}