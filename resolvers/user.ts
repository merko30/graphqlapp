import { ApolloError } from "apollo-server";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import User from "../entities/User";
import { BooleanResponse } from "../types/Response";
import UserExists from "../middlewares/UserExists";
import Context from "../types/Context";

import { RegisterInput, LoginInput } from "../types/User";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOne(req.session.userId);
  }

  @Mutation(() => BooleanResponse)
  @UseMiddleware(UserExists)
  async register(@Arg("input") input: RegisterInput) {
    try {
      await User.create(input).save();

      return { ok: true };
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => User)
  async login(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
    const user = await User.findOne({ where: { email: input.email } });

    if (!user) {
      throw new ApolloError("User not found");
    } else {
      const validPassword = await user.comparePassword(input.password);

      if (!validPassword) {
        throw new ApolloError("Wrong password");
      } else {
        ctx.req.session.userId = user.id;

        return user;
      }
    }
  }
}
