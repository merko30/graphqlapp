import { ApolloError } from "apollo-server";
import { MiddlewareFn } from "type-graphql";

import Context from "../types/Context";

const IsAuthenticated: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new ApolloError("Unauthorized");
  } else {
    return next();
  }
};

export default IsAuthenticated;
