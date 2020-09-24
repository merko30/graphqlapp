import { ApolloError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";

import User from "../entities/User";

import Context from "../types/Context";

const UserExists: MiddlewareFn<Context> = async ({ args }, next) => {
  const user = await User.findOne({ where: { email: args.input.email } });

  if (user) {
    throw new ApolloError("User already exists");
  } else {
    return next();
  }
};

export default UserExists;
