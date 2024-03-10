import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Header from "../../components/Header";


  
  
  const Dc_item: React.FC = () => {
    
    return (
      <>
        <IonPage>
          <Header name="完成項目" />
          <IonContent fullscreen className="ion-padding">

          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default React.memo(Dc_item);
  