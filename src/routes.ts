import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliveryManController } from "./modules/account/useCases/authenticateDeliveryMan/AuthenticateDeliveryManController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/CreateDeliveryController";
import { CreateDeliveryManController } from "./modules/deliveryMan/useCases/createDeliveryMan/CreateDeliveryManController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliveryManController = new CreateDeliveryManController();
const authenticateDeliveryManController =
  new AuthenticateDeliveryManController();
const createDeliveruController = new CreateDeliveryController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/client", createClientController.handle);
routes.post(
  "/deliveryman/authenticate",
  authenticateDeliveryManController.handle
);
routes.post("/deliveryman", createDeliveryManController.handle);
routes.post("/delivery", createDeliveruController.handle);

export { routes };
