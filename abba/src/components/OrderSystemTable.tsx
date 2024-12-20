import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonNote, IonRow, IonSplitPane, IonTitle, IonToolbar } from "@ionic/react";
import { caretUpCircleOutline,caretDownCircleOutline,filterCircleOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useState } from "react";

// import { useTable, useFilters, useSortBy } from "react-table";
import { columns, page, Order } from "../service/OrderTableData";

import {matchSorter} from 'match-sorter'

import './Table.scss'
import OrderSystemTableModal from "./OrderSystemTableModal";
import Pagination from "./Pagination";


import { PlaceOrderType, getPlaceOrderFormDefaultValues } from "../service/FormBuilder";
import OrderSystemOrderModal from "./OrderSystemOrderModal";
import { cbEditOrderByAdmin, cbFetchOrderSystemOrderData } from "../service/api";
import { useRecoilValue } from "recoil";
import { languageState } from "../service/Recoil";
import { number } from "yup";
import { momentUnix } from "../service/moment";



function findVal(targetKey:string,obj:Order | any){
  for(let key in obj){
   	if(key===targetKey){
      
      return obj[key]
    } 
  }
}  
  const OrderSystemTable: React.FC = () => {
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
    
    // const setPlaceOrder = useSetRecoilState(placeOrderState);
    
    // useTable(
    //   {
    //     data,
    //     columns 
    //   },
    //   useFilters,
    //   useSortBy,
    // );  
    
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
  let search = (cri:string,data:Order[]) => {
    
    setTData(tData=>{
      
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
      address:data.address,
      area:data.area.split('@')[1],
      area_value:data.area.split('@')[0],
      district:data.district.split('@')[1],
      district_value:data.district.split('@')[0],
      dryCleaning:data.dryCleaning,
      leatherWashBag:data.leatherWashBag,
      pickupDateTime:data.pickupDateTime,
      pickupDateTimeUnix:momentUnix(data.pickupDateTime),
      poundWash:data.poundWash,
      remarks:data.remarks,
      station:data.station.split('@')[1],
      station_value:data.station.split('@')[0],
      totalPic:data.totalPic,
      washShoes:data.washShoes
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
        <IonInput onIonBlur={({target})=>search(target.value as string,initTData)} className="text" clearInput={true} aria-label="Search" placeholder="Search"></IonInput>
      </IonItem>
    <table>
    
      <thead>
        <tr>
          {/* <th>
            Row
          </th> */}
          {tHeader.map((column, index) =>
          column.key !== "pickupDateTimeUnix" && 
          <th key={index}>
            {column.header}
            <IonIcon onClick={()=>handleSortAToZ(column.accessor,'ASC')} aria-hidden="true" icon={caretDownCircleOutline} />
            <IonIcon onClick={()=>handleSortZToA(column.accessor,'DESC')} aria-hidden="true" icon={caretUpCircleOutline} />
            {column.canFilter && <IonIcon onClick={()=>{
              setModalTitle(column.header)
              setModalKey(column.key)
              setIsOpen(true)}
              } aria-hidden="true" icon={filterCircleOutline} />
            }
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
      <IonCol size="auto">
        <IonNote>{pageObj.numOfRow}{getLanguage.language.aos.pagination1}{getLanguage.language.aos.pagination2}{pageObj.numOfPage}{getLanguage.language.aos.pagination3}</IonNote>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol size="auto">
        <IonButton className="customButton" onClick={resetData}>{getLanguage.language.aos.resetBtn}</IonButton>
      </IonCol>
      <IonCol size="auto">
        <IonButton className="customButton" onClick={()=>{
          setIsOpenModal(true);
          setModalTitle(getLanguage.language.aos.modalHeaderAdd)
        }}>{getLanguage.language.aos.addBtn}</IonButton>
      </IonCol>
    </IonRow>  
    
    
    <Pagination cbPagination={cbPagination} numOfPage={pageObj.numOfPage} curPage={pageObj.curPage} />
    
    <OrderSystemTableModal isOpen={isOpen} cbSetIsOpen={cbSetIsOpen} title={modalTitle} cbFilter={cbFilter} accessor={modalKey} initTData={[...initTData]}/>
    <OrderSystemOrderModal isOpen={isOpenModal} cbSetIsOpen={cbSetIsOpenAddForm} title={modalTitle} cbSubmitForm={modalTitle === "Add New Order" ? cbAddData : cbEditData} placeOrder={placeOrder} orderId={orderId} orderStatus={orderStatus} />
    
  </>



    );
  };
  
  export default React.memo(OrderSystemTable);

