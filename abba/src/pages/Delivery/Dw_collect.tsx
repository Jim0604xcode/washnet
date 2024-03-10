import { IonPage, IonContent } from "@ionic/react";
import React, { useCallback, useEffect } from "react";
import Header from "../../components/Header";
import { useRecoilValue } from "recoil";
import { getValue } from "../../service/LocalStorage";
import { languageState } from "../../service/Recoil";
import sweetAlert from 'sweetalert2'

  
  
  const Dw_collect: React.FC = () => {
    let cbFetchAllOrders = useCallback(async()=>{
      try{
       
        let token = await getValue("token")
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getDeliveryWaitPickup`,{
          headers:{
            "Content-type":"application/json",
            'Authorization': `Bearer ${token}`
          }
        })
        let json = await res.json()
        console.log(json)

        if(!json.isErr){
          
          
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
        <IonPage>
          <Header name="待回收" />
          <IonContent fullscreen className="ion-padding">

          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default React.memo(Dw_collect);
  