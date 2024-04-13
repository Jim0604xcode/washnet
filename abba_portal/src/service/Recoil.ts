import {atom, SetterOrUpdater} from 'recoil';


export const roleState = atom<{role:string|null}>({
  key: 'roleState',
  default: {role:null},
});


export const setterRoleState = (currentRole:string,setRoleState:SetterOrUpdater<{
    role: string | null;
}>) => {
  setRoleState(roleState => {
    let newRoleState = {...roleState}
    newRoleState.role = currentRole
    
    return newRoleState
  });
};




export const isReadyState = atom<{isReady:boolean}>({
  key: 'isReadyState',
  default: {isReady:false},
});

export const setterIsReadyState = (boo:boolean,setIsReadyState:SetterOrUpdater<{
    isReady: boolean;
}>) => {
  setIsReadyState(isReadyState => {
    let newIsReadyState = {...isReadyState}
    newIsReadyState.isReady = boo
    return newIsReadyState
  });
};






export type Language = {
  require:"cn"|"eng",
  language?:any
}

export const languageState = atom<Language>({
  key: 'languageState',
  default: {
    require:"cn",   
  },
});






