/* eslint-disable*/
import { PrismaClient } from "@prisma/client";

/**
 * Seed dữ liệu cho bảng Tags
 */
export async function seedTags(prisma?: any): Promise<void> {
    const client: any = prisma || new PrismaClient();

    // Xóa dữ liệu cũ (dev only)
    if (process.env.NODE_ENV !== 'production') {
        await client.tag.deleteMany();
        console.log('🗑️ Đã xóDa tags cũ');
    }

    // Dữ liệu tag mẫu
    const tags = [
        // Tags về trạng thái
        {
            name: 'new',
            type: 'status',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'hot',
            type: 'status',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'best-seller',
            type: 'status',
            usageCount: 0,
            isActive: true,
        },
        // Tags về khuyến mãi
        {
            name: 'sale',
            type: 'promotion',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'discount-10',
            type: 'promotion',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'discount-20',
            type: 'promotion',
            usageCount: 0,
            isActive: true,
        },
        // Tags về đặc điểm
        {
            name: 'organic',
            type: 'feature',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'imported',
            type: 'feature',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'local',
            type: 'feature',
            usageCount: 0,
            isActive: true,
        },
        {
            name: 'sugar-free',
            type: 'feature',
            usageCount: 0,
            isActive: true,
        },
    ];
    
    // Tạo tags
    for (const tagData of tags) {
        const tag = await client.tag.upsert({
            where: { name: tagData.name },
            update: tagData,
            create: tagData,
        });
    }

    console.log(`🏷️  Tạo ${tags.length} tags`);
}

/**
    * Seed dữ liệu tags để test riêng biệt
    * Chạy: yarn db:seed:tags
*/
export async function seedTagsOnly(prisma: PrismaClient) {
    console.log('🏷️  Seed Tags...');
    await seedTags(prisma);
    console.log('✅ Hoàn thành!');
}