
import React, {useCallback, useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";


import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonNote, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import {  getPlaceOrderFormYupResolver, PlaceOrderFormState, PlaceOrderType } from "../service/FormBuilder";

import "./BasicForm.scss";


// import {  serviceList, ServiceType } from "../service/DropDownList";
import { formatter } from "../service/moment";


import { getValue } from "../service/LocalStorage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "../service/Recoil";




const PlaceOrder: React.FC<{status:number,cbSubmitForm:(placeOrder:PlaceOrderFormState)=>void,placeOrder:PlaceOrderType,orderId:number,orderStatus:string}> = ({status,cbSubmitForm,placeOrder,orderId,orderStatus}) => {
  
  const [formValue,setFormValue] = useState({
    pc:placeOrder.pc,
    pickupDateTime:placeOrder.pickupDateTime,
    deliveryDateTime:placeOrder.deliveryDateTime,
    tel:placeOrder.tel,
    fullAddress:placeOrder.fullAddress,
    remarks:placeOrder.remarks,
    orderType:placeOrder.orderType
    })
    
  
  const [isOpen,setIsOpen] = useState(false)
  
  const getLanguage = useRecoilValue(languageState);
  
  
  let cbFetchUserPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/getUserPickUpAddress`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.fullAddress = json.data.fullAddress
        return newFormValue
      })
      
    }
  },[])
  let cbFetchOrderItems = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getOrderItems/${orderId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        
        newFormValue.pc = json.data.pc
        return newFormValue
      })
      
    }
  },[])
  let cbFetchOrderPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getOrderPickUpAddress/${orderId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        
        newFormValue.fullAddress = json.data.fullAddress
        return newFormValue
      })
      
    }
  },[])
  useEffect(()=>{
    
    if(status === 0){
      // customer open order 
      cbFetchUserPickUpAddress()
    }else if(status === 1){
      // admin edit order
      cbFetchOrderItems()
      cbFetchOrderPickUpAddress()
      
    }else if(status === 2){
      // admin open order
      
    }
  },[])
  
  const { register, handleSubmit, formState: { errors } } = useForm<PlaceOrderFormState>({
    resolver: getPlaceOrderFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  



  const onSubmit = async (data: PlaceOrderFormState) => {
    
    console.log(data)
    
    // {
    //   address:"add",
    //   area:"港島@1",
    //   district:""中西區@1-1"",
    //   dryCleaning:2,
    //   leatherWashBag:4,
    //   pickupDateTime:"Tuesday, October 3rd 2023, 10:15:00 pm",
    //   poundWash:1,
    //   remarks:"rem",
    //   station:"堅尼地城@1-1-1",
    //   totalPic:10,
    //   washShoes:3
    // }
    if(status===1){
      // admin edit order
      data = Object.assign(data,{orderId:orderId,orderStatus:orderStatus})
      console.log(data)
    }
    cbSubmitForm(data)
    
    
  };

  
  
  
  // async function handleOpenServiceSelect(){
  //   let serviceSelect = document.querySelector("#serviceSelect") as HTMLIonSelectElement
  //   serviceSelect.click()
  // }
  
  
  

  return (
    
    <form style={{paddingBottom:"20px",padding:"20px",marginTop:"20px",background:"#FFF",borderRadius:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formTitle}</h1>
      <h4 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formSubTitle}</h4>
      
        

      
      
        <IonItem>
          <IonLabel>{getLanguage.language.cls.itemTotal}</IonLabel>
          <IonInput {...register("pc")} className="number" type="number" placeholder="0px" disabled></IonInput>        
        </IonItem>  
      
      <IonNote>{errors.pc?.message}</IonNote>
      

      <IonItem lines="none">
      <h3 style={{color:"#1E3D59"}}>{getLanguage.language.cls.pickUpDateTimeItem}</h3>
      
      </IonItem>

      <IonButton onClick={()=>setIsOpen(true)} className="customButton">{getLanguage.language.cls.pickUpDateTimeButton}</IonButton>
      <IonItem className="customItem" lines="none">
      
        <IonInput {...register("pickupDateTime")} className="text" disabled>

      </IonInput>              
        
      </IonItem>
      <IonNote>{errors.pickupDateTime?.message}</IonNote>
      {/* <IonDatetimeButton datetime="datetime"></IonDatetimeButton>   */}
      
      <IonModal isOpen={isOpen}>
      <IonHeader>
            <IonToolbar>
              <IonTitle>{getLanguage.language.cls.pickUpDateTimeModal.title}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="customButton" onClick={() => setIsOpen(false)}>{getLanguage.language.cls.pickUpDateTimeModal.btn}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <IonDatetime min={new Date().toISOString()} id="datetime" presentation="date-time" preferWheel={true} onIonChange={(e)=>{
          
          setFormValue(formValue=>{
            let newFormValue = {...formValue}
            
            newFormValue.pickupDateTime = formatter(new Date(e.target.value as string).toISOString())
            
            return newFormValue
          })
          }}></IonDatetime>
          </IonContent>
        
      </IonModal>  
      
      

      
      <div style={{border:"1px solid",marginTop:"20px",marginBottom:"20px",borderRadius:"20px",padding:"8px"}}>
        {/* <h2 style={{textAlign:"center",color:"#C6905D"}}>{getLanguage.language.cls.userAddress.title}</h2>   */}
        
        
        
        <IonItem fill="outline">
          <IonLabel position="floating">{"地址"}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("fullAddress")} aria-label="Address" placeholder={"地址"} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.fullAddress = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.fullAddress?.message}</IonNote>   
        </div>
      
      
      
      
      <IonItem className="customItemTextArea" fill="outline">
        <IonLabel position="stacked">{"備註"}</IonLabel>
        <IonTextarea {...register("remarks")} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.remarks = e.target.value as string
              
              return newFormValue
            })
        }} spellCheck={true}></IonTextarea>   
        {/* <IonInput clearInput={true} aria-label="備註"></IonInput> */}
      </IonItem>
      <IonNote>{errors.remarks?.message}</IonNote>
      

      
      
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <IonButton className="formBtn" shape="round" type="submit">{"提交"}</IonButton>
      </div>
      
    </form>
    
  );
}  
export default PlaceOrder;
