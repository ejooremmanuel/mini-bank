import { Injectable } from "@matchmakerjs/di";
import { EntityManager } from "typeorm";
import { Address } from "../data/entities/address.entity";
import { AddressRequest } from "../dto/request/address.request";
import { ErrorResponse } from "@matchmakerjs/matchmaker";

@Injectable()
export class AddressService {
  constructor(private entityManager: EntityManager) {}

  updateAddress = async (
    addressId: number,
    body: AddressRequest
  ): Promise<number> => {
    const recordExists = await this.entityManager.findOne(Address, {
      where: { id: addressId },
    });

    if (!recordExists) {
      throw new ErrorResponse(404, {
        message: "user address does not exist",
      });
    }

    await this.entityManager
      .createQueryBuilder(Address, "a")
      .update(Address)
      .set({
        ...body,
      })
      .where("id=:addressId", {
        addressId,
      })
      .execute();

    return addressId;
  };
}
