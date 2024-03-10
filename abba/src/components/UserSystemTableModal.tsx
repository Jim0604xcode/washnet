import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";

import { useMemo } from "react";
import { User } from "../service/UserTableData";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";

// import { data } from "../service/TableData";






const UserSystemTableModal: React.FC<{isOpen:boolean,cbSetIsOpen:(boo:boolean)=>void,title:string,cbFilter:(cri:string[]|number[],accessor:string,initTData:User[])=>void,accessor:string,initTData:User[]}> = ({isOpen,cbSetIsOpen,title,cbFilter,accessor,initTData}) => {
  const getLanguage = useRecoilValue(languageState);
  const memoData = useMemo(()=>{
        
        let newData = initTData.map(obj=>{
            
            return Object.entries(obj).map((arr)=>{
                
                
                if(arr[0]===accessor){
                    
                    return arr[1]
                }
            }).filter(str=>str!==undefined)[0]
            
        })
        return [...new Set(newData)];
    }
  ,[accessor])
  
  return (
    <>
    <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{getLanguage.language.ass.modalHeaderFilter}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="customButton" onClick={() => cbSetIsOpen(false)}>{getLanguage.language.ass.closeBtn}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <IonItem>
        <IonLabel>{title}</IonLabel>
          <IonSelect multiple={true} onIonChange={(e)=>cbFilter(e.target.value,accessor,initTData)}>
            {memoData.map((str,idx) => 
                <IonSelectOption key={idx} value={str}>{str}</IonSelectOption>
            )}
          </IonSelect>
        </IonItem>  
          </IonContent>
        </IonModal>
    </>
  );
};

export default UserSystemTableModal;