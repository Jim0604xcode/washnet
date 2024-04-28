import React, { useEffect } from "react";
import OrderSystemTable from "../../components/OrderSystemTable";
import { IonPage, IonContent, IonHeader, IonMenu, IonSplitPane, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonItem, IonLabel, IonTabButton } from "@ionic/react";
import { square } from "ionicons/icons";
import { useRecoilValue } from "recoil";
import { languageState } from "../../service/Recoil";
import AdminMenu from "../../components/AdminMenu";
import Header from "../../components/Header";




const A_orderSystem: React.FC = () => {
  const getLanguage = useRecoilValue(languageState);
  return (
    <>
      <IonPage>
        <IonContent fullscreen className="ion-padding">

          <IonSplitPane when="md" contentId="main">
            <AdminMenu active={1} />

            <div className="ion-page" id="main">
              <Header name={getLanguage.language.aos.header} />
              <OrderSystemTable />
            </div>
          </IonSplitPane>

        </IonContent>
      </IonPage>
    </>
  );
};

export default React.memo(A_orderSystem);
