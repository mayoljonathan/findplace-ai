import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  message: string;
}
