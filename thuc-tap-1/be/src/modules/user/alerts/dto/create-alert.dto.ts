import { ApiProperty } from '@nestjs/swagger';
import { AlertCondition } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAlertDto {
  @ApiProperty({
    example: '6e687d6d-1b6a-4d18-9b09-5f9c0e8d1a2b',
    description: 'ID token cần theo dõi',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  tokenId: string;

  @ApiProperty({
    enum: AlertCondition,
    example: AlertCondition.LT,
    description: 'Điều kiện cảnh báo',
  })
  @IsEnum(AlertCondition)
  @IsNotEmpty()
  condition: AlertCondition;

  @ApiProperty({ example: 1000, description: 'Ngưỡng giá cảnh báo' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @Min(0)
  targetPrice: number;
}
