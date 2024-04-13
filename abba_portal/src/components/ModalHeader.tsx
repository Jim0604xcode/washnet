import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "../service/Recoil";
import { getterLanguaue, setterLanguage } from "../service/api";


  
  
  const ModalHeader: React.FC<{name:string,cbSetIsOpenAddForm:(boo:boolean)=>void}> = ({name,cbSetIsOpenAddForm}) => {
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
                <IonButtons slot="start">
                    <IonButton className="customButton" onClick={changeLan}>{getLanguage.language.cls.switchLan}</IonButton>
                </IonButtons>
                <IonTitle>{name}</IonTitle>
               
                <IonButtons slot="end">
                    <IonButton className="customButton" onClick={() => cbSetIsOpenAddForm(false)}>{getLanguage.language.cls.backBtn}</IonButton>
                </IonButtons>
               
                
            </IonToolbar>
        </IonHeader>
      </>
    );
  };
  
  export default React.memo(ModalHeader);
  