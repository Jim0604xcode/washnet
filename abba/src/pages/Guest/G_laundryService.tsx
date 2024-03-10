import { IonPage, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import React from "react";
import Header from "../../components/Header";
import Home from "../../components/Home";
import { useRecoilValue } from "recoil";
import { languageState } from "../../service/Recoil";
import Header2 from "../../components/Header2";



  
  
  const G_laundryService: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    return (
      <>
      <IonMenu side="end" contentId="main-content">
        <Header2 name={getLanguage.language.cls.header} />
      </IonMenu> 
        <IonPage id="main-content">
        <Header name={getLanguage.language.cls.header} />
       
        
          <IonContent fullscreen className="ion-padding">
            
            <Home />
            
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default React.memo(G_laundryService);
  