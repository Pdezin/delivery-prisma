import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliveryManController } from "./modules/account/useCases/authenticateDeliveryMan/AuthenticateDeliveryManController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesClientController } from "./modules/clients/useCases/findAlldeliveries/FindAllDeliveriesClientController";

import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliveryManController } from "./modules/deliveryMan/useCases/createDeliveryMan/CreateDeliveryManController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryMan/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliveryManController = new CreateDeliveryManController();
const authenticateDeliveryManController =
  new AuthenticateDeliveryManController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesClientController =
  new FindAllDeliveriesClientController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle);

routes.post("/client", createClientController.handle);

routes.post(
  "/deliveryman/authenticate",
  authenticateDeliveryManController.handle
);

routes.post("/deliveryman", createDeliveryManController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesClientController.handle
);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { routes };
