import { IonPage, IonContent, IonSplitPane, IonCol, IonGrid, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonItem, IonRippleEffect } from "@ionic/react";
import React from "react";
import AdminMenu from "../../components/AdminMenu";

import { useRecoilValue } from "recoil";
import Header from "../../components/Header";
import { languageState } from "../../service/Recoil";

// import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
// DocumentEditorContainerComponent.Inject(Toolbar);
// import { createReactEditorJS } from 'react-editor-js'
import "../../components/ThemeSystem.scss"
import { useHistory } from "react-router";


const A_themeSystem: React.FC = () => {
    const getLanguage = useRecoilValue(languageState);
    const history = useHistory()
    const orders = [
      {
        id:1,
        title:"磅洗",
        key:"pw"
      },
      {
        id:2,
        title:"乾洗",
        key:"dc"
      },
      {
        id:3,
        title:"洗鞋",
        key:"ws"
      },
      {
        id:4,
        title:"洗袋",
        key:"lw"
      },
      {
        id:5,
        title:"改衣",
        key:"cs"
      },
      {
        id:6,
        title:"家居用品",
        key:"fw"
      },
      {
        id:7,
        title:"主頁推廣",
        key:"pm"
      },
    ]
    
    
    
    
    return (
      <>
        <IonPage>
        <IonContent fullscreen className="ion-padding">

          <IonSplitPane when="md" contentId="main">
            <AdminMenu active={0} />
            <div id="main">
            
            <Header name={getLanguage.language.as.header} />
            
            <IonGrid>
              <IonRow>
                

                
              
            {orders.map(obj=>
            <IonCol key={obj.id} size="6" style={{textAlign:"center",border:"1px solid var(--ltblue-el-color)"}} className="ion-activatable ripple-parent">
              {/* <IonCard key={obj.id} className="ion-activatable ripple-parent"> */}
                
                {/* <IonCardHeader> */}
                  <div onClick={()=>{history.push('/A-themeSystem/'+obj.key)}} style={{padding:"15px 10px"}}>
                    <IonImg style={{width:"100%",height:"200px",userSelect:"none"}} src="assets/icon/wash_fold_img.svg"></IonImg>
                    <label style={{fontSize:"25px",fontFamily: "var(--noto-bold)"}}>{obj.title}</label>
                    <IonRippleEffect className="custom-ripple"></IonRippleEffect>
                  </div>  
                {/* </IonCardHeader> */}
                {/* <IonRippleEffect className="custom-ripple"></IonRippleEffect> */}
              {/* </IonCard> */}
              </IonCol>
            )}
            </IonRow>
            </IonGrid>
            
            </div>
          </IonSplitPane>
          
        </IonContent>
      </IonPage>
      </>
    );
  };
  
  export default React.memo(A_themeSystem);
  