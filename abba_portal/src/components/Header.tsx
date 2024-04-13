import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "../service/Recoil";
import { getterLanguaue, setterLanguage } from "../service/api";
import "./Header.scss";

  
  
  const Header: React.FC<{name:string}> = ({name}) => {
    const getLanguage = useRecoilValue(languageState);
    const setLanguageState = useSetRecoilState(languageState);
    let changeLan = async () => {
      let data = await getterLanguaue(getLanguage.require)
      
      data = await JSON.parse(data)
      console.log(data)
      
      await setterLanguage(setLanguageState,data)
  }
    return (
      <>
      
        <IonHeader>
            <IonToolbar>
              <IonTitle>{name}</IonTitle>
                <IonButtons slot="end">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
      </>
    );
  };
  
  export default React.memo(Header);
  