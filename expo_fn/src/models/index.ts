import { SharedValue } from "react-native-reanimated";
import { KeyboardTypeOptions } from "react-native/Libraries/Components/TextInput/TextInput";

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

export interface Input {
  name: string;
  rules: {};
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoComplete?:     | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-middle-name'
  | 'cc-family-name'
  | 'cc-type'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'gender'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'new-password'
  | 'nickname'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'url'
  | 'username'
  | 'username-new'
  | 'off'
  | undefined;
  secureTextEntry?: boolean,
  maxLength: number;
}