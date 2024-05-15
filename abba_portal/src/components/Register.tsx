import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { eyeOffOutline,eyeOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote, IonSelect, IonSelectOption } from "@ionic/react";
import { getRegisterFormDefaultValues, getRegisterFormYupResolver, RegisterFormState } from "../service/FormBuilder";
import "./BasicForm.scss";
import sweetAlert from 'sweetalert2'

import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";
import { getValue } from "../service/LocalStorage";


type RoleList = {
  name:string
  key:"admin"|"customer"|"delivery"|"laundry"
}

const Register: React.FC<{cbSubmitForm:(data:RegisterFormState)=>void,isAdmin:boolean}> = ({cbSubmitForm,isAdmin}) => {
  
  const [passwordIsHide, setPasswordIsHide] = useState<boolean>(true)
  const [c_passwordIsHide, setC_PasswordIsHide] = useState<boolean>(true)
  const [formValue,setFormValue] = useState(getRegisterFormDefaultValues())
 
  
  const getLanguage = useRecoilValue(languageState);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormState>({
    resolver: getRegisterFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  
  const onSubmit = async (data: RegisterFormState) => {
    // console.log(data)
    
    try {
      let token = await getValue("token")
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/addUser`,{
        headers:{
          "Content-type":"application/json",
          'Authorization': `Bearer ${token}`
        },
        method:"POST",
        body:JSON.stringify(data)  
      })
      let json = await res.json()
      
      
      
      if(!json.isErr){
        
        cbSubmitForm(Object.assign(data,{userId:json.data.userId,status:"active"}))    
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
  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonImg src="assets/icon/logo-ltblue.png"></IonImg>
      {isAdmin && 
      <>
      <IonItem>
      <IonLabel>{getLanguage.language.gs.regFormField0}</IonLabel>
      <IonSelect {...register("role")} onIonChange={(e)=>{
        console.log(e.target.value)
        
        setFormValue(formValue=>{
          let newFormValue = {...formValue}
          let role = getLanguage.language.gs.roleList.find((obj:RoleList)=>obj.key===e.target.value).key
          newFormValue.role = role
          
          return newFormValue
        })
      }}>
      {getLanguage.language.gs.roleList.map((item:RoleList,idx:number) => 
        <IonSelectOption key={idx} value={item.key}>{item.name}</IonSelectOption>
      )}  
      </IonSelect>
    </IonItem>
    <IonNote>{errors.role?.message}</IonNote>
    </>
    }
      
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>新增用戶</h1>
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField1}</IonLabel>
        <IonInput className="text" clearInput={true} {...register("displayName")} aria-label="Display Name" placeholder={getLanguage.language.gs.regFormField1} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.displayName = e.target.value as string
              
              return newFormValue
            })
        }}></IonInput>
      </IonItem>
      <IonNote>{errors.displayName?.message}</IonNote>
      
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField2}</IonLabel>
        <IonInput className="text" clearInput={true} {...register("mobile")} aria-label="Mobile" placeholder={getLanguage.language.gs.regFormField2} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.mobile = e.target.value as string
              
              return newFormValue
            })
        }}></IonInput>
        
      </IonItem>  
      <IonNote>{errors.mobile?.message}</IonNote>

      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField3}</IonLabel>
        <IonInput className="text" clearInput={true} {...register("email")} aria-label="Email Address" placeholder={getLanguage.language.gs.regFormField3} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.email = e.target.value as string
              
              return newFormValue
            })
        }}></IonInput>
      </IonItem>
      <IonNote>{errors.email?.message}</IonNote>

      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField4}</IonLabel>
        <IonInput className="text" type={passwordIsHide ? "password":"text"} {...register("password")} aria-label="Password" placeholder={getLanguage.language.gs.regFormField4} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.password = e.target.value as string
              
              return newFormValue
            })
        }}>
        </IonInput>
        {passwordIsHide && <IonIcon onClick={()=>setPasswordIsHide(false)} aria-hidden="true" icon={eyeOffOutline} />}
        {!passwordIsHide && <IonIcon onClick={()=>setPasswordIsHide(true)} aria-hidden="true" icon={eyeOutline} />}
      </IonItem>
      <IonNote>{errors.password?.message}</IonNote>

      
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField5}</IonLabel>
        <IonInput className="text" type={c_passwordIsHide ? "password":"text"} {...register("confirmPassword")} aria-label="Confirm Password" placeholder={getLanguage.language.gs.regFormField5} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.confirmPassword = e.target.value as string
              
              return newFormValue
            })
        }}>
        </IonInput>
        {c_passwordIsHide && <IonIcon onClick={()=>setC_PasswordIsHide(false)} aria-hidden="true" icon={eyeOffOutline} />}
        {!c_passwordIsHide && <IonIcon onClick={()=>setC_PasswordIsHide(true)} aria-hidden="true" icon={eyeOutline} />}
      </IonItem>
      <IonNote>{errors.confirmPassword?.message}</IonNote>
      
      <div className="addressBox">
        <h2>{"地址"}</h2>  
                
        
        <IonItem fill="outline">
          <IonLabel position="floating">{"地址1"}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("district")} aria-label="Address" placeholder={"地址"} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.district = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.district?.message}</IonNote>   

        <IonItem fill="outline">
          <IonLabel position="floating">{"地址2"}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("street")} aria-label="Address" placeholder={"地址"} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.street = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.street?.message}</IonNote>   

        <IonItem fill="outline">
          <IonLabel position="floating">{"地址3"}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("building")} aria-label="Address" placeholder={"地址"} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.building = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.building?.message}</IonNote>
           
        </div>
      

        <div style={{display:"flex",justifyContent:"center"}}>
          <IonButton className="formBtn" shape="round" type="submit">提交</IonButton>
        </div>
    </form>
    
  );
}  
export default Register;
