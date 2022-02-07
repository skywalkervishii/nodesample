import { ArgsType, Field } from "@nestjs/graphql";
import { TeacherWhereUniqueInput } from "./TeacherWhereUniqueInput";

@ArgsType()
class DeleteTeacherArgs {
  @Field(() => TeacherWhereUniqueInput, { nullable: false })
  where!: TeacherWhereUniqueInput;
}

export { DeleteTeacherArgs };
