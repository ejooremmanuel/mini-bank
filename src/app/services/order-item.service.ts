import { Injectable } from "@matchmakerjs/di";
import { EntityManager } from "typeorm";
import { OrderItem } from "../data/entities/order-item.entity";
import { Order } from "../data/entities/order.entity";
import { OrderItemApiRequest } from "../dto/request/order-item.request";

@Injectable()
export class OrderItemService {
  constructor(private entityManager: EntityManager) {}

  saveOrderItem(
    order: Order,
    request: OrderItemApiRequest
  ): Promise<OrderItem> {
    const item = new OrderItem();
    item.order = order;
    item.productId = request.productId;
    item.amount = request.amount;
    return this.entityManager.save(item);
  }
}
