import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const result = await authenticateUserUseCase.execute({
      password,
      username,
    });

    return response.json(result);
  }
}
