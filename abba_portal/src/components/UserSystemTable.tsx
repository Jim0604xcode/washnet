import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonNote, IonRow, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { caretUpCircleOutline,caretDownCircleOutline,filterCircleOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";


import { columns, page, User } from "../service/UserTableData";

import {matchSorter} from 'match-sorter'

import './Table.scss'

import Pagination from "./Pagination";
import UserSystemTableModal from "./UserSystemTableModal";
import UserSystemUserModal from "./UserSystemUserModal";
import { cbFetchUserSystemUserData } from "../service/api";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";






function findVal(targetKey:string,obj:User | any){
  for(let key in obj){
   	if(key===targetKey){
      
      return obj[key]
    } 
  }
}  
  const UserSystemTable: React.FC = () => {
    const searchInput = useRef(null)
  
    const getLanguage = useRecoilValue(languageState);
    const [initTData, setInitTData] = useState<User[]>([])    
    const [tData,setTData] = useState<User[]>([])
    const [tColumns,setTColumns] = useState(columns)
    const [isOpen,setIsOpen] = useState(false)
    const [modalTitle,setModalTitle] = useState("")
    const [userId,setUserId] = useState("")
    const [modalKey,setModalKey] = useState("")
    const [pageObj,setPageObj] = useState(page)
    const [isOpenModal,setIsOpenModal] = useState(false)
    
    
    const [userData,setUserData] = useState<User|null>(null)
    
  const tBody = React.useMemo(() => tData, [tData]);
  const tHeader = React.useMemo(() => tColumns.map((obj,idx:number)=>Object.assign(obj,{header:getLanguage.language.ass.tableHeader[idx]})), [tColumns,getLanguage.language]);

  const cbFetchAllUsers = useCallback(async ()=>{
    let results = await cbFetchUserSystemUserData()
    console.log(results)
    setInitTData(results)
    setTData(results)
    setPageObj(pageObj=>{
      let newPageObj = {...pageObj}
      newPageObj = {
        numOfRow:results.length,
        curPage:1,
        numOfPage:Math.ceil(results.length/newPageObj.rowPerPage),
        rowPerPage:newPageObj.rowPerPage
      }
      return newPageObj
    })
  },[]) 

  useEffect(()=>{
    cbFetchAllUsers()
  },[])      

  let cbPagination = useCallback((cur:number)=>{
    setPageObj(pageObj=>{
      let newPageObj = {...pageObj}
      newPageObj.curPage = cur
      console.log(newPageObj)
      return newPageObj
    })
  },[])
    
  let keyupRowPerPage = useCallback((e:any)=>{
    if(e.key === 'Enter' || e.keyCode === 13){
      cbRowPerPage(e.target.value)
    }
  },[])
  let cbRowPerPage = useCallback((cur:string)=>{
    setPageObj(pageObj=>{
      let newPageObj = {...pageObj}
      newPageObj.rowPerPage = parseInt(cur)
      console.log(newPageObj)
      newPageObj.numOfPage = Math.ceil(newPageObj.numOfRow/parseInt(cur))
      
      return newPageObj
    })
  },[]) 
  
  let resetData = () => {
    
    cbFetchAllUsers()
    
  }
  let clear = (dom:any)=>{
    dom.current.value = ""
  }
  let keyupSearch = (e:any,dom:any,data:User[]) => {
    
    if(e.key === 'Enter' || e.keyCode === 13){
      search(dom,data)
    }
  }
  let search = (dom:any,data:User[]) => {
    let cri:string = dom.current.value
    setTData(tData=>{
      
      let newTData = [...data]
      newTData = matchSorter(newTData, cri, {keys: ['userId','displayName','mobile','email','role']})
      console.log(newTData)
      setPageObj(pageObj=>{
        let newPageObj = {...pageObj}
        newPageObj = {
          numOfRow:newTData.length,
          curPage:1,
          numOfPage:Math.ceil(newTData.length/newPageObj.rowPerPage),
          rowPerPage:newPageObj.rowPerPage
        }
        return newPageObj
      })
      return newTData
    })
  }
  
  let cbSetIsOpenRegForm = useCallback((boo:boolean)=>{
    setIsOpenModal(boo)
},[])
  let cbFilter = useCallback((criArr:string[]|number[],accessor:string,data:User[])=>{
    
    setTData(tData=>{
      
      let newTData:any[] = []

      criArr.forEach((v:number|string)=>{
        newTData = newTData.concat(matchSorter([...data], v.toString(), {keys: [accessor]}))  
        
      })
      
      // newTData = matchSorter(newTData, cri, {keys: [accessor]})
      setPageObj(pageObj=>{
        let newPageObj = {...pageObj}
        newPageObj = {
          numOfRow:newTData.length,
          curPage:1,
          numOfPage:Math.ceil(newTData.length/newPageObj.rowPerPage),
          rowPerPage:newPageObj.rowPerPage
        }
        return newPageObj
      })
      return newTData
    })
  },[])    

  let cbSetIsOpen = useCallback((boo:boolean)=>{
    setIsOpen(boo)
  },[])    





  let handleSortAToZ = (accessor:string,sort:string) => {
    
    setTData(tData=>{
      let newTData = [...tData]
      newTData.sort((a:any, b:any) => a[`${accessor}`].toString().localeCompare(b[`${accessor}`].toString()));
      
      
      
      return newTData
    })
    setTColumns(tColumns=>{
      let newColumns = [...tColumns]
      newColumns = newColumns.filter(obj=>obj.accessor===accessor?Object.assign(obj,{sort:sort}):obj)
      
      return newColumns
    })
  }
  let handleSortZToA = (accessor:string,sort:string|null) => {
    setTData(tData=>{
      let newTData = [...tData]
      newTData.sort((a:any, b:any) => b[`${accessor}`].toString().localeCompare(a[`${accessor}`].toString()));

      
      
      return newTData
    })
    setTColumns(tColumns=>{
      let newColumns = [...tColumns]
      newColumns = newColumns.filter(obj=>obj.accessor===accessor?Object.assign(obj,{sort:sort}):obj)
      return newColumns
    })
  }




let openEditUserForm = (userId:string,index:number) => {
  setIsOpenModal(true);
  setModalTitle(getLanguage.language.ass.modalHeaderEdit)
  setUserId(userId)

}
let cbEditUser = useCallback((data:any)=>{
  // admin edit user status 1
  console.log('user system table',data)
  setTData(tData=>{
    let newTData = [...tData]
    newTData = newTData.map(obj=>obj.userId === data.userId ? Object.assign(obj,data): obj)
    return newTData
  })
},[])    
let cbAddUser = useCallback((data:any)=>{
  // admin open user status 2
  console.log('user system table',data)
  setTData(tData=>{
    let newTData = [...tData]
    newTData.push(data)
    return newTData
  })
},[])    

   return (
    <>
    

      
    



    <IonItem fill="outline">
        
        <IonLabel position="floating">{getLanguage.language.aos.search}</IonLabel>
        <IonInput id="searchInput" ref={searchInput} onKeyUp={(e)=>keyupSearch(e,searchInput,initTData)} className="text" aria-label="Search" placeholder="Search"></IonInput>
        <IonImg id="searchIcon" src={"assets/icon/icons8-search-50.png"} onClick={()=>search(searchInput,initTData)}></IonImg>
        <IonImg id="clearIcon" src={"assets/icon/icons8-clear-50.png"} onClick={()=>clear(searchInput)}></IonImg>
    </IonItem>
    <IonRow>
      <IonCol size="auto">
        <IonButton onClick={resetData}>{getLanguage.language.ass.resetBtn}</IonButton>
      </IonCol>
      <IonCol size="auto">
        <IonButton onClick={()=>{
          setIsOpenModal(true);
          setModalTitle(getLanguage.language.ass.modalHeaderAdd)
        }}>{getLanguage.language.ass.addBtn}</IonButton>
      </IonCol>
    </IonRow>  
    <table>
    
      <thead>
        <tr>
          {/* <th>
            Row
          </th> */}
          {tHeader.map((column, index) => 
          <th key={column+String(index)}>
            {column.header}
            <IonIcon onClick={()=>handleSortAToZ(column.accessor,'ASC')} aria-hidden="true" icon={caretDownCircleOutline} />
            <IonIcon onClick={()=>handleSortZToA(column.accessor,'DESC')} aria-hidden="true" icon={caretUpCircleOutline} />
            {column.canFilter && <IonIcon onClick={()=>{
              setModalTitle(getLanguage.language.ass.modalHeaderFilter)
              setModalKey(column.key)
              setIsOpen(true)}
              } aria-hidden="true" icon={filterCircleOutline} />
            }
          </th>
          )}
        </tr>
      </thead>
      <tbody>
      {tBody.map((obj:User,index:number) => {
        if(pageObj.curPage === 1 && index < pageObj.curPage * pageObj.rowPerPage){
          return <tr key={index}>
            {tHeader.map((column, index) => 
            <>
              {index === 0
              ? 
              <td key={column.key+String(index)}>{findVal("userId",obj)} <IonIcon onClick={()=>openEditUserForm(obj.userId,index)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={column.key+String(index)}>{findVal(column.key,obj)}</td>  
              }
              
            </>
            )}
            
        </tr>      
        }else if(pageObj.curPage === pageObj.numOfPage && index >= (pageObj.curPage * pageObj.rowPerPage) - pageObj.rowPerPage){
          return <tr key={index}>
            {tHeader.map((column, index) => 
            <>
              {index === 0
              ? 
              <td key={column.key+String(index)}>{findVal("userId",obj)} <IonIcon onClick={()=>openEditUserForm(obj.userId,index)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={column.key+String(index)}>{findVal(column.key,obj)}</td>  
              }
              
            </>
            )}
        </tr>      
        }else if(index >= (pageObj.curPage * pageObj.rowPerPage) - pageObj.rowPerPage && index < pageObj.curPage * pageObj.rowPerPage ){
          return <tr key={index}>
            {tHeader.map((column, index) => 
            <>
              {index === 0
              ? 
              <td key={column.key+String(index)}>{findVal("userId",obj)} <IonIcon onClick={()=>openEditUserForm(obj.userId,index)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={column.key+String(index)}>{findVal(column.key,obj)}</td>  
              }
              
            </>
            )}
        </tr> 
        }
      }
        

          
        
        
      )}
      
      
        
      </tbody>
    </table>
    <IonRow>

    <IonCol size="9">
    <Pagination cbPagination={cbPagination} numOfPage={pageObj.numOfPage} curPage={pageObj.curPage} />
   
    </IonCol> 
      <IonCol size="3">
      <div style={{textAlign:"end"}}>
        <IonNote>{pageObj.numOfRow}{getLanguage.language.ass.pagination1}{getLanguage.language.ass.pagination2}{pageObj.numOfPage}{getLanguage.language.ass.pagination3}</IonNote>
      </div>
      <IonItem>
        <IonLabel>每頁行數</IonLabel>
        <IonInput onKeyUp={(e)=>keyupRowPerPage(e)} onIonBlur={(e)=>cbRowPerPage(e.target.value as string)} style={{textAlign:"end"}} aria-label="Success input" color="success" value={pageObj.rowPerPage.toString()}></IonInput>
        </IonItem>
      </IonCol>
    </IonRow>
    
    
    
    
    <UserSystemTableModal isOpen={isOpen} cbSetIsOpen={cbSetIsOpen} title={modalTitle} cbFilter={cbFilter} accessor={modalKey} initTData={[...initTData]}/>
    <UserSystemUserModal isOpen={isOpenModal} cbSetIsOpen={cbSetIsOpenRegForm} title={modalTitle} cbSubmitForm={modalTitle === "新增用戶" ? cbAddUser : cbEditUser} userId={userId} />
    
  </>



    );
  };
  
  export default React.memo(UserSystemTable);

