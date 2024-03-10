import React, {useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { eyeOffOutline,eyeOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote, IonSelect, IonSelectOption } from "@ionic/react";
import { getRegisterFormDefaultValues, getRegisterFormYupResolver, RegisterFormState } from "../service/FormBuilder";
import "./BasicForm.scss";


import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../service/Recoil";

type DisChild = {
  key:string,
  station:string
}
type AreaChild = {
  key:string,
  district:string,
  district_child:DisChild[]
}
type AddressList = {
  key:string,
  area:string,
  area_child:AreaChild[]
}
type RoleList = {
  name:string
  key:"admin"|"laundryman"|"delivery"|"customer"
}

const Register: React.FC<{cbSubmitForm:(data:RegisterFormState)=>void,isAdmin:boolean}> = ({cbSubmitForm,isAdmin}) => {
  
  const [passwordIsHide, setPasswordIsHide] = useState<boolean>(true)
  const [c_passwordIsHide, setC_PasswordIsHide] = useState<boolean>(true)
  const [formValue,setFormValue] = useState(getRegisterFormDefaultValues())
  const [areaChildList,setAreaChildList] = useState<AreaChild[]>([])
  const [disChildList,setDisChildList] = useState<DisChild[]>([])
  
  const getLanguage = useRecoilValue(languageState);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormState>({
    resolver: getRegisterFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  
  const onSubmit = async (data: RegisterFormState) => {
    console.log(data)
    console.log(getLanguage.language.cls.userAddress.addressList)
    let area_child_arr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area_child
    let dis_child_arr = area_child_arr.find((obj:AreaChild)=>obj.key===data.district).district_child
    
    data.area = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area + "@" + data.area
    data.district = area_child_arr.find((obj:AreaChild)=>obj.key===data.district).district + "@" + data.district 
    data.station = dis_child_arr.find((obj:DisChild)=>obj.key===data.station).station + "@" + data.station 
    console.log(data)

    // {
    //   address:"add",
    //   area:"港島@1",
    //   confirm_password:"123456",
    //   display_name:"Jim",
    //   district:"中西區@1-1",
    //   email:"test@gmail.com",
    //   mobile:"51823999",
    //   password:"123456",
    //   station:"堅尼地城@1-1-1"

    // }
    // await handleRegister(data,setRoleState,history)
    cbSubmitForm(data)
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
      
      <h1>{getLanguage.language.gs.regFormTitle}</h1>
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.regFormField1}</IonLabel>
        <IonInput className="text" clearInput={true} {...register("display_name")} aria-label="Display Name" placeholder={getLanguage.language.gs.regFormField1} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.display_name = e.target.value as string
              
              return newFormValue
            })
        }}></IonInput>
      </IonItem>
      <IonNote>{errors.display_name?.message}</IonNote>
      
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
        <IonInput className="text" type={c_passwordIsHide ? "password":"text"} {...register("confirm_password")} aria-label="Confirm Password" placeholder={getLanguage.language.gs.regFormField5} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.confirm_password = e.target.value as string
              
              return newFormValue
            })
        }}>
        </IonInput>
        {c_passwordIsHide && <IonIcon onClick={()=>setC_PasswordIsHide(false)} aria-hidden="true" icon={eyeOffOutline} />}
        {!c_passwordIsHide && <IonIcon onClick={()=>setC_PasswordIsHide(true)} aria-hidden="true" icon={eyeOutline} />}
      </IonItem>
      <IonNote>{errors.confirm_password?.message}</IonNote>
      
      <div className="addressBox">
        <h2>{getLanguage.language.cls.userAddress.title}</h2>  
        <IonItem>
          <IonLabel>{getLanguage.language.cls.userAddress.area}</IonLabel>
          <IonSelect {...register("area")} onIonChange={(e)=>{
            console.log(e.target.value)
            // setSelectedArea(e.target.value)
            setAreaChildList(getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===e.target.value).area_child)
            setDisChildList([])
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.area = e.target.value
              
              return newFormValue
            })
          }}>
          {getLanguage.language.cls.userAddress.addressList.map((item:AddressList,idx:number) => 
            <IonSelectOption key={idx} value={item.key}>{item.area}</IonSelectOption>
          )}  
          </IonSelect>
        </IonItem>
        <IonNote>{errors.area?.message}</IonNote>
  
        
        {areaChildList.length > 0 && 
        <>
        <IonItem>
        <IonLabel>{getLanguage.language.cls.userAddress.district}</IonLabel>
          <IonSelect {...register("district")} onIonChange={(e)=>{
            setDisChildList(areaChildList.find((obj:AreaChild)=>obj.key===e.target.value)!.district_child)            
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.district = e.target.value
              
              return newFormValue
            })
          }}>
          {areaChildList.map((item:AreaChild,idx:number)=>
            <IonSelectOption key={idx} value={item.key}>{item.district}</IonSelectOption>
          )}
        
          </IonSelect>
        </IonItem>  
        <IonNote>{errors.district?.message}</IonNote>
        

        
        </>
        
        }
        
        {disChildList.length > 0 && 
        <>
        <IonItem>
        <IonLabel>{getLanguage.language.cls.userAddress.station}</IonLabel>
          <IonSelect {...register("station")} onIonChange={(e)=>{
            
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.station = e.target.value
              
              return newFormValue
            })
          }}>
          {
            disChildList.map((item:DisChild,idx:number)=>
            <IonSelectOption key={idx} value={item.key}>{item.station}</IonSelectOption>
            )
          }
        
          </IonSelect>
        </IonItem>
        
        <IonNote>{errors.station?.message}</IonNote>
        

        </>
        }
        
        
        <IonItem fill="outline">
          <IonLabel position="floating">{getLanguage.language.cls.userAddress.address}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("address")} aria-label="Address" placeholder={getLanguage.language.cls.userAddress.address} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.address = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.address?.message}</IonNote>   
        </div>
      

        <div style={{display:"flex",justifyContent:"center"}}>
          <IonButton className="formBtn" shape="round" type="submit">Submit</IonButton>
        </div>
    </form>
    
  );
}  
export default Register;
