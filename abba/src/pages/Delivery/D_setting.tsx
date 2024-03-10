import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Header from "../../components/Header";


  
  
  const D_setting: React.FC = () => {
    
    return (
      <>
        <IonPage>
          <Header name="設定" />
          <IonContent fullscreen className="ion-padding">

          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default React.memo(D_setting);
  