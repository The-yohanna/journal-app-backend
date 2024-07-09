import { IsString } from 'class-validator';

export class CreateJournalDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  category: string;

  @IsString()
  created_by: string;
}
