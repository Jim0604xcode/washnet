import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';


import { square } from 'ionicons/icons';

import D_setting from './pages/Delivery/D_setting';
import Dc_item from './pages/Delivery/Dc_item';
import Dw_delivery from './pages/Delivery/Dw_delivery';
import Dw_collect from './pages/Delivery/Dw_collect';
import Error404 from './pages/Error404';



const RoutesDelivery: React.FC = () => {
  


  return (
    <IonTabs>
        
        <IonRouterOutlet>
        <Switch>
            
          
            {/* laundryman */}
            <Route path="/Lw-clean">
                <Dw_collect />
            </Route>
            <Route path="/Lc-item">
                <Dw_collect />
            </Route>
            <Route path="/L-setting">
                <Dw_collect />
            </Route>

            {/* Admin */}
            <Route path="/A-orderSystem">
                <Dw_collect />
            </Route>
            <Route path="/A-themeSystem">
                <Dw_collect />
            </Route>
            <Route path="/A-staffSystem">
                <Dw_collect />
            </Route>
            <Route path="/A-setting">
                <Dw_collect />
            </Route>

            {/* Delivery */}
            <Route path="/Dw-collect">
                <Dw_collect />
            </Route>
            <Route path="/Dw-delivery">
                <Dw_delivery />
            </Route>
            <Route path="/Dc-item">
                <Dc_item />
            </Route>
            <Route path="/D-setting">
                <D_setting />
            </Route>

            {/* Customer */}
            <Route path="/C-laundryService">
                <Dw_collect />
            </Route>
            <Route path="/C-myOrder">
                <Dw_collect />
            </Route>
            <Route path="/C-setting">
                <Dw_collect />
            </Route>

            {/* Guest */}
            <Route path="/G-laundryService">
                <Dw_collect />
            </Route>
            <Route path="/G-setting">
                <Dw_collect />
            </Route>



            <Route exact path="/">
                <Redirect to="/Dw-collect" />
            </Route>
          
            <Route exact path="/error404">
                <Error404 />
            </Route>
            <Route exact path="*">
                <Redirect to="/error404" />
            </Route>
        </Switch>  
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          
          <IonTabButton tab="Dw-collect" href="/Dw-collect">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>待回收</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Dw-delivery" href="/Dw-delivery">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>待送出</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Dc-item" href="/Dc-item">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>完成項目</IonLabel>
          </IonTabButton>
          <IonTabButton tab="D-setting" href="/D-setting">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>設定</IonLabel>
          </IonTabButton>

        </IonTabBar>

      </IonTabs>
  );
};

export default RoutesDelivery;
