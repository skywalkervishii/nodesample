import { ArgsType, Field } from "@nestjs/graphql";
import { TeacherWhereUniqueInput } from "./TeacherWhereUniqueInput";
import { TeacherUpdateInput } from "./TeacherUpdateInput";

@ArgsType()
class UpdateTeacherArgs {
  @Field(() => TeacherWhereUniqueInput, { nullable: false })
  where!: TeacherWhereUniqueInput;
  @Field(() => TeacherUpdateInput, { nullable: false })
  data!: TeacherUpdateInput;
}

export { UpdateTeacherArgs };
