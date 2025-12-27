import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toUpperCase())
  name: string;
}
