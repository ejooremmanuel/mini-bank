import {
  ErrorResponse,
  Get,
  HandlerContext,
  PathParameter,
  Post,
  Put,
  Query,
  RequestBody,
  RestController,
  Valid,
} from "@matchmakerjs/matchmaker";
import { IfAuthorized } from "@matchmakerjs/matchmaker-security";
import { IncomingMessage, ServerResponse } from "http";
import { EntityManager, In } from "typeorm";
import { OrderItem } from "../data/entities/order-item.entity";
import { Order } from "../data/entities/order.entity";
// import { PageRequest } from "../dto/page-request";
import { OrderApiRequest } from "../dto/request/order.request";
// import { SearchResult } from "../dto/search-result";
// import { AdminGuard } from "../guards/admin.guard";
import { OrderService } from "../services/order.service";

@RestController()
export class OrderController {
  constructor(
    private entityManager: EntityManager,
    private orderService: OrderService
  ) {}

  @Post("orders")
  async saveOrder(
    context: HandlerContext<IncomingMessage, ServerResponse>,
    @RequestBody() @Valid() request: OrderApiRequest
  ): Promise<Order> {
    context.response.statusCode = 201;
    return this.orderService.saveOrder(request);
  }

  @Get("orders/:id:\\d+")
  async getOrder(@PathParameter("id") id: string): Promise<Order> {
    const order = await this.entityManager.findOne(Order, {
      where: {
        id: parseInt(id),
      },
    });
    if (!order) {
      throw new ErrorResponse(404, {
        message: "Unknown order id",
      });
    }
    order.items = await this.entityManager.find(OrderItem, {
      where: {
        order: {
          id: order.id,
        },
      },
    });
    return order;
  }
  @Put("orders/:id:\\d+")
  async updateOrder(
    @PathParameter("id") id: string,
    @RequestBody() @Valid() request: OrderApiRequest
  ): Promise<Order> {
    console.log(request, ">>>");

    const order = await this.entityManager.findOne(Order, {
      where: {
        id: parseInt(id),
      },
    });
    if (!order) {
      throw new ErrorResponse(404, {
        message: "Unknown order id",
      });
    }
    order.items = await this.entityManager.find(OrderItem, {
      where: {
        order: {
          id: order.id,
        },
      },
    });

    return order;
  }

  //   @IfAuthorized([AdminGuard])
  //   @Get("orders")
  //   async getOrders(@Query() request: PageRequest): Promise<SearchResult<Order>> {
  //     const offset = request?.offset || 0;
  //     const limit = request?.limit || 10;

  //     const [orders, total] = await this.entityManager.findAndCount(Order, {
  //       skip: offset,
  //       take: limit,
  //       order: { createdAt: "DESC" },
  //     });
  //     const items = await this.entityManager.find(OrderItem, {
  //       loadRelationIds: true,
  //       where: {
  //         order: {
  //           id: In(orders.map((order) => order.id)),
  //         },
  //       },
  //       order: { amount: "DESC" },
  //     });
  //     orders.forEach((order) => {
  //       order.items = items.filter((item) => item.orderId === order.id);
  //     });
  //     return {
  //       results: orders,
  //       limit,
  //       offset,
  //       total,
  //     };
  //   }
}
