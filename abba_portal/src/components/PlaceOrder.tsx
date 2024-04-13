
import React, {useCallback, useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";


import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonNote, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import {  getPlaceOrderFormYupResolver, PlaceOrderFormState, PlaceOrderType } from "../service/FormBuilder";

import "./BasicForm.scss";


// import {  serviceList, ServiceType } from "../service/DropDownList";
import { formatter } from "../service/moment";


import { getValue } from "../service/LocalStorage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageState } from "../service/Recoil";
type DisChild = {
  key:string,
  station:string
}
type AreaChild = {
  key:string,
  district:string,
  district_child:DisChild[]
}
type AddressList = {
  key:string,
  area:string,
  area_child:AreaChild[]
}
type ServiceType = {
  key:string,
  isSelected:boolean,  
  pc:number
}



const PlaceOrder: React.FC<{status:number,cbSubmitForm:(placeOrder:PlaceOrderFormState)=>void,placeOrder:PlaceOrderType,orderId:number,orderStatus:string}> = ({status,cbSubmitForm,placeOrder,orderId,orderStatus}) => {
  
  const [formValue,setFormValue] = useState({
    poundWash:placeOrder.poundWash,
    dryCleaning:placeOrder.dryCleaning,
    washShoes:placeOrder.washShoes,
    leatherWashBag:placeOrder.leatherWashBag,
    totalPic:placeOrder.poundWash+placeOrder.dryCleaning+placeOrder.washShoes+placeOrder.leatherWashBag,
    pickupDateTime:placeOrder.pickupDateTime,
    area:placeOrder.area,
    district:placeOrder.district,
    station:placeOrder.station,
    address:placeOrder.address,
    remarks:placeOrder.remarks
    })
    const [totalService, setTotalService] = useState<ServiceType[]>(
      [
        {key: 'p', pc: formValue.poundWash,isSelected:formValue.poundWash > 0 ? true : false},
        {key: 'd', pc: formValue.dryCleaning,isSelected:formValue.dryCleaning > 0 ? true : false},
        {key: 'w', pc: formValue.washShoes,isSelected:formValue.washShoes > 0 ? true : false},
        {key: 'l', pc: formValue.leatherWashBag,isSelected:formValue.leatherWashBag > 0 ? true : false}
      ])  
  
  const [areaChildList,setAreaChildList] = useState<AreaChild[]>([])
  const [disChildList,setDisChildList] = useState<DisChild[]>([])
  const [isOpen,setIsOpen] = useState(false)
  
  const getLanguage = useRecoilValue(languageState);
  
  
  let cbFetchUserPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/getUserPickUpAddress`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      setAreaChildList(areaChildList => {
        let newArr = [...areaChildList]
        newArr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===json.data.area).area_child
        setDisChildList(newArr.find((obj:AreaChild)=>obj.key===json.data.district)!.district_child)
        return newArr
      })
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.area = json.data.area
        newFormValue.district = json.data.district
        newFormValue.station = json.data.station
        newFormValue.address = json.data.address
        return newFormValue
      })
      
    }
  },[])
  let cbFetchOrderItems = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getOrderItems/${orderId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    let json = await res.json()
    console.log(json)
    if(!json.isErr){
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.poundWash = json.data.poundWash
        newFormValue.dryCleaning = json.data.dryCleaning
        newFormValue.washShoes = json.data.washShoes
        newFormValue.leatherWashBag = json.data.leatherWashBag
        return newFormValue
      })
      setTotalService([
        {key: 'p', pc: json.data.poundWash,isSelected:json.data.poundWash>0?true:false},
        {key: 'd', pc: json.data.dryCleaning,isSelected:json.data.dryCleaning>0?true:false},
        {key: 'w', pc: json.data.washShoes,isSelected:json.data.washShoes>0?true:false},
        {key: 'l', pc: json.data.leatherWashBag,isSelected:json.data.leatherWashBag>0?true:false}
      ])
    }
  },[])
  let cbFetchOrderPickUpAddress = useCallback(async ()=>{
    let token = await getValue("token")
    let res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/getOrderPickUpAddress/${orderId}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
    })
    let json = await res.json()
    console.log(json)
    
    
    if(!json.isErr){
      setAreaChildList(areaChildList => {
        let newArr = [...areaChildList]
        newArr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===json.data.area).area_child
        setDisChildList(newArr.find((obj:AreaChild)=>obj.key===json.data.district)!.district_child)
        return newArr
      })
      setFormValue(formValue=>{
        let newFormValue = {...formValue}
        newFormValue.area = json.data.area
        newFormValue.district = json.data.district
        newFormValue.station = json.data.station
        newFormValue.address = json.data.address
        return newFormValue
      })
      
    }
  },[])
  useEffect(()=>{
    
    if(status === 0){
      // customer open order 
      cbFetchUserPickUpAddress()
    }else if(status === 1){
      // admin edit order
      cbFetchOrderItems()
      cbFetchOrderPickUpAddress()
      
    }else if(status === 2){
      // admin open order
      
    }
  },[])
  
  const { register, handleSubmit, formState: { errors } } = useForm<PlaceOrderFormState>({
    resolver: getPlaceOrderFormYupResolver(),
    defaultValues: formValue,
    values:formValue
  });
  



  const onSubmit = async (data: PlaceOrderFormState) => {
    
    console.log(data)
    console.log(getLanguage.language.cls.userAddress.addressList)
    
    let area_child_arr = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area_child
    console.log(area_child_arr)
    let dis_child_arr = area_child_arr.find((obj:AreaChild)=>obj.key===data.district).district_child
    
    data.area = getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===data.area).area + "@" + data.area
    data.district = area_child_arr.find((obj:AreaChild)=>obj.key===data.district).district + "@" + data.district 
    data.station = dis_child_arr.find((obj:DisChild)=>obj.key===data.station).station + "@" + data.station 
    console.log(data)
    // {
    //   address:"add",
    //   area:"港島@1",
    //   district:""中西區@1-1"",
    //   dryCleaning:2,
    //   leatherWashBag:4,
    //   pickupDateTime:"Tuesday, October 3rd 2023, 10:15:00 pm",
    //   poundWash:1,
    //   remarks:"rem",
    //   station:"堅尼地城@1-1-1",
    //   totalPic:10,
    //   washShoes:3
    // }
    if(status===1){
      // admin edit order
      data = Object.assign(data,{orderId:orderId,orderStatus:orderStatus})
      console.log(data)
    }
    cbSubmitForm(data)
    
    
  };

  
  
  
  // async function handleOpenServiceSelect(){
  //   let serviceSelect = document.querySelector("#serviceSelect") as HTMLIonSelectElement
  //   serviceSelect.click()
  // }
  async function handleServiceInput(value:number,idx:number){
    if(value > 20){
      setTotalService(totalService=>{
        let newTodo = [...totalService]
        newTodo[`${idx}`].pc = 20
        return newTodo
      })
    }else{
      setTotalService(totalService=>{
        let newTodo = [...totalService]
        newTodo[`${idx}`].pc = Number (value)
        
        return newTodo
      })
    }
    
  }
  useMemo(()=>{
    let sum = totalService.map(obj=>obj.pc).reduce((accumulator, currentValue) => accumulator + currentValue,0);
    
    setFormValue(formValue=>{
      let newFormValue = {...formValue}
      totalService.forEach(obj=>{
        if(obj.pc > 0 && obj.key==="p"){
           newFormValue.poundWash = obj.pc 
        }else if(obj.pc > 0 && obj.key==="d"){
          newFormValue.dryCleaning = obj.pc 
        }else if(obj.pc > 0 && obj.key==="w"){
          newFormValue.washShoes = obj.pc 
        }else if(obj.pc > 0 && obj.key==="l"){
          newFormValue.leatherWashBag = obj.pc 
        }
      })
      newFormValue.totalPic = sum
      return newFormValue
    })
  },[totalService])

  

  return (
    
    <form style={{paddingBottom:"20px",padding:"20px",marginTop:"20px",background:"#FFF",borderRadius:"30px"}} onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formTitle}</h1>
      <h4 style={{textAlign:"center",color:"#FFC13B"}}>{getLanguage.language.cls.formSubTitle}</h4>
      
        

      
      <IonItem>
          <IonLabel>{getLanguage.language.cls.serviceList[0].name}</IonLabel>
          <IonInput {...register("poundWash")} className="number" type="number" onInput={(e:any)=>handleServiceInput(e.target.value,0)} min="0" max="20" placeholder="0"></IonInput>
      </IonItem>
      {/* } */}
      {/* {totalService[1].isSelected &&  */}
      <IonItem>
        <IonLabel>{getLanguage.language.cls.serviceList[1].name}</IonLabel>
        <IonInput {...register("dryCleaning")} className="number" type="number" onInput={(e:any)=>handleServiceInput(e.target.value,1)} min="0" max="20" placeholder="0"></IonInput>
      </IonItem>
      {/* } */}
      {/* {totalService[2].isSelected &&  */}
      <IonItem>
        <IonLabel>{getLanguage.language.cls.serviceList[2].name}</IonLabel>
        <IonInput {...register("washShoes")} className="number" type="number" onInput={(e:any)=>handleServiceInput(e.target.value,2)} min="0" max="20" placeholder="0"></IonInput>
      </IonItem>
      {/* } */}
      {/* {totalService[3].isSelected &&  */}
      <IonItem>
        <IonLabel>{getLanguage.language.cls.serviceList[3].name}</IonLabel>
        <IonInput {...register("leatherWashBag")} className="number" type="number" onInput={(e:any)=>handleServiceInput(e.target.value,3)} min="0" max="20" placeholder="0"></IonInput>
      </IonItem>  
      {/* } */}
      
      {totalService.filter(obj=>obj.pc>0).length>0&&
        <IonItem>
          <IonLabel>{getLanguage.language.cls.itemTotal}</IonLabel>
          <IonInput {...register("totalPic")} className="number" type="number" placeholder="0px" disabled></IonInput>        
        </IonItem>  
      }
      
      <IonNote>{errors.totalPic?.message}</IonNote>
      

      <IonItem lines="none">
      <h3 style={{color:"#1E3D59"}}>{getLanguage.language.cls.pickUpDateTimeItem}</h3>
      
      </IonItem>

      <IonButton onClick={()=>setIsOpen(true)} className="customButton">{getLanguage.language.cls.pickUpDateTimeButton}</IonButton>
      <IonItem className="customItem" lines="none">
      
        <IonInput {...register("pickupDateTime")} className="text" disabled>

      </IonInput>              
        
      </IonItem>
      <IonNote>{errors.pickupDateTime?.message}</IonNote>
      {/* <IonDatetimeButton datetime="datetime"></IonDatetimeButton>   */}
      
      <IonModal isOpen={isOpen}>
      <IonHeader>
            <IonToolbar>
              <IonTitle>{getLanguage.language.cls.pickUpDateTimeModal.title}</IonTitle>
              <IonButtons slot="end">
                <IonButton className="customButton" onClick={() => setIsOpen(false)}>{getLanguage.language.cls.pickUpDateTimeModal.btn}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <IonDatetime min={new Date().toISOString()} id="datetime" presentation="date-time" preferWheel={true} onIonChange={(e)=>{
          
          setFormValue(formValue=>{
            let newFormValue = {...formValue}
            
            newFormValue.pickupDateTime = formatter(new Date(e.target.value as string).toISOString())
            
            return newFormValue
          })
          }}></IonDatetime>
          </IonContent>
        
      </IonModal>  
      
      

      
      <div style={{border:"1px solid",marginTop:"20px",marginBottom:"20px",borderRadius:"20px",padding:"8px"}}>
        <h2 style={{textAlign:"center",color:"#C6905D"}}>{getLanguage.language.cls.userAddress.title}</h2>  
        <IonItem>
          <IonLabel>{getLanguage.language.cls.userAddress.area}</IonLabel>
          <IonSelect {...register("area")} onIonChange={(e)=>{
            console.log(e.target.value)
            // setSelectedArea(e.target.value)
            setAreaChildList(getLanguage.language.cls.userAddress.addressList.find((obj:AddressList)=>obj.key===e.target.value).area_child)
            setDisChildList([])
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.area = e.target.value
              
              return newFormValue
            })
          }}>
          {getLanguage.language.cls.userAddress.addressList.map((item:AddressList,idx:number) => 
            <IonSelectOption key={idx} value={item.key}>{item.area}</IonSelectOption>
          )}  
          </IonSelect>
        </IonItem>
        <IonNote>{errors.area?.message}</IonNote>
  
        
        {areaChildList.length > 0 && 
        <>
        <IonItem>
        <IonLabel>{getLanguage.language.cls.userAddress.district}</IonLabel>
          <IonSelect {...register("district")} onIonChange={(e)=>{
            setDisChildList(areaChildList.find((obj:AreaChild)=>obj.key===e.target.value)!.district_child)            
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.district = e.target.value
              
              return newFormValue
            })
          }}>
          {areaChildList.map((item:AreaChild,idx:number)=>
            <IonSelectOption key={idx} value={item.key}>{item.district}</IonSelectOption>
          )}
        
          </IonSelect>
        </IonItem>  
        <IonNote>{errors.district?.message}</IonNote>
        

        
        </>
        
        }
        
        {disChildList.length > 0 && 
        <>
        <IonItem>
        <IonLabel>{getLanguage.language.cls.userAddress.station}</IonLabel>
          <IonSelect {...register("station")} onIonChange={(e)=>{
            
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.station = e.target.value
              
              return newFormValue
            })
          }}>
          {
            disChildList.map((item:DisChild,idx:number)=>
            <IonSelectOption key={idx} value={item.key}>{item.station}</IonSelectOption>
            )
          }
        
          </IonSelect>
        </IonItem>
        
        <IonNote>{errors.station?.message}</IonNote>
        

        </>
        }
        
        
        <IonItem fill="outline">
          <IonLabel position="floating">{getLanguage.language.cls.userAddress.address}</IonLabel>
          <IonInput className="text" clearInput={true} {...register("address")} aria-label="Address" placeholder={getLanguage.language.cls.userAddress.address} onIonBlur={(e)=>{
          
         
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
            
              newFormValue.address = e.target.value as string
            
              return newFormValue
            })
          }}>
          </IonInput>
        </IonItem>
        
        <IonNote>{errors.address?.message}</IonNote>   
        </div>
      
      
      
      
      <IonItem className="customItemTextArea" fill="outline">
        <IonLabel position="stacked">{getLanguage.language.cls.userAddress.remark}</IonLabel>
        <IonTextarea {...register("remarks")} onIonBlur={(e)=>{
            setFormValue(formValue=>{
              let newFormValue = {...formValue}
              
              newFormValue.remarks = e.target.value as string
              
              return newFormValue
            })
        }} spellCheck={true}></IonTextarea>   
        {/* <IonInput clearInput={true} aria-label="備註"></IonInput> */}
      </IonItem>
      <IonNote>{errors.remarks?.message}</IonNote>
      

      
      
      
      <div style={{display:"flex",justifyContent:"center"}}>
      <IonButton className="formBtn" shape="round" type="submit">{getLanguage.language.cls.userAddress.btn}</IonButton>
      </div>
      
    </form>
    
  );
}  
export default PlaceOrder;
