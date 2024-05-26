import { IonIcon, IonImg, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';



import G_setting from './pages/Guest/G_setting';

import Error404 from './pages/Error404';

import { useRecoilValue } from 'recoil';
import { languageState } from './service/Recoil';
import { useState } from 'react';
import G_resetPassword from './pages/Guest/G_resetPassword';



const RoutesGuest: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    const [active,setActive] = useState<number>(1)

  return (
    <IonTabs>
        
        <IonRouterOutlet>
        <Switch>
            
          
            
            {/* Admin */}
            <Route path="/A-orderSystem">
                <G_setting />
            </Route>
            <Route path="/A-themeSystem">
                <G_setting />
            </Route>
            <Route path="/A-staffSystem">
                <G_setting />
            </Route>
            <Route path="/A-setting">
                <G_setting />
            </Route>

            
            
            {/* Guest */}
            <Route path="/G-setting">
                <G_setting />
            </Route>

            <Route path="/reset-password/:token">
                <G_resetPassword />
            </Route>


            <Route exact path="/">
                <Redirect to="/G-setting" />
            </Route>
          
            <Route exact path="/error404">
                <Error404 />
            </Route>
            <Route exact path="*">
                <Redirect to="/error404" />
            </Route>
        </Switch>  
        </IonRouterOutlet>

        <IonTabBar className="footer" slot="bottom">
          {/* <IonTabButton onClick={()=>setActive(0)} tab="G-laundryService" href="/G-laundryService"> */}
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            {/* <IonImg className="img" src={active===0 ? "assets/icon/fthome_active.png" : "assets/icon/fthome.png"}></IonImg> */}
            {/* <IonLabel>{getLanguage.language.guestFooterBtn1}</IonLabel> */}
          {/* </IonTabButton> */}
          <IonTabButton onClick={()=>setActive(1)} tab="G-setting" href="/G-setting">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonImg className="img" src={active===1 ? "assets/icon/ftcustomer_active.png" : "assets/icon/ftcustomer.png"}></IonImg>
            {/* <IonLabel>{getLanguage.language.guestFooterBtn2}</IonLabel> */}
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
  );
};

export default RoutesGuest;
