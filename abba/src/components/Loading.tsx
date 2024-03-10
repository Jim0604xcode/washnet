import { IonLoading } from "@ionic/react";
import { useState } from "react";




const Loading: React.FC<{label:string}> = ({label}) => {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  
  return (
    <>
    <IonLoading
        cssClass='my-custom-class'
        onDidDismiss={()=>setShowLoading(false)}
        message={`${label}`} 
        isOpen={showLoading}        
        // duration={3000}
      />
    </>
  );
};

export default Loading;
