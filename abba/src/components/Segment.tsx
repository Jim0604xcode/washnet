import React from 'react';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import "./Segment.scss";


const Segment: React.FC<{label1:string,label2:string,active:string,cbSet:(cur:string)=>void}> = ({label1,label2,active,cbSet}) => {
    
  return (
    <>
      <IonSegment value={active}>
        <IonSegmentButton onClick={()=>cbSet("Login")} value={"Login"}>
          <IonLabel>{label1}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton onClick={()=>cbSet("Register")} value={"Register"}>
          <IonLabel>{label2}</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
}
export default React.memo(Segment);