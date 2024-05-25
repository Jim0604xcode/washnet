import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonImg } from '@ionic/react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { collapseState, languageState } from '../service/Recoil';
import { useHistory } from "react-router";
const AdminMenu: React.FC<{active:number}> = ({active}) => {
  const history = useHistory()
    const getLanguage = useRecoilValue(languageState);
    const getCollapseState = useRecoilValue(collapseState);
    const setCollapseState = useSetRecoilState(collapseState)
    
  return (
    <IonMenu contentId="main" className={getCollapseState ? "collapse" : ""}>
    <IonHeader>
      
      <IonToolbar id="adminMenu">
      {window.innerWidth >= 768 && 
        <IonImg onClick={()=>setCollapseState(!getCollapseState)} style={{width:"50px",margin:"0px 0px 0px 50px"}} src={getCollapseState ? "assets/icon/icons8-box-move-right-50.png" : "assets/icon/icons8-box-move-left-50.png"}></IonImg>  
      }
      
        <IonTitle>{getLanguage.language.adminMenuHeader}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
    {getCollapseState ?
        <IonImg onClick={()=>history.push('/A-themeSystem')} style={{width:"50px",margin:"20px auto"}} src="assets/icon/icons8-theme-50.png"></IonImg>
        :
      <IonItem className={active===0 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-themeSystem">  
        <IonLabel>{getLanguage.language.as.header}</IonLabel> 
      </IonItem>
    }
    {getCollapseState ?  
    <IonImg onClick={()=>history.push('/A-orderSystem')} style={{width:"50px",margin:"20px auto"}} src="assets/icon/icons8-mobile-order-50.png"></IonImg>
    :
      <IonItem className={active===1 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-orderSystem">
      
        
        <IonLabel>{getLanguage.language.aos.header}</IonLabel>
      
      </IonItem>
    }
    {getCollapseState ?
        <IonImg onClick={()=>history.push('/A-staffSystem')} style={{width:"50px",margin:"20px auto"}} src="assets/icon/icons8-find-user-male-50.png"></IonImg>
      :
      <IonItem className={active===2 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-staffSystem">
       
        <IonLabel>{getLanguage.language.ass.header}</IonLabel>
        
      </IonItem>
      }
      {getCollapseState ?
        <IonImg onClick={()=>history.push('/A-setting')} style={{width:"50px",margin:"20px auto"}} src="assets/icon/icons8-automatic-50.png"></IonImg>
      :
      <IonItem className={active===3 ? "ripple-parent active" : "ripple-parent"} routerLink="/A-setting">
      
        <IonLabel>{getLanguage.language.ats.header}</IonLabel>
        
      </IonItem>
      }
      
      
    </IonContent>
  </IonMenu>
  );
}

export default AdminMenu;