import { EntityManager } from "typeorm";
import { CustomerService } from "../services/customer.service";
import {
  HandlerContext,
  Post,
  RequestBody,
  RestController,
  Valid,
} from "@matchmakerjs/matchmaker";
import { Customer } from "../data/entities/cutomer.entity";
import { IncomingMessage, ServerResponse } from "http";
import { CustomerRequest } from "../dto/request/customer-item.request";

@RestController("customer")
export class CustomerController {
  constructor(
    private entityManager: EntityManager,
    private customerService: CustomerService
  ) {}

  @Post("")
  async createCustomer(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @RequestBody() @Valid() request: CustomerRequest
  ): Promise<Customer> {
    const data = this.customerService.createCustomer(request);
    return data;
  }
  @Post("details")
  async getDetails(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @RequestBody() request: CustomerRequest
  ): Promise<Customer> {
    const data = this.customerService.getAccountDetails(request.accountNumber);
    return data;
  }
}
