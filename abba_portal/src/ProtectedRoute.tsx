import React, { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "./service/Recoil";
import { getCurrentUser, getterLanguaue, setterLanguage } from "./service/api";


const ProtectedRoute: 
  React.FC<{cbReadyFunc:(boo:boolean)=>void,cbRoleFunc:(currentRole:string)=>void}> = ({cbReadyFunc,cbRoleFunc}) => {
  
    const getLanguage = useRecoilValue(languageState);
    const setLanguageState = useSetRecoilState(languageState);
    
    let cbGetLanguage = useCallback(async ()=>{
        let data = await getterLanguaue(getLanguage.require)
        
        
        data = await JSON.parse(data)
        console.log(data)
        
        await setterLanguage(setLanguageState,data)
    },[])
    
    let cbGetCurUser = useCallback(async ()=>{
        await getCurrentUser(cbRoleFunc)
    },[])
    
    useEffect(()=>{
      async function main(){
        await cbGetLanguage()
        await cbGetCurUser()
        await cbReadyFunc(true)
      }
      main()
    },[])
    
    return (
      <>

        
        
      </>
    );
  };
  
  export default React.memo(ProtectedRoute);

