import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { useRecoilValue } from 'recoil';
import { languageState } from '../service/Recoil';

function AdminMenu() {
    const getLanguage = useRecoilValue(languageState);
  return (
    <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonTitle>{getLanguage.language.adminMenuHeader}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem class='ripple-parent' routerLink="/A-themeSystem">
        
        <IonLabel>{getLanguage.language.as.header}</IonLabel>
      </IonItem>

      <IonItem class='ripple-parent' routerLink="/A-orderSystem">
        
        <IonLabel>{getLanguage.language.aos.header}</IonLabel>
      </IonItem>
      
      <IonItem class='ripple-parent' routerLink="/A-staffSystem">
        
        <IonLabel>{getLanguage.language.ass.header}</IonLabel>
        
      </IonItem>
      <IonItem class='ripple-parent' routerLink="/A-setting">
        
        <IonLabel>{getLanguage.language.ats.header}</IonLabel>
      </IonItem>
    </IonContent>
  </IonMenu>
  )
}

export default AdminMenu