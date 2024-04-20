import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { eyeOffOutline,eyeOutline } from 'ionicons/icons';
import { IonButton, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";
import { getLoginFormDefaultValues, getLoginFormYupResolver, LoginFormState } from "../service/FormBuilder";
import "./BasicForm.scss";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../service/Recoil";
import { useHistory } from "react-router";
import { login } from "../service/api";

const Login: React.FC = () => {
  const setRoleState = useSetRecoilState(roleState);
  
  const history = useHistory()
  const [passwordIsHide, setPasswordIsHide] = useState<boolean>(true)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormState>({
    resolver: getLoginFormYupResolver(),
    defaultValues: getLoginFormDefaultValues(),
  });
  
  const onSubmit = async (data: LoginFormState) => {
    
    await login(data,setRoleState,history)  
  };
  const getLanguage = useRecoilValue(languageState);
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonImg src="assets/icon/logo-ltblue.png"></IonImg>
      <h1>{getLanguage.language.gs.loginFormTitle}</h1>
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.loginFormField1}</IonLabel>
        <IonInput className="text" clearInput={true} {...register("mobileOrEmail")} aria-label="Mobile or Email" placeholder={getLanguage.language.gs.loginFormField1}></IonInput>
      </IonItem>
      <IonNote>{errors.mobileOrEmail?.message}</IonNote>
      
      <IonItem fill="outline">
        <IonLabel position="floating">{getLanguage.language.gs.loginFormField2}</IonLabel>
        <IonInput className="text" type={passwordIsHide ? "password":"text"} {...register("password")} aria-label="Password" placeholder={getLanguage.language.gs.loginFormField2}>
        </IonInput>
        {passwordIsHide && <IonIcon onClick={()=>setPasswordIsHide(false)} aria-hidden="true" icon={eyeOffOutline} />}
        {!passwordIsHide && <IonIcon onClick={()=>setPasswordIsHide(true)} aria-hidden="true" icon={eyeOutline} />}
      </IonItem>
      <IonNote>{errors.password?.message}</IonNote>
      

      <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <IonButton className="formBtn" shape="round" type="submit">Submit</IonButton>
      </div>
    </form>
    
    
  );
}  
export default Login;

