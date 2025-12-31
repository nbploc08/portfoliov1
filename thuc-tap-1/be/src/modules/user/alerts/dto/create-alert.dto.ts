import { AlertCondition } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAlertDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  tokenId: string;

  @IsEnum(AlertCondition)
  @IsNotEmpty()
  condition: AlertCondition;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @Min(0)
  targetPrice: number;
}
