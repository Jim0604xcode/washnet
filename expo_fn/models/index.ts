import { SharedValue } from "react-native-reanimated";

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

export type FormButtonControls = {
  height1: SharedValue<number>;
  height2: SharedValue<number>;
  height3: SharedValue<number>;
  isOpen1: boolean;
  isOpen2: boolean;
  isOpen3: boolean;
  setIsOpen1: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen3: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormInputFlags = {
  hasAddress: boolean;
  hasPickupDateTime: boolean;
  hasDeliveryDateTime: boolean;
};