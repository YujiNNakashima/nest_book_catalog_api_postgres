import {
  IsBoolean,
  Min,
  IsNumber,
  IsString
} from 'class-validator';

export class CheckBodyDTO {

  @IsBoolean()
  readonly isBoolean: boolean;

  @IsNumber()
  readonly isNumber: number;

  @IsString()
  readonly isString: string;

  @IsString()
  readonly isBiggerThan5char: string;
}