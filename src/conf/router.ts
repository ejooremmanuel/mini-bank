import { SimpleRouter } from "@matchmakerjs/matchmaker";
import { IndexController } from "../app/controllers/index.controller";
import { OrderController } from "../app/controllers/order.controller";
import { CustomerController } from "../app/controllers/customer.controller";
import { TransactionController } from "../app/controllers/transaction.controller";

export default SimpleRouter.fromControllers([
  IndexController,
  OrderController,
  CustomerController,
  TransactionController,
]);
