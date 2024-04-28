import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel } from '@ionic/react'
import { useRecoilValue } from 'recoil';
import { languageState } from '../service/Recoil';
import { useState } from 'react';

const AdminMenu: React.FC<{active:number}> = ({active}) => {
    const getLanguage = useRecoilValue(languageState);
    // const [active,setActive] = useState<number|null>(null)
  return (
    <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar id="adminMenu">
        <IonTitle>{getLanguage.language.adminMenuHeader}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem className={active===0 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-themeSystem">
        
        <IonLabel>{getLanguage.language.as.header}</IonLabel>
      </IonItem>

      <IonItem className={active===1 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-orderSystem">
        
        <IonLabel>{getLanguage.language.aos.header}</IonLabel>
      </IonItem>
      
      <IonItem className={active===2 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-staffSystem">
        
        <IonLabel>{getLanguage.language.ass.header}</IonLabel>
        
      </IonItem>
      <IonItem className={active===3 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-setting">
        
        <IonLabel>{getLanguage.language.ats.header}</IonLabel>
      </IonItem>
    </IonContent>
  </IonMenu>
  );
}

export default AdminMenu;