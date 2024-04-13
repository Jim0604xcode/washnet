import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { User } from "../service/UserTableData";
import Register from "./Register";
import EditCustomer from "./EditCustomer";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";


const UserSystemUserModal: React.FC<{isOpen:boolean,cbSetIsOpen:(boo:boolean)=>void,title:string,cbSubmitForm:(userData:any)=>void,userId:string}> = ({isOpen,cbSetIsOpen,title,cbSubmitForm,userId}) => {
  const getLanguage = useRecoilValue(languageState);
  
  return (
    <>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{title}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="customButton" onClick={() => cbSetIsOpen(false)}>{getLanguage.language.ass.closeBtn}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {title === "Add New User" || title === "新增用戶" ? 
            <Register cbSubmitForm={cbSubmitForm} isAdmin={true} /> 
            :
            <EditCustomer cbSubmitForm={cbSubmitForm} userId={userId}/>
            }
            
          </IonContent>
        </IonModal>
    </>
  );
};

export default UserSystemUserModal;