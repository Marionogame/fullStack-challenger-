import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsDate,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

// Base DTOs
@InputType()
class CacheControlDTO {
  @Field()
  @IsString()
  cache: string;

  @Field(() => Date)
  @IsDate()
  expireAt: Date | null;
}

@InputType()
class DataMetaDTO {
  @Field(() => CacheControlDTO)
  @ValidateNested()
  @Type(() => CacheControlDTO)
  cacheControl: CacheControlDTO;
}

@InputType()
class DataAttributesDTO {
  @Field()
  @IsString()
  title: string;

  @Field(() => Date)
  @IsDate()
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  @IsString()
  description: string | null;
}

@InputType()
class DataDTO {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  id: string;

  @Field(() => DataAttributesDTO)
  @ValidateNested()
  @Type(() => DataAttributesDTO)
  attributes: DataAttributesDTO;

  @Field(() => DataMetaDTO)
  @ValidateNested()
  @Type(() => DataMetaDTO)
  meta: DataMetaDTO;
}

// Nested DTOs
@InputType()
class ValueDTO {
  @Field()
  @IsNumber()
  value: number;

  @Field()
  @IsNumber()
  percentage: number;

  @Field(() => Date)
  @IsDate()
  datetime: Date;
}

@InputType()
class ContentAttributesDTO {
  @Field()
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  color: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  icon: string | null;

  @Field()
  @IsString()
  type: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  magnitude: string | null;

  @Field()
  @IsBoolean()
  composite: boolean;

  @Field(() => Date)
  @IsDate()
  lastUpdate: Date;

  @Field(() => [ValueDTO])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValueDTO)
  values: ValueDTO[];

  @Field()
  @IsNumber()
  total: number;

  @Field()
  @IsNumber()
  totalPercentage: number;
}

@InputType()
class ContentItemDTO {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  id: string;

  @Field()
  @IsString()
  groupId: string;

  @Field(() => ContentAttributesDTO)
  @ValidateNested()
  @Type(() => ContentAttributesDTO)
  attributes: ContentAttributesDTO;
}

@InputType()
class IncludedAttributesDTO {
  @Field()
  @IsString()
  title: string;

  @Field(() => Date)
  @IsDate()
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  magnitude: string | null;

  @Field(() => [ContentItemDTO])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentItemDTO)
  content: ContentItemDTO[];
}

@InputType()
class IncludedDTO {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  id: string;

  @Field(() => IncludedAttributesDTO)
  @ValidateNested()
  @Type(() => IncludedAttributesDTO)
  attributes: IncludedAttributesDTO;
}

// Main DTO
@InputType()
export class CreateReeInputDTO {
  @Field(() => DataDTO)
  @ValidateNested()
  @Type(() => DataDTO)
  data: DataDTO;

  @Field(() => [IncludedDTO], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IncludedDTO)
  included?: IncludedDTO[];

  @Field(() => Date)
  @IsDate()
  createdAt: Date;
  @Field(() => Date)
  @IsDate()
  updatedAt: Date;
}
