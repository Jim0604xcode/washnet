import { IonContent, IonMenu, IonPage } from "@ionic/react";
import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import Login from "../../components/Login";
import Register from "../../components/Register";
import Segment from "../../components/Segment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../../service/Recoil";
import { RegisterFormState } from "../../service/FormBuilder";
import { handleRegister } from "../../service/api";

import { useHistory } from "react-router";
import Header2 from "../../components/Header2";
  
  
  const G_setting: React.FC = () => {
    const history = useHistory()
    const setRoleState = useSetRecoilState(roleState);
    const getLanguage = useRecoilValue(languageState);
    const [segment,setSegment] = useState<{active:string}>({
      active:"Login"
    })
    
    const cbSet = useCallback((curSegment:string)=>{
      setSegment(segment=>{
        let newSegment = {...segment}
        newSegment.active = curSegment  
        return newSegment
      })
    }
      
    ,[getLanguage])
    
    const cbSubmitForm = useCallback(async (data:RegisterFormState)=>{
      await handleRegister(data,setRoleState,history)
    }
      
    ,[])
    
    return (
      <>
      <IonMenu side="end" contentId="main-content">
        <Header2 name={getLanguage.language.cls.header} />
      </IonMenu> 
        <IonPage id="main-content">
          <Header name={getLanguage.language.gs.header} />
          <IonContent fullscreen className="ion-padding">
            <Segment label1={getLanguage.language.gs.segmentBtn1} label2={getLanguage.language.gs.segmentBtn2} active={segment.active} cbSet={cbSet} />
            {segment.active === "Login" && <Login />}
            {segment.active === "Register" && <Register cbSubmitForm={cbSubmitForm} isAdmin={false} />}
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default G_setting;
  
  