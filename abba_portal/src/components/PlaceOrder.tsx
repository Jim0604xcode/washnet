
import React, {useCallback, useEffect, useMemo, useState } from "react";
import sweetAlert from 'sweetalert2'
import { useForm } from "react-hook-form";


import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonNote, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import {  getPlaceOrderFormYupResolver, PlaceOrderFormState, PlaceOrderType } from "../service/FormBuilder";

import "./BasicForm.scss";


// import {  serviceList, ServiceType } from "../service/DropDownList";
import { formatter } from "../service/moment";


import { getValue } from "../service/LocalStorage";
import { useRecoilValue } from "recoil";
import { languageState, roleState } from "../service/Recoil";




const PlaceOrder: React.FC<{status:number,cbSubmitForm:(placeOrder:PlaceOrderFormState,orderId:number)=>void,placeOrder:PlaceOrderType,orderId:number,orderStatus:string}> = ({status,cbSubmitForm,placeOrder,orderId,orderStatus}) => {
  console.log(orderStatus)
  const [formValue,setFormValue] = useState({
    pc:placeOrder.pc,
    pickupDateTime:placeOrder.pickupDateTime,
    deliveryDateTime:placeOrder.deliveryDateTime,
    tel:placeOrder.tel,
    building:"",
    street:"",
    district:"",
    remarks:placeOrder.remarks,
    orderType:placeOrder.orderType,
    orderStatus:orderStatus,
    isSubmit:false
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
        newFormValue.building = json.data.building
        newFormValue.street = json.data.street
        newFormValue.district = json.data.district
        return newFormValue
      })
      
    }
  },[])
  
  let cbFetchOrderPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/getOrderPickUpAddressAndMobile/${orderId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.building = json.data.building
        newFormValue.street = json.data.street
        newFormValue.district = json.data.district
        // newFormValue.orderStatus = json.data.orderStatus
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
      // delivery or landry edit order
      cbFetchOrderPickUpAddress()
      
      
    }
  },[])
  
  const { register, handleSubmit, formState: { errors } } = useForm<PlaceOrderFormState>({
    resolver: getPlaceOrderFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  


  const changeOrderStatus = (status:string) => {
    
    setFormValue(formValue=>{
      let newFormValue = {...formValue}
      newFormValue.orderStatus = status
      newFormValue.isSubmit = true 
      return newFormValue
    })
    
  }
  
  const onSubmit = async (data: PlaceOrderFormState) => {
    
    
    
    if(status===1){
      // admin edit order
      // delivery or landry edit order
      try {
        // console.log(data)
        
        let token = await getValue("token")
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editOrder/${orderId}`,{
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
          
          


          cbSubmitForm(data,orderId)
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
  
    
    
    
  };

  
  
  
  
  
  useEffect(()=>{
    // onSubmit(formValue)
    if(formValue.isSubmit){
      // console.log(formValue)
      onSubmit(formValue)
    }
    
  },[formValue.orderStatus])

  return (
    
    <form style={{paddingBottom:"20px",padding:"20px",marginTop:"20px",background:"#FFF",borderRadius:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formTitle}</h1>
      <h4 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formSubTitle}</h4>
      
      {formValue.orderStatus === "w_pickup" && 
      <IonButton onClick={()=>changeOrderStatus("w_service")}>
        Complete Pickup
      </IonButton>
      }
      {formValue.orderStatus === "w_service" && 
      <IonButton onClick={()=>changeOrderStatus("w_delivery")}>
        Conplete Service
      </IonButton>
      }
      {formValue.orderStatus === "w_delivery" && 
      <IonButton onClick={()=>changeOrderStatus("complete")}>
        Complete Delivery
      </IonButton>
      }
        


      
        <IonItem>
          <IonLabel>{getLanguage.language.cls.itemTotal}</IonLabel>
          <IonInput {...register("pc")} className="number" type="number" placeholder="0px"></IonInput>        
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
        <IonItem fill="outline">
          <IonLabel position="floating">{"電話"}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("tel")} aria-label="tel" placeholder={"電話"} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.tel = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.tel?.message}</IonNote>   
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
