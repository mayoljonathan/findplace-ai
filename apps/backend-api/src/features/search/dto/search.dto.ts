import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchDto {
  @IsString()
  @IsNotEmpty({
    message:
      'Enter what you are looking for and we will suggest places for you',
  })
  @Transform(({ value }) => value.trim())
  message: string;
}
