import { IonPage, IonContent, IonButton, IonSplitPane } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState, roleState } from "../../service/Recoil";
import { logout } from "../../service/api";
import AdminMenu from "../../components/AdminMenu";
import Header from "../../components/Header";
import { PushNotifications } from '@capacitor/push-notifications';
import { getValue } from "../../service/LocalStorage";
import sweetAlert from 'sweetalert2'
  
  
  const A_setting: React.FC = () => {
    const setRoleState = useSetRecoilState(roleState);
    const history = useHistory()
    

    async function handleLogout(){
      await logout("guest",setRoleState,history)
    }
    async function handleRegCloudToken(){
      await reg_push_notifications_token()
      await reg_push_notification_listeners()
    }


    const reg_push_notification_listeners = async () => {
      await PushNotifications.addListener('registration', async fcmToken => {
        console.log('Registration token: ', fcmToken.value);
        try {
          let token = await getValue("token")
          let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/admin/editMessagongToken`,{
          headers:{
            "Content-type":"application/json",
            'Authorization': `Bearer ${token}`
          },
          method:"PUT",
          body:JSON.stringify({fcmToken:fcmToken.value})  
          })
          let json = await res.json()
          if(!json.isErr){
            sweetAlert.fire({
            icon: 'success',
            title: 'Message',
            text:'Successfully place new order',
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
      });
  
      await PushNotifications.addListener('registrationError', err => {
        console.log('Registration error: ', err.error);
      });
  
      
    }
    const reg_push_notifications_token = async () => {
      let permStatus = await PushNotifications.checkPermissions();
  
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
  
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
  
      await PushNotifications.register();
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
                <IonButton shape="round" type="button" onClick={handleLogout}>登出</IonButton>
              </div>
              {/* <div style={{display:"flex",justifyContent:"center"}}>
                <IonButton shape="round" type="button" onClick={handleRegCloudToken}>登記手機推送</IonButton>
              </div> */}
            </div>
          
            </IonSplitPane>
          
          </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_setting);
  