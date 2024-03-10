import { IonPage, IonContent, IonSplitPane } from "@ionic/react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import OrderSystemTable from "../../components/OrderSystemTable";
import { useRecoilValue } from "recoil";
import Header from "../../components/Header";
import { languageState } from "../../service/Recoil";


  
  
  const A_themeSystem: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    
    return (
      <>
        <IonPage>
        <IonContent fullscreen className="ion-padding">

          <IonSplitPane when="md" contentId="main">
            <AdminMenu />

            <div className="ion-page" id="main">
            <Header name={getLanguage.language.as.header} />
              {/* <OrderSystemTable /> */}
            </div>
          </IonSplitPane>

        </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_themeSystem);
  