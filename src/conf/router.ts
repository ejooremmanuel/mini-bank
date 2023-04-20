import { SimpleRouter } from "@matchmakerjs/matchmaker";
import { IndexController } from "../app/controllers/index.controller";
import { OrderController } from "../app/controllers/order.controller";

export default SimpleRouter.fromControllers([IndexController, OrderController]);
