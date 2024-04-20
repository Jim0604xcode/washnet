import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";

import { PlaceOrderType } from "../service/FormBuilder";
import PlaceOrder from "./PlaceOrder";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";

const OrderSystemOrderModal: React.FC<{isOpen:boolean,cbSetIsOpen:(boo:boolean)=>void,title:string,cbSubmitForm:(placeOrder:any)=>void,placeOrder:PlaceOrderType,orderId:number,orderStatus:string}> = ({isOpen,cbSetIsOpen,title,cbSubmitForm,placeOrder,orderId,orderStatus}) => {
  const getLanguage = useRecoilValue(languageState);
  console.log(placeOrder)
  
  return (
    <>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{title}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="customButton" onClick={() => cbSetIsOpen(false)}>{getLanguage.language.aos.closeBtn}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            
            <PlaceOrder status={title === "Add New Order" || title === "新增訂單" ? 2 : 1} cbSubmitForm={cbSubmitForm} placeOrder={placeOrder} orderId={orderId} orderStatus={orderStatus}/>
          </IonContent>
        </IonModal>
    </>
  );
};

export default OrderSystemOrderModal;