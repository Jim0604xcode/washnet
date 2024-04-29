import React, { useCallback, useState } from "react";
import {ColorSchemeName, StyleSheet, View, Pressable, TouchableOpacity} from "react-native";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import Collapsible from "react-native-collapsible";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DatePickerModal } from "react-native-paper-dates";
import { zhTW, registerTranslation } from "react-native-paper-dates";
import { Order } from "@/models";
import { Text } from "@/components/Themed";
import AddressButton from "@/components/orderForm/AddressButton";
import PickupButton from "@/components/orderForm/PickupButton";
registerTranslation("zh-TW", zhTW);

type OrderFormProps = {
  colorScheme: ColorSchemeName;
};

const OrderForm: React.FC<OrderFormProps> = ({ colorScheme }) => {
  const [formValue, setFormValue] = useState<Order>({
    orderType: "pw",
    pc: 0,
    pickupDateTime: "",
    deliveryDateTime: "",
    tel: "",
    building: "",
    street: "",
    district: "",
    fullAddress: "",
    remarks: "",
  });

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formValue,
    values: formValue,
  });

  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);

  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupOpen, setPickupOpen] = useState(false);
  const pickupDatetimeIsFilled: boolean =
  (formValue.pickupDateTime !== "") &&
  (formValue.pickupDateTime !== undefined);

  const onDismissPickup = useCallback(() => {
    setPickupDate(undefined);
    setFormValue((formValue) => {
      const newFormValue = { ...formValue };
      newFormValue.pickupDateTime = ""
      return newFormValue;
    });
    setPickupOpen(false);
  }, [setPickupOpen]);

  const onConfirmPickup = useCallback(
    (params: { date: any }) => {
      setPickupOpen(false);
      setPickupDate(params.date);
      setIsCollapsed2(true);
      setFormValue((formValue) => {
        const newFormValue = { ...formValue };
        newFormValue.pickupDateTime = params.date;
        return newFormValue;
      });
      console.log(params.date);
    },
    [setPickupOpen, setPickupDate]
  );

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const addressIsFilled: boolean =
    (formValue.building !== "") &&
    (formValue.street !== "") &&
    (formValue.district !== "");

  const onDismissDelivery = useCallback(() => {
    setDeliveryOpen(false);
  }, [setDeliveryOpen]);

  const onConfirmDelivery = useCallback(
    (params: { date: any }) => {
      setDeliveryOpen(false);
      setDeliveryDate(params.date);
      setIsCollapsed3(true);
      console.log(params.date);
      setFormValue((formValue) => {
        const newFormValue = { ...formValue };
        newFormValue.deliveryDateTime = params.date;

        return newFormValue;
      });
    },
    [setDeliveryOpen, setDeliveryDate]
  );

  const onSubmit = async () => {
    console.log(formValue);
  };

  return (
    <View style={styles.formBox}>
      <AddressButton
        colorScheme={colorScheme}
        isCollapsed1={isCollapsed1}
        setIsCollapsed1={setIsCollapsed1}
        setIsCollapsed2={setIsCollapsed2}
        setIsCollapsed3={setIsCollapsed3}
        addressIsFilled={addressIsFilled}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <PickupButton
        colorScheme={colorScheme}
        isCollapsed2={isCollapsed2}
        setIsCollapsed1={setIsCollapsed1}
        setIsCollapsed2={setIsCollapsed2}
        setIsCollapsed3={setIsCollapsed3}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <Collapsible
        collapsed={isCollapsed3}
        collapsedHeight={deliveryDate === undefined ? 80 : 120}
        enablePointerEvents={true}
        style={[
          styles.surface,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
        align="top"
      >
        <Pressable
          onPress={() => {
            setIsCollapsed3(!isCollapsed3);
            setDeliveryOpen(true);
          }}
        >
          {({ pressed }) => (
            <View style={styles.btnTitle}>
              <FontAwesome
                name="truck"
                size={28}
                color={Colors[colorScheme ?? "light"].text}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
              <Text
                style={[
                  styles.btnText,
                  {
                    color: Colors[colorScheme ?? "light"].text,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
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
        {deliveryDate !== undefined ? (
          <Text style={styles.info}>
            {deliveryDate.toLocaleDateString("zh-TW")}
          </Text>
        ) : null}
        <SafeAreaProvider>
          <View
            {...register("deliveryDateTime")}
            style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
          >
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  surface: {
    flex: 1,
    maxHeight: 350,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  expandBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
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
  inputBox: {
    width: "100%",
    gap: 20,
  },
  info: {
    fontSize: 16,
  },
});
