import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import session from "express-session";
import cors from "cors";

(async () => {
  try {
    await createConnection();

    const app = express();

    app.use(cors({ credentials: true }));
    app.use(
      session({
        name: process.env.COOKIE_NAME,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: "lax", // csrf
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET!,
        resave: false,
      })
    );

    const schema = await buildSchema({
      resolvers: [`${__dirname}/resolvers/*.ts`],
    });

    const server = new ApolloServer({
      schema,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
})();
