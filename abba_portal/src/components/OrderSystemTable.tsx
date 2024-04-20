import { IonButton, IonCol, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonMenu, IonNote, IonRow, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { caretDownCircleOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useRef, useState } from "react";

// import { useTable, useFilters, useSortBy } from "react-table";
import { columns, page, Order } from "../service/OrderTableData";

import {matchSorter} from 'match-sorter'

import './Table.scss'
import OrderSystemTableModal from "./OrderSystemTableModal";
import Pagination from "./Pagination";
import "../components/OrderSystem.scss"

import { PlaceOrderType, getPlaceOrderFormDefaultValues } from "../service/FormBuilder";
import OrderSystemOrderModal from "./OrderSystemOrderModal";
import { cbEditOrderByAdmin, cbFetchOrderSystemOrderData } from "../service/api";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";
import { momentUnix } from "../service/moment";



function findVal(targetKey:string,obj:Order | any){
  for(let key in obj){
   	if(key===targetKey){
      
      return obj[key]
    } 
  }
}  
  const OrderSystemTable: React.FC = () => {
    const searchInput = useRef(null)
    const getLanguage = useRecoilValue(languageState);
    const [initTData, setInitTData] = useState<Order[]>([])    
    const [tData,setTData] = useState<Order[]>([])
    const [tColumns,setTColumns] = useState(columns)
    const [isOpen,setIsOpen] = useState(false)
    const [modalTitle,setModalTitle] = useState("")
    const [orderId,setOrderId] = useState(0)
    const [orderStatus,setOrderStatus] = useState("")
    
    const [modalKey,setModalKey] = useState("")
    const [pageObj,setPageObj] = useState(page)
    const [isOpenModal,setIsOpenModal] = useState(false)
    
    const [placeOrder,setPlaceOrder] = useState<PlaceOrderType>(getPlaceOrderFormDefaultValues())
    
      
    
  const tBody = React.useMemo(() => tData, [tData]);
  const tHeader = React.useMemo(() => tColumns.map((obj,idx:number)=>Object.assign(obj,{header:getLanguage.language.aos.tableHeader[idx]})), [tColumns,getLanguage.language]);

  const cbFetchAllOrders = useCallback(async ()=>{
    let results = await cbFetchOrderSystemOrderData()
    
    results = results.map((obj:Order)=>Object.assign(obj,{pickupDateTimeUnix:momentUnix(obj.pickupDateTime)}))
    console.log(results)
    setInitTData(results)
    setTData(results)
    setPageObj({
      numOfRow: results.length,
      curPage: 1,
      numOfPage: Math.ceil(results.length / 10),
      rowPerPage: 10
    })
  },[]) 

  useEffect(()=>{
    cbFetchAllOrders()
  },[])      

  let cbPagination = useCallback((cur:number)=>{
    setPageObj(pageObj=>{
      let newPageObj = {...pageObj}
      newPageObj.curPage = cur
      console.log(newPageObj)
      return newPageObj
    })
  },[])
    
    
  
  let resetData = () => {
    
    cbFetchAllOrders()
    
  }
  let clear = (dom:any)=>{
    dom.current.value = ""
  }
  let keyupSearch = (e:any,dom:any,data:Order[]) => {
    
    if(e.key === 'Enter' || e.keyCode === 13){
      search(dom,data)
    }
  }
  
  let search = (dom:any,data:Order[]) => {
    let cri:string = dom.current.value
      setTData(()=>{
      
        let newTData = [...data]
        newTData = matchSorter(newTData, cri, {keys: ['orderId','poundWash','dryCleaning','washShoes','leatherWashBag','pickupDateTime','area_value','district_value','station_value','address','remarks']})
        console.log(newTData)
        setPageObj(pageObj=>{
          let newPageObj = {...pageObj}
          newPageObj = {
            numOfRow:newTData.length,
            curPage:1,
            numOfPage:Math.ceil(newTData.length/10),
            rowPerPage:10
          }
          return newPageObj
        })
        return newTData
      })
    
    
  }
  
  let cbSetIsOpenAddForm = useCallback((boo:boolean)=>{
    setIsOpenModal(boo)
  },[])
  let cbFilter = useCallback((criArr:string[]|number[],accessor:string,data:Order[])=>{
    
    setTData(()=>{
      
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
          numOfPage:Math.ceil(newTData.length/10),
          rowPerPage:10
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
      newTData.sort((a:any, b:any) => {
        console.log(a[`${accessor}`])
        // return a
        return a[`${accessor}`].toString().localeCompare(b[`${accessor}`].toString())
      });
      
      
      
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
      newTData.sort((a:any, b:any) => {
        console.log(b[`${accessor}`],accessor)
        // return a
        return b[`${accessor}`].toString().localeCompare(a[`${accessor}`].toString())
      });

      
      
      return newTData
    })
    setTColumns(tColumns=>{
      let newColumns = [...tColumns]
      newColumns = newColumns.filter(obj=>obj.accessor===accessor?Object.assign(obj,{sort:sort}):obj)
      return newColumns
    })
  }

let openEditOrderForm = (oid:number,index:number) => {
  
  setOrderId(oid)
  let orderStatus = tData[index].orderStatus
  setOrderStatus(orderStatus)
  
  setIsOpenModal(true);

  setModalTitle(getLanguage.language.aos.modalHeaderEdit)
  
  setPlaceOrder(placeOrder=>{
    let newPlaceOrder = {...placeOrder}
    // console.log(newPlaceOrder,tData,index)
    newPlaceOrder = Object.assign(newPlaceOrder,tData[index])
    // console.log(newPlaceOrder)
    return newPlaceOrder
  })

  
  
}
let cbEditData = useCallback((data:PlaceOrderType|any)=>{
  // admin edit order status 1
  console.log('order system table',data,orderId)
  
  setTData(tData=>{
    let newTData = [...tData]
    // console.log('order system table tData',newTData)
    newTData = newTData.map(obj=>obj.orderId === data.orderId 
    ? 
    Object.assign(obj,{
      fullAddress:data.fullAddress,
      deliveryDateTime:data.deliveryDateTime,
      deliveryDateTimeUnix:momentUnix(data.deliveryDateTime),
      pickupDateTime:data.pickupDateTime,
      pickupDateTimeUnix:momentUnix(data.pickupDateTime),
      remarks:data.remarks,
      pc:data.pc,
      
    })
    :
    obj
    )
    return newTData
  })
  cbEditOrderByAdmin(data);
  setIsOpenModal(false);
},[])    
let cbAddData = useCallback((data:any)=>{
  // admin open order status 2
  console.log('order system table',data)
  setTData(tData=>{
    let newTData = [...tData]

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
        <IonButton onClick={resetData}>{getLanguage.language.aos.resetBtn}</IonButton>
      </IonCol>
      <IonCol size="auto">
        <IonButton onClick={()=>{
          setIsOpenModal(true);
          setModalTitle(getLanguage.language.aos.modalHeaderAdd)
        }}>{getLanguage.language.aos.addBtn}</IonButton>
      </IonCol>
    </IonRow>
    <table>
    
      <thead>
        <tr>
          {/* <th>
            Row
          </th> */}
          {tHeader.map((column, index) =>
          column.key !== "pickupDateTimeUnix" && column.key !== "deliveryDateTimeUnix" && 
          <th style={{textAlign:"center"}} key={index}>
            {column.header}
            <div style={{display:"flex",justifyContent:"center"}}>
            <IonImg id="upIcon" src={"assets/icon/icons8-up-30.png"} onClick={()=>handleSortAToZ(column.accessor,'ASC')}></IonImg>
            <IonImg id="downIcon" src={"assets/icon/icons8-down-30.png"} onClick={()=>handleSortZToA(column.accessor,'DESC')}></IonImg>
            {column.canFilter && <IonImg id="sortIcon" onClick={()=>{
              setModalTitle(column.header)
              setModalKey(column.key)
              setIsOpen(true)}
              } src={"assets/icon/icons8-sort-48.png"} />
            }
            </div>
            
            {/* <IonIcon onClick={()=>handleSortAToZ(column.accessor,'ASC')} aria-hidden="true" icon={caretDownCircleOutline} />
            <IonIcon onClick={()=>handleSortZToA(column.accessor,'DESC')} aria-hidden="true" icon={caretUpCircleOutline} /> */}
            {/* {column.canFilter && <IonIcon onClick={()=>{
              setModalTitle(column.header)
              setModalKey(column.key)
              setIsOpen(true)}
              } aria-hidden="true" icon={filterCircleOutline} />
            } */}
          </th>
          )}
        </tr>
      </thead>
      <tbody>
      {tBody.map((obj:Order,id:number) => {
        
        if(pageObj.curPage === 1 && id < pageObj.curPage * pageObj.rowPerPage){
          return <tr key={id}>
            {tHeader.map((column, index) => 
            <>
              {column.key !== "pickupDateTimeUnix" && column.key !== "deliveryDateTimeUnix" ? index === 0
              ? 
              <td key={id+index}>{findVal("orderId",obj)} <IonIcon onClick={()=>openEditOrderForm(obj.orderId,id)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={id+index}>{findVal(column.key,obj)}</td>
              :
              null  
              }
              
            </>
            )}
            
        </tr>      
        }
        else if(pageObj.curPage === pageObj.numOfPage && id >= (pageObj.curPage * pageObj.rowPerPage) - pageObj.rowPerPage){
          return <tr key={id}>
            {tHeader.map((column, index) => 
            <>
              {column.key !== "pickupDateTimeUnix" ? index === 0
              ? 
              <td key={id+index}>{findVal("orderId",obj)} <IonIcon onClick={()=>openEditOrderForm(obj.orderId,id)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={id+index}>{findVal(column.key,obj)}</td>
              :
              null  
              }
              
            </>
            )}
        </tr>      
        }else if(id >= (pageObj.curPage * pageObj.rowPerPage) - pageObj.rowPerPage && id < pageObj.curPage * pageObj.rowPerPage ){
          return <tr key={id}>
            {tHeader.map((column, index) => 
            <>
              {column.key !== "pickupDateTimeUnix" ? index === 0
              ? 
              <td key={id+index}>{findVal("orderId",obj)} <IonIcon onClick={()=>openEditOrderForm(obj.orderId,id)} aria-hidden="true" icon={caretDownCircleOutline} /></td>
              :
              <td key={id+index}>{findVal(column.key,obj)}</td>
              :
              null  
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
        <IonNote>{pageObj.numOfRow}{getLanguage.language.aos.pagination1}{getLanguage.language.aos.pagination2}{pageObj.numOfPage}{getLanguage.language.aos.pagination3}</IonNote>
        </div>
      </IonCol>
    </IonRow>
      
    
    
    
    <OrderSystemTableModal isOpen={isOpen} cbSetIsOpen={cbSetIsOpen} title={modalTitle} cbFilter={cbFilter} accessor={modalKey} initTData={[...initTData]}/>
    <OrderSystemOrderModal isOpen={isOpenModal} cbSetIsOpen={cbSetIsOpenAddForm} title={modalTitle} cbSubmitForm={modalTitle === "Add New Order" || modalTitle === "新增訂單" ? cbAddData : cbEditData} placeOrder={placeOrder} orderId={orderId} orderStatus={orderStatus} />
    
  </>



    );
  };
  
  export default React.memo(OrderSystemTable);

