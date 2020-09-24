import { Request, Response } from "express";

export default interface Context {
  req: Request & { session: Express.Session };
  res: Response;
}
