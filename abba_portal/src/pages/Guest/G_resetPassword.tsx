import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonNote, IonPage } from "@ionic/react";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from 'react-router-dom';
import Header2 from "../../components/Header2";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { register } from "../../serviceWorkerRegistration";
import { ResetPasswordFormState, getResetPasswordFormDefaultValues, getResetPasswordFormYupResolver } from "../../service/FormBuilder";
import { useForm } from "react-hook-form";
import sweetAlert from 'sweetalert2'
  
  const G_resetPassword: React.FC = () => {
    
    const { token }: { token: string } = useParams();
    
    const cbGetCheckToken = useCallback(async (token: string) => {
        
        let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/checkResetPasswordToken`,{
            headers:{
              "Content-type":"application/json",
              'Authorization': `Bearer ${token}`
            },
        })
        let json = await res.json()
        console.log(json)
        
    }, [])
    useEffect(() => {
        cbGetCheckToken(token)
    }, [])
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormState>({
        resolver: getResetPasswordFormYupResolver(),
        defaultValues: getResetPasswordFormDefaultValues(),
    });
      
    const onSubmit = async (data: ResetPasswordFormState) => {
        
        try {
            let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/resetPassword`,{
                headers:{
                  "Content-type":"application/json",
                  'Authorization': `Bearer ${token}`
                },
                method:"POST",
                body:JSON.stringify(data)  
            })
            let json = await res.json()
            
            if(!json.isErr){
                sweetAlert.fire({
                    icon: 'success',
                    title: 'Reset Password',
                    text:"success",
                    showConfirmButton: false,
                    timer: 1500
                  }) 
            }    
        } catch (error:any) {
            sweetAlert.fire({
                icon: 'info',
                title: 'Message',
                text:error.message,
                showConfirmButton: false,
                timer: 1500
              })    
        }
        
        
    };
    
    return (
      <>
      <IonMenu side="end" contentId="main-content">
        <Header2 name={"重設密碼"} />
      </IonMenu> 
        <IonPage id="main-content">
          <Header name={"重設密碼"} />
          <IonContent fullscreen className="ion-padding">
            <form onSubmit={handleSubmit(onSubmit)}>
            <IonItem fill="outline">
                <IonLabel position="floating">密碼</IonLabel>
                <IonInput className="text" clearInput={true} {...register("password")} aria-label="password" placeholder="密碼"></IonInput>
            </IonItem>
            <IonNote>{errors.password?.message}</IonNote>
            <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
            <IonButton className="formBtn" shape="round" type="submit">Submit</IonButton>
            </div>
            </form>
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default G_resetPassword;
  
  