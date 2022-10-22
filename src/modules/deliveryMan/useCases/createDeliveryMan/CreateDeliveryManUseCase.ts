import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryManUseCase {
  username: string;
  password: string;
}

export class CreateDeliveryManUseCase {
  async execute({ password, username }: ICreateDeliveryManUseCase) {
    const deliverManExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (deliverManExists) {
      throw new Error("Deliveryman already exists");
    }

    const hashPassword = await hash(password, 10);

    const deliverMan = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliverMan;
  }
}
