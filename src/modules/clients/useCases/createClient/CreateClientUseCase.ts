interface ICreateClient {
  usename: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, usename }: ICreateClient) {}
}
