
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { formatter } from "./moment";


// ResetPassword Form start
const ResetPasswordFormSchema = yup.object({
  password: yup.string().min(6, '至少6隻字').required(),
}).required();

export type ResetPasswordFormState = yup.InferType<typeof ResetPasswordFormSchema>;
export const getResetPasswordFormDefaultValues = () => {
    return {
        password: "",
      }
}
export let getResetPasswordFormYupResolver = () => yupResolver(ResetPasswordFormSchema)
// ResetPassword Form end

// Login Form start

const LoginFormSchema = yup.object({
  mobileOrEmail: yup.string().required('手機號碼 / 電郵是必填'),
  password: yup.string().min(6, '至少6隻字').required(),
}).required();

export type LoginFormState = yup.InferType<typeof LoginFormSchema>;
export const getLoginFormDefaultValues = () => {
    return {
        mobileOrEmail: "",
        password: "",
      }
}
export let getLoginFormYupResolver = () => yupResolver(LoginFormSchema)

// Login Form end


// Register Form start
const RegisterFormSchema = yup.object({
  role:yup.string().required('角色必選'),
  displayName:yup.string().required('用戶名是必填'),
  mobile: yup.string().required('手機號碼是必填'),
  email: yup.string().email().required('電郵是必填'),
  password: yup.string().min(6, '至少6隻字').required(),
  confirmPassword: yup.string().min(6, '至少6隻字').required(),
  district:yup.string().required('地址是必填'),
  street:yup.string().required('地址是必填'),
  building:yup.string().required('地址是必填'),
});

const EditRegisterFormSchema = yup.object({
  
  displayName:yup.string().required('用戶名是必填'),
  mobile: yup.string().required('手機號碼是必填'),
  email: yup.string().email().required('電郵是必填'),
  district:yup.string().required('地址是必填'),
  street:yup.string().required('地址是必填'),
  building:yup.string().required('地址是必填'),
  
});

export type RegisterFormState = yup.InferType<typeof RegisterFormSchema>;
export type EditRegisterFormState = yup.InferType<typeof EditRegisterFormSchema>;

export const getRegisterFormDefaultValues = () => {
    return {
        role:"customer",
        displayName:"",
        mobile:"",
        email: "",
        password: "",
        confirmPassword:"",
        building:"",
        street:"",
        district:"",
      }
}

export const getEditRegisterFormDefaultValues = () => {
  return {
    displayName:"",
    mobile:"",
    email: "",
    password: "",
    confirmPassword:"",
    building:"",
    street:"",
    district:"",
    role:""
    }
}

export let getRegisterFormYupResolver = () => yupResolver(RegisterFormSchema)
export let getEditRegisterFormYupResolver = () => yupResolver(EditRegisterFormSchema)


// Register Form end





// PlaceOrder Form start



const PlaceOrderFormSchema = yup.object({
  pc:yup.number().positive('合計必填正數').required('合計是必填'),
  pickupDateTime: yup.string().min(6,"收貨日期時間是必填"),
  deliveryDateTime: yup.string().min(6,"收貨日期時間是必填"),
  tel:yup.string().required("必填"),
  district:yup.string().required('地址是必填'),
  street:yup.string().required('地址是必填'),
  building:yup.string().required('地址是必填'),
  remarks:yup.string().required('備註是必填'),
});

export type PlaceOrderFormState = yup.InferType<typeof PlaceOrderFormSchema>;


export let getPlaceOrderFormYupResolver = () => yupResolver(PlaceOrderFormSchema)

export type PlaceOrderType = {
  pc:number,
  orderId?:number,
  deliveryDateTime:string,
  pickupDateTime:string,
  tel:string,
  district:string
  street:string
  building:string
  remarks:string,
  orderType:string,
  status:string
};

export const getPlaceOrderFormDefaultValues = () => {
  return {
    pc:0,
    deliveryDateTime:formatter(new Date().toISOString()),
    pickupDateTime:formatter(new Date().toISOString()),
    tel:"",
    building:"",
    street:"",
    district:"",
    remarks:"",
    orderType:"",
    status:""
  }
}


// PlaceOrder Form end