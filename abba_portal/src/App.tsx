import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useCallback, useEffect } from 'react';

import ProtectedRoute from './ProtectedRoute';
import Loading from './components/Loading';
import { isReadyState, roleState, setterIsReadyState, setterRoleState } from './service/Recoil';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import RoutesGuest from './RoutesGuest';
import RoutesAdmin from './RoutesAdmin';

import { PushNotifications } from '@capacitor/push-notifications';
import { requestForToken } from './firebaseConfig';

setupIonicReact();

const App: React.FC = () => {
  
  const setRoleState = useSetRecoilState(roleState);
  const setIsReadyState = useSetRecoilState(isReadyState);
  const getIsReady = useRecoilValue(isReadyState);
  const getRole = useRecoilValue(roleState);
  
  const cbReadyFunc = useCallback((boo:boolean)=>setterIsReadyState(boo,setIsReadyState),[])  
  const cbRoleFunc = useCallback((currentRole:string)=>setterRoleState(currentRole,setRoleState),[])
  
  
  useEffect(()=>{
    console.log(process.env.REACT_APP_API_ENDPOINT)
    const main = async () => {
      // requestForToken()
      await reg_push_notifications_token()
      await reg_push_notification_listeners()
    }
    main()
  },[])
  const reg_push_notification_listeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.log('Registration token: ', token.value);
      prompt(JSON.stringify(token.value))
    });

    await PushNotifications.addListener('registrationError', err => {
      console.log('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
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
  

  return (
  <IonApp>
    
    <IonReactRouter>
    <ProtectedRoute cbReadyFunc={cbReadyFunc} cbRoleFunc={cbRoleFunc} />
    {!getIsReady.isReady && <Loading label="Page is Loading" />}  
    
    {getRole.role === "admin" && <RoutesAdmin/>}
    {getRole.role === "delivery" && <RoutesAdmin/>}
    {getRole.role === "laundry" && <RoutesAdmin/>}
    {getRole.role === "guest" && <RoutesGuest/>}
    {/* <RoutesAdmin/> */}
    {/* <RoutesGuest/> */}

    </IonReactRouter>
  </IonApp>
)};

export default App;
