import { PartialType } from '@nestjs/swagger';
import { CreateAxioDto } from './create-axio.dto';

export class UpdateAxioDto extends PartialType(CreateAxioDto) {}
