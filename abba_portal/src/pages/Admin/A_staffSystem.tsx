import { IonPage, IonContent, IonSplitPane } from "@ionic/react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";
import { useRecoilValue } from "recoil";
import Header from "../../components/Header";
import { languageState } from "../../service/Recoil";
import UserSystemTable from "../../components/UserSystemTable";


  
  
  const A_staffSystem: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    return (
      <>
        <IonPage>
        <IonContent fullscreen className="ion-padding">

          <IonSplitPane when="md" contentId="main">
            <AdminMenu active={2} />

            <div className="ion-page" id="main">
            <Header name={getLanguage.language.ass.header} />
              <UserSystemTable />
            </div>
          </IonSplitPane>

        </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_staffSystem);
  