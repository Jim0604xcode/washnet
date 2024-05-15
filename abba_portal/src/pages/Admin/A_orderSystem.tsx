import React from "react";
import OrderSystemTable from "../../components/OrderSystemTable";
import { IonPage, IonContent, IonSplitPane } from "@ionic/react";
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
