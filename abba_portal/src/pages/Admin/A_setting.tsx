import { IonPage, IonContent, IonButton, IonSplitPane } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../../service/Recoil";
import { logout } from "../../service/api";
import AdminMenu from "../../components/AdminMenu";
import Header from "../../components/Header";


  
  
  const A_setting: React.FC = () => {
    const setRoleState = useSetRecoilState(roleState);
    const history = useHistory()
    

    async function handleLogout(){
      await logout("guest",setRoleState,history)
    }
    const getLanguage = useRecoilValue(languageState);
    
    return (
      <>
      <IonPage>
      <IonContent fullscreen className="ion-padding">
          
      <IonSplitPane when="md" contentId="main">
            <AdminMenu active={3} />
            <div className="ion-page" id="main">
              <Header name={getLanguage.language.ats.header} />
              <div style={{display:"flex",justifyContent:"center"}}>
                <IonButton shape="round" type="button" onClick={handleLogout}>Logout</IonButton>
              </div>
            </div>
          
            </IonSplitPane>
          
          </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_setting);
  