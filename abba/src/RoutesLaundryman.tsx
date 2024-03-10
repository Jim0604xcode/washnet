import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';


import { square } from 'ionicons/icons';

import C_setting from './pages/Customer/C_setting';
import C_myOrder from './pages/Customer/C_myOrder';
import C_laundryService from './pages/Customer/C_laundryService';

import Error404 from './pages/Error404';



const RoutesLaundryman: React.FC = () => {
  


  return (
    <IonTabs>
        
        <IonRouterOutlet>
        <Switch>
            
          
            {/* laundryman */}
            <Route path="/Lw-clean">
            <C_laundryService />
            </Route>
            <Route path="/Lc-item">
            <C_laundryService />
            </Route>
            <Route path="/L-setting">
            <C_laundryService />
            </Route>

            {/* Admin */}
            <Route path="/A-orderSystem">
            <C_laundryService />
            </Route>
            <Route path="/A-themeSystem">
            <C_laundryService />
            </Route>
            <Route path="/A-staffSystem">
            <C_laundryService />
            </Route>
            <Route path="/A-setting">
            <C_laundryService />
            </Route>

            {/* Delivery */}
            <Route path="/Dw-collect">
            <C_laundryService />
            </Route>
            <Route path="/Dw-delivery">
            <C_laundryService />
            </Route>
            <Route path="/Dc-item">
            <C_laundryService />
            </Route>
            <Route path="/D-setting">
            <C_laundryService />
            </Route>

            {/* Customer */}
            <Route path="/C-laundryService">
                <C_laundryService />
            </Route>
            <Route path="/C-myOrder">
                <C_myOrder />
            </Route>
            <Route path="/C-setting">
                <C_setting />
            </Route>

            {/* Guest */}
            <Route path="/G-laundryService">
            <C_laundryService />
            </Route>
            <Route path="/G-setting">
            <C_laundryService />
            </Route>



            <Route exact path="/">
                <Redirect to="/C-laundryService" />
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
          <IonTabButton tab="C-laundryService" href="/C-laundryService ">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>待清洗</IonLabel>
          </IonTabButton>
          <IonTabButton tab="C-laundryService" href="/C-laundryService ">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>完成項目</IonLabel>
          </IonTabButton>
          <IonTabButton tab="C-laundryService" href="/C-laundryService ">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>設定</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
  );
};

export default RoutesLaundryman;
