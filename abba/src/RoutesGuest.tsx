import { IonIcon, IonImg, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';


import { square } from 'ionicons/icons';
import G_laundryService from './pages/Guest/G_laundryService';
import G_setting from './pages/Guest/G_setting';

import Error404 from './pages/Error404';

import { useRecoilValue } from 'recoil';
import { languageState } from './service/Recoil';
import { useState } from 'react';



const RoutesGuest: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    const [active,setActive] = useState<number>(1)

  return (
    <IonTabs>
        
        <IonRouterOutlet>
        <Switch>
            
          
            {/* laundryman */}
            <Route path="/Lw-clean">
                <G_laundryService />
            </Route>
            <Route path="/Lc-item">
                <G_laundryService />
            </Route>
            <Route path="/L-setting">
                <G_laundryService />
            </Route>

            {/* Admin */}
            <Route path="/A-orderSystem">
                <G_laundryService />
            </Route>
            <Route path="/A-themeSystem">
                <G_laundryService />
            </Route>
            <Route path="/A-staffSystem">
                <G_laundryService />
            </Route>
            <Route path="/A-setting">
                <G_laundryService />
            </Route>

            {/* Delivery */}
            <Route path="/Dw-collect">
                <G_laundryService />
            </Route>
            <Route path="/Dw-delivery">
                <G_laundryService />
            </Route>
            <Route path="/Dc-item">
                <G_laundryService />
            </Route>
            <Route path="/D-setting">
                <G_laundryService />
            </Route>

            {/* Customer */}
            <Route path="/C-laundryService">
                <G_laundryService />
            </Route>
            <Route path="/C-myOrder">
                <G_laundryService />
            </Route>
            <Route path="/C-setting">
                <G_laundryService />
            </Route>

            {/* Guest */}
            <Route path="/G-laundryService">
                <G_laundryService />
            </Route>
            <Route path="/G-setting">
                <G_setting />
            </Route>



            <Route exact path="/">
                <Redirect to="/G-laundryService" />
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
          <IonTabButton onClick={()=>setActive(0)} tab="G-laundryService" href="/G-laundryService">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonImg className="img" src={active===0 ? "assets/icon/fthome_active.png" : "assets/icon/fthome.png"}></IonImg>
            {/* <IonLabel>{getLanguage.language.guestFooterBtn1}</IonLabel> */}
          </IonTabButton>
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
