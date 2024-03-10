import { IonPage, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonItem, IonMenu } from "@ionic/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import sweetAlert from 'sweetalert2'
import { getValue } from "../../service/LocalStorage";
import "../../components/Card.scss";
import { orderItemsDecode } from "../../service/Helper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "../../service/Recoil";

import { getterLanguaue, setterLanguage } from "../../service/api";
import Header2 from "../../components/Header2";

  type Order = {
    id:number
    order_items:string
    remarks:string
    status:string
    pickup_date_time:string
    customer_id:string
    created_at:string
    updated_at:string
  }
  
  const C_myOrder: React.FC = () => {
    let [orders,setOrders] = useState<Order[]>([])
    
    let cbFetchAllOrders = useCallback(async()=>{
      try{
       
        let token = await getValue("token")
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getUserAllOrder`,{
          headers:{
            "Content-type":"application/json",
            'Authorization': `Bearer ${token}`
          }
        })
        let json = await res.json()
        console.log(json)

        if(!json.isErr){
          setOrders(json.data)
          
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
    },[])
    useEffect(()=>{
      cbFetchAllOrders()
    },[])
    const getLanguage = useRecoilValue(languageState);
    
    
    return (
      <>
      <IonMenu side="end" contentId="main-content">
      <Header2 name={getLanguage.language.cmo.header} />
      </IonMenu> 
        <IonPage id="main-content">
        {/* {getLanguage.language && */}
          <>
          <Header name={getLanguage.language.cmo.header} />
          <IonContent fullscreen className="ion-padding">
            
            {orders.map(obj=>
              <IonCard className="myOrderCard" key={obj.id}>
                <IonCardHeader>
                  <IonCardTitle>{getLanguage.language.cmo.orderNoTitle+obj.id} </IonCardTitle>
                  {obj.status==="w_pickup" && <IonCardTitle>{getLanguage.language.cmo.orderStatusTitle}</IonCardTitle>}
                  {obj.status==="w_pickup" && <IonCardTitle>{getLanguage.language.cmo.orderAmountTitle}</IonCardTitle>}
                </IonCardHeader>
                <IonCardHeader>
                <IonItem>
                  <IonImg src="assets/icon/wash_fold_img.svg"></IonImg>
                  <IonCardSubtitle>{orderItemsDecode(obj.order_items).poundWash}</IonCardSubtitle>
                </IonItem>  
                <IonItem>
                <IonImg src="assets/icon/dry_clean_img.svg"></IonImg>
                  <IonCardSubtitle>{orderItemsDecode(obj.order_items).dryCleaning}</IonCardSubtitle>
                </IonItem>  
                {/* </IonCardHeader>
                <IonCardHeader> */}
                <IonItem>
                <IonImg src="assets/icon/shoe_care_img.svg"></IonImg>
                <IonCardSubtitle>{orderItemsDecode(obj.order_items).washShoes}</IonCardSubtitle>
                </IonItem>
                <IonItem>
                <IonImg src="assets/icon/plbag.png"></IonImg>
                <IonCardSubtitle>{orderItemsDecode(obj.order_items).leatherWashBag}</IonCardSubtitle>
                </IonItem>
                </IonCardHeader>
                
                <IonCardContent>
                  <IonCardSubtitle>{getLanguage.language.cmo.orderReqPickUpDateTime}</IonCardSubtitle>
                  <IonCardSubtitle>{obj.pickup_date_time}</IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            )}
            
            
            
          </IonContent>
          </>
        {/* }   */}
        </IonPage>
      </>
    );
  };
  
  export default React.memo(C_myOrder);
  