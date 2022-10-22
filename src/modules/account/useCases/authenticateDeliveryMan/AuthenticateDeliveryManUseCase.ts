import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryMan {
  username: string;
  password: string;
}

export class AuthenticateDeliveryManUseCase {
  async execute({ username, password }: IAuthenticateDeliveryMan) {
    const deliveryMan = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryMan) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, deliveryMan.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "561f9847c6f790239c1cb0154349f23d", {
      subject: deliveryMan.id,
      expiresIn: "1d",
    });

    return {
      token,
    };
  }
}
