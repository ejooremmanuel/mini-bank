import { SimpleRouter } from "@matchmakerjs/matchmaker";
import { IndexController } from "../app/controllers/index.controller";
import { CustomerController } from "../app/controllers/customer.controller";
import { TransactionController } from "../app/controllers/transaction.controller";
import { AddressController } from "../app/controllers/address.controller";

export default SimpleRouter.fromControllers([
  IndexController,
  CustomerController,
  AddressController,
  TransactionController,
]);
