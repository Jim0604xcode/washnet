import { RecoilState, SetterOrUpdater } from "recoil"
import { getValue, removeValue, setValue } from "./LocalStorage"

import { Language, setterRoleState } from "./Recoil"
import sweetAlert from 'sweetalert2'
import { LoginFormState, PlaceOrderFormState, PlaceOrderType, RegisterFormState } from "./FormBuilder"



export async function cbFetchUserSystemUserData(){
  try {
    let token = await getValue("token")
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/allUserData`,{
        headers:{
          "Content-type":"application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      let json = await res.json()
      
      
      if(!json.isErr){
        return json.data
      }else{
        throw new Error(json.errMess)
      }
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
export async function cbFetchOrderSystemOrderData(){
  try {
    let token = await getValue("token")
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/allOrderData`,{
        headers:{
          "Content-type":"application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      let json = await res.json()
      
      
      if(!json.isErr){
        return json.data
      }else{
        throw new Error(json.errMess)
      }
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}

export async function cbGetBannerByAdmin(editorType:string){
  try {
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/getEditor/${editorType}`,{
      headers:{
        "Content-type":"application/json",
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      json.data.blocks = await JSON.parse(json.data.blocks)
      return json
    }

  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }  
}

export async function cbEditBannerByAdmin(editorType:string,blocks:any) {
  try {
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editEditor/${editorType}`,{
      headers:{
        "Content-type":"application/json",
        'Authorization': `Bearer ${token}`
      },
      method:"PUT",
      body:JSON.stringify(blocks)  
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      sweetAlert.fire({
      icon: 'success',
      title: 'Message',
      text:'Successfully place new order',
      showConfirmButton: false,
      timer: 1500
      })
    }  
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }  
}
export async function cbEditOrderByAdmin(data:PlaceOrderType) {
  try {
    console.log(data)
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editOrder/${data.orderId}`,{
      headers:{
        "Content-type":"application/json",
        'Authorization': `Bearer ${token}`
      },
      method:"PUT",
      body:JSON.stringify(data)  
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      sweetAlert.fire({
      icon: 'success',
      title: 'Message',
      text:'Successfully place new order',
      showConfirmButton: false,
      timer: 1500
      })
      
    }else{
      throw new Error(json.errMess)
    }  
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
  
} 
export async function cbAddOrder(data:PlaceOrderType) {
  try {
    let token = await getValue("token")
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/addOrder`,{
        headers:{
          "Content-type":"application/json",
          'Authorization': `Bearer ${token}`
        },
        method:"POST",
        body:JSON.stringify(data)  
      })
      let json = await res.json()
      console.log(json)
      if(!json.isErr){
        sweetAlert.fire({
        icon: 'success',
        title: 'Message',
        text:'Successfully place new order',
        showConfirmButton: false,
        timer: 1500
        })
        
      }else{
        throw new Error(json.errMess)
      }
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
}


export async function handleRegister(data: RegisterFormState,setRoleState:SetterOrUpdater<{
  role: string | null;
}>,history:any){
  try {
    // let user = await createUserWithEmailAndPassword(data.email,data.password)
    // console.log(user)

    // data = Object.assign(data,{id:user!.uid})
  
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/register`,{
    headers:{
      "Content-type":"application/json"
    },
    method:"POST",
    body:JSON.stringify(data)  
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      sweetAlert.fire({
      icon: 'success',
      title: 'Message',
      text:'Successfully register',
      showConfirmButton: false,
      timer: 1500
      })
      setValue("token",json.data.token)
      setRoleState({role:json.data.role})
      
      
      history.push('/A-themeSystem')
    }else{
      // await deleteUser()
      throw new Error(json.errMess)
    }  
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      // timer: 1500
    })
  }
}

export async function login(data: LoginFormState,setRoleState:SetterOrUpdater<{
  role: string | null;
}>,history:any) {
  try {
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/login`,{
      headers:{
        "Content-type":"application/json"
      },
      method:"POST",
      body:JSON.stringify(data)  
      })
      let json = await res.json()
      console.log(json)
      if(!json.isErr){
        sweetAlert.fire({
        icon: 'success',
        title: 'Message',
        text:'Successfully login',
        showConfirmButton: false,
        timer: 1500
        })
        setValue("token",json.data.token)
        setterRoleState(json.data.role,setRoleState)
        history.push('/A-themeSystem')
      }else{
        throw new Error(json.errMess)
      }  
  } catch (error:any) {
    sweetAlert.fire({
      icon: 'info',
      title: 'Message',
      text:error.message,
      showConfirmButton: false,
      timer: 1500
    })
  }
    
}

export async function logout(currentRole:string,setRoleState:SetterOrUpdater<{
  role: string | null;
}>,history:any) {
  try {
    setterRoleState(currentRole,setRoleState)
    sweetAlert.fire({
    icon: 'success',
    title: 'Message',
    text:'Successfully login',
    showConfirmButton: false,
    timer: 1500
    })
    removeValue('token')  
    history.push('/G-setting')
  } catch (error:any) {
    console.log(error.message)
  }
  
}

export async function getCurrentUser(cbRoleFunc:(currentRole:string)=>void){
  try {
    let token = await getValue("token")
    if(token){
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/getCurrentUser`,{
          headers:{
            'Authorization': `Bearer ${token}`
          }
        })
        let json = await res.json()
        
        if(!json.isErr){
          cbRoleFunc(json.data.role)
          
        }else{
            
          cbRoleFunc("guest")
        }
        
        
    }else{
        
        cbRoleFunc("guest")
    }
  } catch (error:any) {
    console.log(error.message)
  }
    
        
}

export async function getterLanguaue(reqLan:`cn`|`eng`){
  try {
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/getLanguageData/${reqLan}`)
        let json = await res.json()
        console.log(json)
        return json.data
  } catch (error:any) {
    console.log(error.message)
  }
}
export async function setterLanguage(setLanguageState:SetterOrUpdater<Language>,data:any){
  try {        
        setLanguageState(languageState=>{
          let newLan = {...languageState}
          if(newLan.require === 'cn'){
            newLan.require = "eng"
          }else if(newLan.require === 'eng'){
            newLan.require = "cn"
          }
          
          newLan.language = data
          
          return newLan
        })
    
  } catch (error:any) {
    console.log(error.message)
  }
    
        
}

          
                
      