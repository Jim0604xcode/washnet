import { IonImg, IonCard, IonGrid, IonRow, IonCol, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from '@ionic/react'
import PlaceOrder from './PlaceOrder'
import { PlaceOrderFormState, PlaceOrderType, getPlaceOrderFormDefaultValues } from "../service/FormBuilder";
import { cbAddOrder } from "../service/api";
import { useCallback, useState } from "react";
import Swiped from './Swiped';
import "./ProductList.scss";
import { useRecoilValue } from 'recoil';
import { languageState } from '../service/Recoil';
import ModalHeader from './ModalHeader';





function Home() {
    const [isOpen,setIsOpen] = useState(false)
    const [placeOrder,setPlaceOrder] = useState<PlaceOrderType>(getPlaceOrderFormDefaultValues())
    let setOrder = (key:`poundWash` | `dryCleaning` | `washShoes` | `leatherWashBag`,qty:number) => {
      
        setPlaceOrder(placeOrder=>{
          let newPlaceOrder = {...placeOrder}
          newPlaceOrder[`${key}`] = qty
          // console.log(newPlaceOrder)
          return newPlaceOrder
        })
      
      }
      let openOrder = () => {
        setIsOpen(true)
      }
      let cbSetIsOpenAddForm = useCallback((boo:boolean)=>{
        setIsOpen(boo)
      },[])
      let cbAddData = useCallback(async (data:PlaceOrderType|any)=>{
        await cbAddOrder(data)
      },[])  
      const getLanguage = useRecoilValue(languageState);
      
  return (
    <>
        
        



            <IonCard className="card">
              
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <h2>{getLanguage.language.cls.cardTitle}</h2>
                    <h5>{getLanguage.language.cls.cardSubTitle}</h5>
                    <h3>{getLanguage.language.cls.priceLtTitle}</h3>  
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonImg className="img" src="assets/icon/wash_fold_img.svg"></IonImg>
                    <h3>{getLanguage.language.cls.serviceList[0].name}</h3>
                    {
                      placeOrder.poundWash === 0 
                      && 
                      <IonButton onClick={()=>setOrder("poundWash",1)}>
                      {getLanguage.language.cls.selectedBtnText1}
                      </IonButton>  
                    }
                    {
                      placeOrder.poundWash === 1
                      && 
                      <IonButton onClick={()=>setOrder("poundWash",0)}>
                      {getLanguage.language.cls.selectedBtnText2}
                      </IonButton>  
                    }
                  </IonCol>
                  <IonCol size="6">
                    <IonImg className="img" src="assets/icon/dry_clean_img.svg"></IonImg>
                    <h3>{getLanguage.language.cls.serviceList[1].name}</h3>
                    {
                      placeOrder.dryCleaning === 0 
                      && 
                      <IonButton onClick={()=>setOrder("dryCleaning",1)}>
                      {getLanguage.language.cls.selectedBtnText1}
                      </IonButton>  
                    }
                    {
                      placeOrder.dryCleaning === 1
                      && 
                      <IonButton onClick={()=>setOrder("dryCleaning",0)}>
                      {getLanguage.language.cls.selectedBtnText2}
                      </IonButton>  
                    }
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="6">
                    <IonImg className="img" src="assets/icon/shoe_care_img.svg"></IonImg>
                    <h3>{getLanguage.language.cls.serviceList[2].name}</h3>
                    {
                      placeOrder.washShoes === 0 
                      && 
                      <IonButton onClick={()=>setOrder("washShoes",1)}>
                      {getLanguage.language.cls.selectedBtnText1}
                      </IonButton>  
                    }
                    {
                      placeOrder.washShoes === 1
                      && 
                      <IonButton onClick={()=>setOrder("washShoes",0)}>
                      {getLanguage.language.cls.selectedBtnText2}
                      </IonButton>  
                    }
                  </IonCol>
                  <IonCol size="6">
                    <IonImg className="img" src="assets/icon/plbag.png"></IonImg>
                    <h3>{getLanguage.language.cls.serviceList[3].name}</h3>
                    {
                      placeOrder.leatherWashBag === 0 
                      && 
                      <IonButton onClick={()=>setOrder("leatherWashBag",1)}>
                      {getLanguage.language.cls.selectedBtnText1}
                      </IonButton>  
                    }
                    {
                      placeOrder.leatherWashBag === 1
                      && 
                      <IonButton onClick={()=>setOrder("leatherWashBag",0)}>
                      {getLanguage.language.cls.selectedBtnText2}
                      </IonButton>  
                    }
                  </IonCol>
                </IonRow>

              </IonGrid>
                
                
                
              <IonButton onClick={openOrder}>
              {getLanguage.language.cls.confirmBtnText}
              </IonButton>  
                
              
            </IonCard>

            <IonCard className="card">        
            <Swiped />
            </IonCard>

            <IonModal isOpen={isOpen}>
              
              <ModalHeader name={getLanguage.language.cls.ModalTitle} cbSetIsOpenAddForm={cbSetIsOpenAddForm} />
              <IonContent className="ion-padding">
                <PlaceOrder status={0} cbSubmitForm={cbAddData} placeOrder={placeOrder} orderId={0} orderStatus={""}/>
              </IonContent>
            </IonModal>    
    </>
  )
  
}

export default Home