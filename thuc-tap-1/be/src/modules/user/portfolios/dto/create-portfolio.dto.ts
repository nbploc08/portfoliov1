import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreatePortfolioDto {
  @ApiProperty({ example: 'LONG_TERM', description: 'Tên danh mục (sẽ được chuyển về chữ in hoa)' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toUpperCase())
  name: string;
}
