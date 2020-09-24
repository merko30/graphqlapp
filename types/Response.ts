import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BooleanResponse {
  @Field(() => Boolean)
  ok: boolean;
}
