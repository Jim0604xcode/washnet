import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, useColorScheme} from "react-native";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { Order, FormButtonControls, FormInputFlags } from "@/models";
import AddressButton from "@/components/orderForm/AddressButton";
import PickupButton from "@/components/orderForm/PickupButton";
import { useSharedValue } from "react-native-reanimated";
import DeliveryButton from "./DeliveryButton";
import ConfirmDialog from "./ConfirmDialog";

const OrderForm: React.FC = () => {
  const colorScheme = useColorScheme();

  const [formValue, setFormValue] = useState<Order>({
    orderType: "pw",
    pc: 1,
    pickupDateTime: "",
    deliveryDateTime: "",
    tel: "65432109",
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

  const height1 = useSharedValue(80);
  const height2 = useSharedValue(80);
  const height3 = useSharedValue(80);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const formBtnCtrls: FormButtonControls = useMemo(() => ({
    height1,
    height2,
    height3,
    isOpen1,
    isOpen2,
    isOpen3,
    setIsOpen1,
    setIsOpen2,
    setIsOpen3,
}), [height1, height2, height3, isOpen1, isOpen2, isOpen3]);

  const formInputFlags: FormInputFlags = useMemo(() => {
    const hasAddress: boolean =
      (formValue.building !== "") &&
      (formValue.street !== "") &&
      (formValue.district !== "");

    const hasPickupDateTime: boolean =
      (formValue.pickupDateTime !== "") &&
      (formValue.pickupDateTime !== undefined);

    const hasDeliveryDateTime: boolean =
      (formValue.deliveryDateTime !== "") &&
      (formValue.deliveryDateTime !== undefined);
    return {
      hasAddress,
      hasPickupDateTime,
      hasDeliveryDateTime,
    };
  },[
      formValue.building,
      formValue.street,
      formValue.district,
      formValue.pickupDateTime,
      formValue.deliveryDateTime
    ]);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const handleDialogOpen = useCallback(() => {
    if (
      formInputFlags.hasAddress &&
      formInputFlags.hasPickupDateTime &&
      formInputFlags.hasDeliveryDateTime
    ) {
      setDialogIsOpen(true);
    } else {
      console.log('Form is not yet completed.')
    }
  }, [
    formInputFlags.hasAddress,
    formInputFlags.hasPickupDateTime,
    formInputFlags.hasDeliveryDateTime,
  ]);

  return (
    <View style={styles.formBox}>
      <AddressButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <PickupButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <DeliveryButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
      <Button
        icon="send"
        mode="contained"
        buttonColor={
          formInputFlags.hasAddress && 
          formInputFlags.hasPickupDateTime &&
          formInputFlags.hasDeliveryDateTime ?
          Colors[colorScheme ?? "light"].tint :
          Colors[colorScheme ?? "light"].text
        }
        labelStyle={{
          color: Colors[colorScheme ?? "light"].background,
          fontSize: 16,
          fontWeight: "bold",
        }}
        onPress={handleDialogOpen}
      >
        確認訂單
      </Button>
      <ConfirmDialog
        dialogOpen={dialogIsOpen}
        setDialogOpen={setDialogIsOpen}
        register={register}
        formValue={formValue}
        setFormValue={setFormValue}
      />
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
    width: "100%",
    height: "auto",
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
  }
});
