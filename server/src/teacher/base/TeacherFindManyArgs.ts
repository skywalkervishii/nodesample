import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TeacherWhereInput } from "./TeacherWhereInput";
import { Type } from "class-transformer";
import { TeacherOrderByInput } from "./TeacherOrderByInput";

@ArgsType()
class TeacherFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TeacherWhereInput,
  })
  @Field(() => TeacherWhereInput, { nullable: true })
  @Type(() => TeacherWhereInput)
  where?: TeacherWhereInput;

  @ApiProperty({
    required: false,
    type: TeacherOrderByInput,
  })
  @Field(() => TeacherOrderByInput, { nullable: true })
  @Type(() => TeacherOrderByInput)
  orderBy?: TeacherOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { TeacherFindManyArgs };
