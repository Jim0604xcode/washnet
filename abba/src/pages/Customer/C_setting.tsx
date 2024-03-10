import { IonButton, IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../../service/Recoil";
import Header from "../../components/Header";
import { logout } from "../../service/api";

  
  
  const C_setting: React.FC = () => {
    const setRoleState = useSetRecoilState(roleState);
    const history = useHistory()
    const getLanguage = useRecoilValue(languageState);

    async function handleLogout(){
      await logout("guest",setRoleState,history)
    }
    
    
    return (
      <>
      <IonPage>
          {getLanguage.language && 
          <>
          <Header name={getLanguage.language.cs.header} />
          <IonContent fullscreen className="ion-padding">
            <div style={{display:"flex",justifyContent:"center"}}>
              <IonButton shape="round" type="button" onClick={handleLogout}>Logout</IonButton>
            </div>
          </IonContent>
          </>
          }
          
      </IonPage>
      </>
    );
  };
  
  export default React.memo(C_setting);
  