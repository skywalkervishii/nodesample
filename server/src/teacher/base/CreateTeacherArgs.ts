import { ArgsType, Field } from "@nestjs/graphql";
import { TeacherCreateInput } from "./TeacherCreateInput";

@ArgsType()
class CreateTeacherArgs {
  @Field(() => TeacherCreateInput, { nullable: false })
  data!: TeacherCreateInput;
}

export { CreateTeacherArgs };
