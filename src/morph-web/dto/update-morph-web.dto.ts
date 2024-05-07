import { PartialType } from '@nestjs/mapped-types';
import { CreateMorphWebDto } from './create-morph-web.dto';

export class UpdateMorphWebDto extends PartialType(CreateMorphWebDto) {}
