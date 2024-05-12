import React, {useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { IonButton, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote} from "@ionic/react";
import { getEditRegisterFormDefaultValues, getEditRegisterFormYupResolver, EditRegisterFormState } from "../service/FormBuilder";
import "./BasicForm.scss";

import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";

import { getValue } from "../service/LocalStorage";

const EditCustomer: React.FC<{cbSubmitForm:(data:EditRegisterFormState)=>void,userId:string}> = ({cbSubmitForm,userId}) => {
  
  
  const [formValue,setFormValue] = useState(getEditRegisterFormDefaultValues())

  
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
      
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.displayName = json.data.displayName
        newFormValue.mobile = json.data.mobile
        newFormValue.email = json.data.email
        newFormValue.building = json.data.building
        newFormValue.street = json.data.street
        newFormValue.district = json.data.district
        return newFormValue
      })
      
    }
  },[])
  useEffect(()=>{
    
    
      // admin edit customer
      cbFetchUser()
      
      
    
  },[])
  const onSubmit = async (data: EditRegisterFormState) => {
    // let area_child_arr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area_child
    // let dis_child_arr = area_child_arr.find((obj:AreaChild)=>obj.key===data.street).district_child
    
    // data.area = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area + "@" + data.area
    // data.street = area_child_arr.find((obj:AreaChild)=>obj.key===data.street).street + "@" + data.street 
    // data.location = dis_child_arr.find((obj:DisChild)=>obj.key===data.location).location + "@" + data.location 
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
    try {
      let token = await getValue("token")
      let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editUser/${userId}`,{
        headers:{
          "Content-type":"application/json",
          'Authorization': `Bearer ${token}`
        },
        method:"PUT",
        body:JSON.stringify(data)  
      })
      let json = await res.json()
      
      
      
      if(!json.isErr){
        
        cbSubmitForm(Object.assign(data,{userId:userId}))  
      }  
    } catch (error) {
      alert('error')
    }
    


    
  };
  
  return (
    
    <form style={{paddingBottom:"20px",padding:"20px",marginTop:"20px",background:"#FFF",borderRadius:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <IonImg src="assets/icon/logo-ltblue.png"></IonImg>
      
      
      
      
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>修改用戶</h1>
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

      
      
      <div style={{border:"1px solid",marginTop:"20px",marginBottom:"20px",borderRadius:"20px",padding:"8px"}}>
        <h2 style={{textAlign:"center",color:"#C6905D"}}>{"地址"}</h2>  
                
        
        <IonItem fill="outline">
          <IonLabel position="floating">{"地址"}</IonLabel>
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
          <IonLabel position="floating">{"地址"}</IonLabel>
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
          <IonLabel position="floating">{"地址"}</IonLabel>
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
export default EditCustomer;
