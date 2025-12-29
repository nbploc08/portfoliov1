import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Min } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsUUID } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsNotEmpty()
  portfolioId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  tokenId: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
