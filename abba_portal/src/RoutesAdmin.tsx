import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router';


import Error404 from './pages/Error404';
import { useRecoilValue } from 'recoil';
import { languageState } from './service/Recoil';
import A_orderSystem from './pages/Admin/A_orderSystem';
import A_themeSystem from './pages/Admin/A_themeSystem';
import A_themeSystem_editor from './pages/Admin/A_themeSystemEditor';
import A_staffSystem from './pages/Admin/A_staffSystem';
import A_setting from './pages/Admin/A_setting';
import { useState } from 'react';



const RoutesCustomer: React.FC = () => {
  const getLanguage = useRecoilValue(languageState);
  const [active,setActive] = useState<number|null>(null)
  return (
    <IonTabs>
        
        <IonRouterOutlet>
        <Switch>
            
          
            

            {/* Admin */}
            <Route path="/A-orderSystem">
                <A_orderSystem />
            </Route>
            <Route exact path="/A-themeSystem">
                <A_themeSystem />
            </Route>
            <Route path="/A-staffSystem">
                <A_staffSystem />
            </Route>
            <Route path="/A-setting">
                <A_setting />
            </Route>

            <Route exact path="/A-themeSystem/:id">
                <A_themeSystem_editor />
            </Route>

           
            {/* Guest */}
            <Route path="/G-laundryService">
            <A_themeSystem />
            </Route>
            <Route path="/G-setting">
            <A_themeSystem />
            </Route>



            <Route exact path="/">
                <Redirect to="/A-themeSystem" />
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
          <IonTabButton className={active===0 ? "active" : ""} onClick={()=>setActive(0)} tab="A-orderSystem" href="/A-orderSystem">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonLabel>{getLanguage.language.aos.header}</IonLabel>
          </IonTabButton>
          <IonTabButton className={active===1 ? "active" : ""} onClick={()=>setActive(1)} tab="A-themeSystem" href="/A-themeSystem">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonLabel>{getLanguage.language.as.header}</IonLabel>
          </IonTabButton>
          <IonTabButton className={active===2 ? "active" : ""} onClick={()=>setActive(2)} tab="A-staffSystem" href="/A-staffSystem">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonLabel>{getLanguage.language.ass.header}</IonLabel>
          </IonTabButton>
          <IonTabButton className={active===3 ? "active" : ""} onClick={()=>setActive(3)} tab="A-setting" href="/A-setting">
            {/* <IonIcon aria-hidden="true" icon={square} /> */}
            <IonLabel>{getLanguage.language.ats.header}</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
  );
};

export default RoutesCustomer;
