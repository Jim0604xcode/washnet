
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
import { languageState } from "../service/Recoil";




const PlaceOrder: React.FC<{status:number,cbSubmitForm:(placeOrder:PlaceOrderFormState)=>void,placeOrder:PlaceOrderType,orderId:number,orderStatus:string}> = ({status,cbSubmitForm,placeOrder,orderId,orderStatus}) => {
  
  const [formValue,setFormValue] = useState({
    pc:placeOrder.pc,
    pickupDateTime:placeOrder.pickupDateTime,
    deliveryDateTime:placeOrder.deliveryDateTime,
    tel:placeOrder.tel,
    building:"",
    street:"",
    district:"",
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
        newFormValue.building = json.data.building
        newFormValue.street = json.data.street
        newFormValue.district = json.data.district
        return newFormValue
      })
      
    }
  },[])
  
  let cbFetchOrderPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getOrderPickUpAddressAndMobile/${orderId}`,{
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
  useEffect(()=>{
    
    if(status === 0){
      // customer open order 
      cbFetchUserPickUpAddress()
    }else if(status === 1){
      // admin edit order
      
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
    
    
    
    if(status===1){
      // admin edit order
      try {
        console.log(data)
        
        let token = await getValue("token")
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editOrder/${orderId}`,{
          headers:{
            "Content-type":"application/json",
            'Authorization': `Bearer ${token}`
          },
          method:"PUT",
          body:JSON.stringify(Object.assign(data,{orderStatus:orderStatus}))  
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
          data = Object.assign(data,{orderId:orderId,orderStatus:orderStatus})
          console.log(data)


          cbSubmitForm(data)
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
    // else if(status === 2){
    //   // admin open order

    //   try {
    //     console.log(data)
        
    //     let token = await getValue("token")
    //     let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/addOrder`,{
    //       headers:{
    //         "Content-type":"application/json",
    //         'Authorization': `Bearer ${token}`
    //       },
    //       method:"POST",
    //       body:JSON.stringify(Object.assign(data,{orderType:"pw"}))  
    //     })
    //     let json = await res.json()
    //     console.log(json)
    //     if(!json.isErr){
    //       sweetAlert.fire({
    //       icon: 'success',
    //       title: 'Message',
    //       text:'Successfully place new order',
    //       showConfirmButton: false,
    //       timer: 1500
    //       })
    //       data = Object.assign(data,{orderId:orderId,orderStatus:orderStatus})
    //       console.log(data)


    //       cbSubmitForm(data)
    //     }else{
    //       throw new Error(json.errMess)
    //     }  
    //   } catch (error:any) {
    //     sweetAlert.fire({
    //       icon: 'info',
    //       title: 'Message',
    //       text:error.message,
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }

    // }
    
    
    
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
