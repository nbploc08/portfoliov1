import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsUUID } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({
    example: 'a3c7b1c0-1234-4f3d-b97c-53f6c1b2f1e2',
    description: 'ID danh mục đầu tư',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsNotEmpty()
  portfolioId: string;

  @ApiProperty({
    example: '6e687d6d-1b6a-4d18-9b09-5f9c0e8d1a2b',
    description: 'ID token',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  tokenId: string;

  @ApiProperty({ example: 10.5, description: 'Số lượng token muốn mua/bán' })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
