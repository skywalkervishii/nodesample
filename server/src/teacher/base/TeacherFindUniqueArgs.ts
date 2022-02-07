import { ArgsType, Field } from "@nestjs/graphql";
import { TeacherWhereUniqueInput } from "./TeacherWhereUniqueInput";

@ArgsType()
class TeacherFindUniqueArgs {
  @Field(() => TeacherWhereUniqueInput, { nullable: false })
  where!: TeacherWhereUniqueInput;
}

export { TeacherFindUniqueArgs };
