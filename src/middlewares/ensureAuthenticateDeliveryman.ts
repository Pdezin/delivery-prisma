import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "561f9847c6f790239c1cb0154349f23d"
    ) as IPayLoad;

    request.id_deliveryman = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
