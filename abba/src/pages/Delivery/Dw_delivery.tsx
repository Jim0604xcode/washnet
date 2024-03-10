import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Header from "../../components/Header";


  
  
  const Dw_delivery: React.FC = () => {
    
    return (
      <>
        <IonPage>
          <Header name="待送出" />
          <IonContent fullscreen className="ion-padding">

          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default React.memo(Dw_delivery);
  