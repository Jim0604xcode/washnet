export type OrderType = "pw" | "dc" | "ws" | "lw" | "cs" | "fw";

export type Order = {
  orderType: OrderType;
  pc: number;
  pickupDateTime: string;
  deliveryDateTime: string;
  tel: string;
  building: string;
  street: string;
  district: string;
  fullAddress: string;
  remarks: string;
};
