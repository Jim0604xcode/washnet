import {
  ColorSchemeName,
  Text,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import Collapsible from "react-native-collapsible";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerModal } from 'react-native-paper-dates';
import { zhTW, registerTranslation } from 'react-native-paper-dates'
registerTranslation('zh-TW', zhTW)

type OrderType = "pw"|"dc"|"ws"|"lw"|"cs"|"fw"
type Order = {
  orderType:OrderType
  pc:number
  pickupDateTime:string
  deliveryDateTime:string
  tel:string
  building:string
  street:string
  district:string
  fullAddress:string
  remarks:string
}


type OrderFormProps = {
  colorScheme: ColorSchemeName;
};

const OrderForm: React.FC<OrderFormProps> = ({ colorScheme }) => {
  const [formValue,setFormValue] = useState<Order>({
    orderType:"pw",
    pc:0,
    pickupDateTime:"",
    deliveryDateTime:"",
    tel:"",
    building:"",
    street:"",
    district:"",
    fullAddress:"",
    remarks:""
  })
const { register,control, handleSubmit} = useForm({
  defaultValues: formValue,
  values:formValue
});

// const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormState>({
//   resolver: getRegisterFormYupResolver(),
//   defaultValues: formValue,
//   values:formValue
// });


  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);

  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupOpen, setPickupOpen] = React.useState(false);
  const onDismissPickup = React.useCallback(() => {
    setPickupOpen(false);
  }, [setPickupOpen]);


  const onConfirmPickup = React.useCallback(
    (params: { date: any }) => {
        setPickupOpen(false);
        setPickupDate(params.date);
        setIsCollapsed2(true);
        setFormValue(formValue=>{
          let newFormValue = {...formValue}
          newFormValue.pickupDateTime = params.date
          
          return newFormValue
        })

        console.log(params.date);
    },
    [setPickupOpen, setPickupDate]
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [deliveryOpen, setDeliveryOpen] = React.useState(false);
  
  const onDismissDelivery = React.useCallback(() => {
    setDeliveryOpen(false);
  }, [setDeliveryOpen]);

  const onConfirmDelivery = React.useCallback(
    (params: { date: any }) => {
        setDeliveryOpen(false);
        setDeliveryDate(params.date);
        setIsCollapsed3(true);
        console.log(params.date);
        setFormValue(formValue=>{
          let newFormValue = {...formValue}
          newFormValue.deliveryDateTime = params.date
          
          return newFormValue
        })
    },
    [setDeliveryOpen, setDeliveryDate]
  );

    
    
  const onSubmit = async () => {
    setFormValue(formValue=>{
      let newFormValue = {...formValue}
      newFormValue.fullAddress = newFormValue.district + newFormValue.street + newFormValue.building
      return newFormValue
    })
    console.log(formValue)
  }

  return (
    <View style={styles.formBox}>
      <Collapsible
        collapsed={isCollapsed1}
        collapsedHeight={80}
        enablePointerEvents={true}
        style={[
          styles.surface,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
        align="top"
      >
        <Pressable onPress={() => setIsCollapsed1(!isCollapsed1)}>
          {({ pressed }) => (
            <View style={styles.btnTitle}>
              <FontAwesome
                name="map-pin"
                size={28}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={[styles.btnText, { 
                color: Colors[colorScheme ?? "light"].text,
                opacity: pressed ? 0.5 : 1 }]}>
                第一步：輸入地址
              </Text>
              <FontAwesome
                name={isCollapsed1 ? "chevron-down" : "chevron-up"}
                size={16}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </View>
          )}
        </Pressable>
        <View>
            <TextInput
              mode="outlined"
              label="大廈"
              placeholder="大廈名稱"
              {...register("building")}  
              onChangeText={(v:string)=>{
                setFormValue(formValue=>{
                  let newFormValue = {...formValue}
                  newFormValue.building = v
                  
                  return newFormValue
                })
              }}
              style={[
                styles.input,
                {
                  backgroundColor:
                    Colors[colorScheme ?? "light"].surfaceContainer,
                  borderColor: Colors[colorScheme ?? "light"].outline,
                },
              ]}
              activeOutlineColor={Colors[colorScheme ?? "light"].tint}
            />
        </View>
        <View>
            <TextInput
              mode="outlined"
              label="街道"
              placeholder="街道名稱"
              {...register("street")}
              onChangeText={(v:string)=>{
                setFormValue(formValue=>{
                  let newFormValue = {...formValue}
                  newFormValue.street = v
                  
                  return newFormValue
                })
              }}
              style={[
                styles.input,
                {
                  backgroundColor:
                    Colors[colorScheme ?? "light"].surfaceContainer,
                  borderColor: Colors[colorScheme ?? "light"].outline,
                },
              ]}
              activeOutlineColor={Colors[colorScheme ?? "light"].tint}
            />
        </View>
        <View>
            <TextInput
              mode="outlined"
              label="地區"
              placeholder="地區名稱"
              {...register("district")}
              onChangeText={(v:string)=>{
                setFormValue(formValue=>{
                  let newFormValue = {...formValue}
                  newFormValue.district = v
                  
                  return newFormValue
                })
              }}
              style={[
                styles.input,
                {
                  backgroundColor:
                    Colors[colorScheme ?? "light"].surfaceContainer,
                  borderColor: Colors[colorScheme ?? "light"].outline,
                },
              ]}
              activeOutlineColor={Colors[colorScheme ?? "light"].tint}
            />
        </View>
      </Collapsible>

      <Collapsible
        collapsed={isCollapsed2}
        collapsedHeight={pickupDate === undefined ? 80 : 120 }
        enablePointerEvents={true}
        style={[
          styles.surface,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
        align="top"
      >
        <Pressable onPress={() => {
            setIsCollapsed2(!isCollapsed2);
            setPickupOpen(true);
        }
            
        }>
          {({ pressed }) => (
            <View style={styles.btnTitle}>
              <FontAwesome
                name="clock-o"
                size={28}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={[styles.btnText, { 
                color: Colors[colorScheme ?? "light"].text,
                opacity: pressed ? 0.5 : 1 }]}>
                第二步：上門收衫時間
              </Text>
              <FontAwesome
                name={isCollapsed2 ? "chevron-down" : "chevron-up"}
                size={16}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </View>
          )}
        </Pressable>
        {pickupDate !== undefined ?
            <Text style={styles.dateTime}>
                {pickupDate.toLocaleDateString('zh-TW')}
            </Text>
        : null }
        
            <SafeAreaProvider>
                <View {...register("pickupDateTime")} style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <DatePickerModal
                        locale="zh-TW"
                        mode="single"
                        visible={pickupOpen}
                        
                        onDismiss={onDismissPickup}
                        date={pickupDate}
                        onConfirm={onConfirmPickup}
                        presentationStyle="pageSheet"
                    />
                </View>
          </SafeAreaProvider>
        

      </Collapsible>
      <Collapsible
        collapsed={isCollapsed3}
        collapsedHeight={deliveryDate === undefined ? 80 : 120 }
        enablePointerEvents={true}
        style={[
          styles.surface,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
        align="top"
      >
        <Pressable onPress={() => {
            setIsCollapsed3(!isCollapsed3)
            setDeliveryOpen(true);
        }}>
          {({ pressed }) => (
            <View style={styles.btnTitle}>
              <FontAwesome
                name="truck"
                size={28}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={[styles.btnText, { 
                color: Colors[colorScheme ?? "light"].text,
                opacity: pressed ? 0.5 : 1 }]}>
                第三步：送回衣服時間
              </Text>
              <FontAwesome
                name={isCollapsed3 ? "chevron-down" : "chevron-up"}
                size={16}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </View>
          )}
        </Pressable>
        {deliveryDate !== undefined ?
            <Text style={styles.dateTime}>
                {deliveryDate.toLocaleDateString('zh-TW')}
            </Text>
        : null }
            <SafeAreaProvider>
            <View {...register("deliveryDateTime")} style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                <DatePickerModal
                    locale="zh-TW"
                    mode="single"
                    visible={deliveryOpen}
                    onDismiss={onDismissDelivery}
                    date={deliveryDate}
                    onConfirm={onConfirmDelivery}
                    presentationStyle="pageSheet"
                />
                </View>
        </SafeAreaProvider>
        
        
      </Collapsible>
      <Button
        icon="send"
        mode="contained"
        buttonColor={Colors[colorScheme ?? "light"].text}
        labelStyle={{
          color: Colors[colorScheme ?? "light"].background,
          fontSize: 16,
        }}
        onPress={onSubmit}
      >
        確認訂單
      </Button>
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  formBox: {
    paddingHorizontal: 20,
    gap: 10,
    paddingTop: 20,
    marginBottom: 100,
  },
  surface: {
    padding: 20,
    height: 320,
    width: 350,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  btnTitle: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
  },
  collapseBtn: {
    width: "100%",
  },
  dateTime: {
    fontSize: 16,
  }
});
