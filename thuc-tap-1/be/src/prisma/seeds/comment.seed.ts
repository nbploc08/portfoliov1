/* eslint-disable */
import { PrismaClient } from '@prisma/client';

/**
 * Seed dữ liệu cho bảng Comments và GuestComments
 */
export async function seedComments(prisma?: any): Promise<void> {
  const client: any = prisma || new PrismaClient();
  
  // Xóa dữ liệu cũ (dev only)
  if (process.env.NODE_ENV !== 'production') {
    await client.guestComment.deleteMany();
    await client.comment.deleteMany();
    console.log('🗑️ Đã xóa comments cũ');
  }

  // Lấy products và users
  const products = await client.product.findMany({ take: 5 });
  const users = await client.user.findMany({ where: { role: 'USER' } });
  
  if (products.length === 0 || users.length === 0) {
    console.log('⚠️ Cần có products và users trước khi seed comments');
    return;
  }

  // Dữ liệu comments mẫu
  const commentsData = [
    // Comments cho product 1
    {
      productId: products[0]?.id,
      userId: users[0]?.id,
      content: 'Sản phẩm rất tốt, đóng gói cẩn thận. Sẽ mua lại!',
      rating: 5,
      isApproved: true,
    },
    {
      productId: products[0]?.id,
      userId: users[1]?.id,
      parentId: null, // Sẽ update sau
      content: 'Mình cũng đã mua và rất hài lòng!',
      rating: null,
      isApproved: true,
    },
    // Comments cho product 2
    {
      productId: products[1]?.id,
      userId: users[2]?.id,
      content: 'Giá cả hợp lý, chất lượng ổn',
      rating: 4,
      isApproved: true,
    },
    {
      productId: products[1]?.id,
      userId: null, // Guest comment
      content: 'Giao hàng nhanh, đóng gói chắc chắn',
      rating: 5,
      isApproved: true,
      guestInfo: {
        guestName: 'Nguyễn Văn Khách',
        guestEmail: 'khach1@example.com',
        guestPhone: '0901112223',
        guestAddress: 'Q.1, TP.HCM',
      },
    },
    // Comments cho product 3
    {
      productId: products[2]?.id,
      userId: null, // Guest comment
      content: 'Sản phẩm tạm ổn nhưng giá hơi cao',
      rating: 3,
      isApproved: true,
      guestInfo: {
        guestName: 'Trần Thị Lan',
        guestEmail: 'lan@example.com',
        guestPhone: '0902223334',
        guestAddress: null,
      },
    },
    // Comments chưa duyệt
    {
      productId: products[0]?.id,
      userId: null,
      content: 'Chưa hài lòng lắm về chất lượng',
      rating: 2,
      isApproved: false,
      guestInfo: {
        guestName: 'Khách ẩn danh',
        guestEmail: 'anonymous@example.com',
        guestPhone: null,
        guestAddress: null,
      },
    },
  ];

  // Tạo comments
  const createdComments: any[] = [];
  for (const commentData of commentsData) {
    if (!commentData.productId) continue;
    
    const { guestInfo, ...commentInfo } = commentData;
    
    // Tạo comment
    const comment = await client.comment.create({
      data: {
        productId: commentInfo.productId,
        userId: commentInfo.userId,
        parentId: commentInfo.parentId || null,
        content: commentInfo.content,
        rating: commentInfo.rating,
        isApproved: commentInfo.isApproved,
      },
    });
    
    createdComments.push(comment);

    // Nếu là guest comment, tạo guest info
    if (!commentInfo.userId && guestInfo) {
      await client.guestComment.create({
        data: {
          commentId: comment.id,
          guestName: guestInfo.guestName,
          guestEmail: guestInfo.guestEmail,
          guestPhone: guestInfo.guestPhone,
          guestAddress: guestInfo.guestAddress,
        },
      });
    }
  }

  // Update parent comment cho reply
  if (createdComments.length > 1) {
    await client.comment.update({
      where: { id: createdComments[1].id },
      data: { parentId: createdComments[0].id },
    });
  }

  console.log(`💬 Tạo ${createdComments.length} comments`);
}

/**
 * Seed dữ liệu comments để test riêng biệt
 * Chạy: yarn seed:comments
 */
export async function seedCommentsOnly(prisma: PrismaClient) {
  console.log('💬 Seed Comments...');
  await seedComments(prisma);
  console.log('✅ Hoàn thành!');
}