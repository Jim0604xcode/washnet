
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { formatter } from "./moment";



// Login Form start

const LoginFormSchema = yup.object({
  mobile_or_email: yup.string().required('手機號碼 / 電郵是必填'),
  password: yup.string().min(6, '至少6隻字').required(),
}).required();

export type LoginFormState = yup.InferType<typeof LoginFormSchema>;
export const getLoginFormDefaultValues = () => {
    return {
        mobile_or_email: "",
        password: "",
      }
}
export let getLoginFormYupResolver = () => yupResolver(LoginFormSchema)

// Login Form end


// Register Form start
const RegisterFormSchema = yup.object({
  role:yup.string().required('角色必選'),
  display_name:yup.string().required('用戶名是必填'),
  mobile: yup.string().required('手機號碼是必填'),
  email: yup.string().email().required('電郵是必填'),
  password: yup.string().min(6, '至少6隻字').required(),
  confirm_password: yup.string().min(6, '至少6隻字').required(),
  area:yup.string().required('大區是必填'),
  district:yup.string().required('細區是必填'),
  station:yup.string().required('站是必填'),
  address:yup.string().required('地址是必填'),
});

const EditRegisterFormSchema = yup.object({
  display_name:yup.string().required('用戶名是必填'),
  mobile: yup.string().required('手機號碼是必填'),
  email: yup.string().email().required('電郵是必填'),
  area:yup.string().required('大區是必填'),
  district:yup.string().required('細區是必填'),
  station:yup.string().required('站是必填'),
  address:yup.string().required('地址是必填'),
});

export type RegisterFormState = yup.InferType<typeof RegisterFormSchema>;
export type EditRegisterFormState = yup.InferType<typeof EditRegisterFormSchema>;

export const getRegisterFormDefaultValues = () => {
    return {
        role:"customer",
        display_name:"",
        mobile:"",
        email: "",
        password: "",
        confirm_password:"",
        area:"",
        // area_value:"",
        district:"",
        // district_value:"",
        station:"",
        // station_value:"",
        address:"",
      }
}

export const getEditRegisterFormDefaultValues = () => {
  return {
      display_name:"",
      mobile:"",
      email: "",
      area:"",
      // area_value:"",
      district:"",
      // district_value:"",
      station:"",
      // station_value:"",
      address:"",
    }
}

export let getRegisterFormYupResolver = () => yupResolver(RegisterFormSchema)
export let getEditRegisterFormYupResolver = () => yupResolver(EditRegisterFormSchema)


// Register Form end





// PlaceOrder Form start



const PlaceOrderFormSchema = yup.object({
  poundWash:yup.number(),
  dryCleaning:yup.number(),
  washShoes:yup.number(),
  leatherWashBag:yup.number(),
  totalPic:yup.number().positive('合計必填正數').required('合計是必填'),
  pickupDateTime: yup.string().min(6,"收貨日期時間是必填"),
  area:yup.string().required('大區是必填'),
  district:yup.string().required('細區是必填'),
  station:yup.string().required('站是必填'),
  address:yup.string().required('地址是必填'),
  remarks:yup.string().required('備註是必填'),
});

export type PlaceOrderFormState = yup.InferType<typeof PlaceOrderFormSchema>;


export let getPlaceOrderFormYupResolver = () => yupResolver(PlaceOrderFormSchema)

export type PlaceOrderType = {
  poundWash: number,
  dryCleaning: number,
  washShoes: number,
  leatherWashBag: number,
  orderId?:number,
  pickupDateTime:string,
  area: string,
  district: string,
  station:string,
  address:string,
  remarks:string,
};

export const getPlaceOrderFormDefaultValues = () => {
  return {
    poundWash:0,
    dryCleaning:0,
    washShoes:0,
    leatherWashBag:0,
    pickupDateTime:formatter(new Date().toISOString()),
    area:"",
    district:"",
    station:"",
    address:"",
    remarks:""
  }
}


// PlaceOrder Form end