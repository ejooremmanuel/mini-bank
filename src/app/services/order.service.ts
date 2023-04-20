import { Injectable } from "@matchmakerjs/di";
import { RequestMetadata } from "@matchmakerjs/matchmaker-security";
import { Transactional } from "@matchmakerjs/matchmaker-typeorm";
import { EntityManager } from "typeorm";
import { Order } from "../data/entities/order.entity";
import { OrderApiRequest } from "../dto/request/order.request";
import { OrderItemService } from "./order-item.service";

@Injectable()
export class OrderService {
  constructor(
    private entityManager: EntityManager,
    private orderItemService: OrderItemService,
    private requestMetadata: RequestMetadata
  ) {}

  @Transactional()
  async saveOrder(request: OrderApiRequest): Promise<Order> {
    const order = new Order();
    order.customerId = request.customerId;
    order.createdBy = this.requestMetadata.userId;
    order.amount = request.items
      .map((item) => item.amount)
      .reduce((a, b) => a + b);
    await this.entityManager.save(order);
    order.items = await Promise.all(
      request.items.map((item) =>
        this.orderItemService.saveOrderItem(order, item)
      )
    );
    return order;
  }
}
