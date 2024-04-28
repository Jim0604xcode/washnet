import React, {useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonNote, IonSelect, IonSelectOption } from "@ionic/react";
import { getEditRegisterFormDefaultValues, getEditRegisterFormYupResolver, EditRegisterFormState } from "../service/FormBuilder";
import "./BasicForm.scss";

import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../service/Recoil";
import { handleRegister } from "../service/api";
import { getValue } from "../service/LocalStorage";
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
const EditCustomer: React.FC<{cbSubmitForm:(data:EditRegisterFormState)=>void,userId:string}> = ({cbSubmitForm,userId}) => {
  
  
  const [formValue,setFormValue] = useState(getEditRegisterFormDefaultValues())
  const [areaChildList,setAreaChildList] = useState<AreaChild[]>([])
  const [disChildList,setDisChildList] = useState<DisChild[]>([])
  
  const getLanguage = useRecoilValue(languageState);
  const { register, handleSubmit, formState: { errors } } = useForm<EditRegisterFormState>({
    resolver: getEditRegisterFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  let cbFetchUser = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/getUser/${userId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      setAreaChildList(areaChildList => {
        let newArr = [...areaChildList]
        newArr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===json.data.area).area_child
        setDisChildList(newArr.find((obj:AreaChild)=>obj.key===json.data.district)!.district_child)
        return newArr
      })
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.display_name = json.data.display_name
        newFormValue.mobile = json.data.mobile
        newFormValue.email = json.data.email
        newFormValue.area = json.data.area
        newFormValue.district = json.data.district
        newFormValue.station = json.data.station
        newFormValue.address = json.data.address
        return newFormValue
      })
      
    }
  },[])
  useEffect(()=>{
    
    
      // admin edit customer
      cbFetchUser()
      
      
    
  },[])
  const onSubmit = async (data: EditRegisterFormState) => {
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
    
    <form style={{paddingBottom:"20px",padding:"20px",marginTop:"20px",background:"#FFF",borderRadius:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.gs.regFormTitle}</h1>
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

      
      
      <div style={{border:"1px solid",marginTop:"20px",marginBottom:"20px",borderRadius:"20px",padding:"8px"}}>
        <h2 style={{textAlign:"center",color:"#C6905D"}}>{getLanguage.language.cls.userAddress.title}</h2>  
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
export default EditCustomer;
