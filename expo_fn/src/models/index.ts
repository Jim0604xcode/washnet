import { SharedValue } from "react-native-reanimated";

export enum OrderType {
  LAUNDRY = "pw",
  DRY_CLEANING = "dc",
  SHOES = "ws",
  BAGS = "lw",
  ALTER = "cs",
  HOME_TEXTILES = "fw",
}

export type Order = {
  orderType: OrderType;
  pc: number;
  pickupDateTime: string;
  deliveryDateTime: string;
  tel: string;
  building: string;
  street: string;
  district: string;
  remarks: string;
};

export type FetchOrder = Omit<Order, 'fullAddress'>;

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
  hasStep123Completed: boolean;
};

export interface LoginResponse {
  data: {
    role: string;
    token: string;
  };
  isErr: boolean;
  errMess: string | null;
}

export interface LoginRequest {
  mobileOrEmail: string;
  password: string;
}


export interface RegisterRequest {
  displayName: string,
  mobile: string,
  email: string,
  password: string,
  confirmPassword: string,
  district: string,
  street: string,
  building: string,
}

export interface UserOrder {
  orderId: number
  orderType: OrderType
  pc: number
  tel: string
  pickupDateTime: string
  deliveryDateTime: string
  fullAddress: string
  remarks: string
  orderStatus: string
  district: string
  street: string
  building: string
}

// export type EditedPasswordReq = {
//   currentPassword: string;
//   newPassword: string;
// }

export type EditedMobileReq = {
  mobile: string;
}

export type EditedAddressReq = {
  district: string;
  street: string;
  building: string;
}