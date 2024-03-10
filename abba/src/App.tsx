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
import RoutesCustomer from './RoutesCustomer';
import RoutesDelivery from './RoutesDelivery';
import RoutesLaundryman from './RoutesLaundryman';
import RoutesAdmin from './RoutesAdmin';


setupIonicReact();

const App: React.FC = () => {
  
  const setRoleState = useSetRecoilState(roleState);
  const setIsReadyState = useSetRecoilState(isReadyState);
  const getIsReady = useRecoilValue(isReadyState);
  const getRole = useRecoilValue(roleState);
  
  const cbReadyFunc = useCallback((boo:boolean)=>setterIsReadyState(boo,setIsReadyState),[])  
  const cbRoleFunc = useCallback((currentRole:string)=>setterRoleState(currentRole,setRoleState),[])
  
  
    
  

  return (
  <IonApp>
    
    <IonReactRouter>
    <ProtectedRoute cbReadyFunc={cbReadyFunc} cbRoleFunc={cbRoleFunc} />
    {!getIsReady.isReady && <Loading label="Page is Loading" />}  
    
    {getRole.role === "admin" && <RoutesAdmin/>}
    {getRole.role === "laundryman" && <RoutesLaundryman/>}
    {getRole.role === "delivery" && <RoutesDelivery/>}
    {getRole.role === "customer" && <RoutesCustomer/>}
    {getRole.role === "guest" && <RoutesGuest/>}
    
    

    </IonReactRouter>
  </IonApp>
)};

export default App;
