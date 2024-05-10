import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, useColorScheme} from "react-native";
import { Button, IconButton } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { Order, FormButtonControls, FormInputFlags } from "@/models";
import AddressButton from "@/components/orderForm/AddressButton";
import PickupButton from "@/components/orderForm/PickupButton";
import { useSharedValue } from "react-native-reanimated";
import DeliveryButton from "@/components/orderForm/DeliveryButton";
import ConfirmDialog from "@/components/orderForm/ConfirmDialog";
import { useAuth } from "@/context/AuthContext";


const OrderForm: React.FC = () => {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();
  const defaultLaundryFormValue: Order = {
    orderType: "pw",
    pc: 1,
    pickupDateTime: "",
    deliveryDateTime: "",
    tel: authState?.mobile as string,
    building: "",
    street: "",
    district: "",
    fullAddress: "",
    remarks: "",
  };

  const [formValue, setFormValue] = useState<Order>(defaultLaundryFormValue);
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
    
    const hasStep123Completed: boolean = 
      hasAddress && hasPickupDateTime && hasDeliveryDateTime;
    return {
      hasAddress,
      hasPickupDateTime,
      hasDeliveryDateTime,
      hasStep123Completed
    };
  },[
      formValue.building,
      formValue.street,
      formValue.district,
      formValue.pickupDateTime,
      formValue.deliveryDateTime
    ]
  );

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const handleDialogOpen = useCallback(() => {
    if (
      formInputFlags.hasStep123Completed
    ) {
      setDialogIsOpen(true);
    } else {
      console.warn('Form is not yet completed.')
    }
  },[formInputFlags.hasStep123Completed]
  );

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
        icon="playlist-check"
        mode="contained"
        style={styles.confirmBtn}
        buttonColor={
          formInputFlags.hasStep123Completed ?
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
        defaultFormValue={defaultLaundryFormValue}
        formBtnCtrls={formBtnCtrls}
      />
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  formBox: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 40,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  confirmBtn: {
    width: "100%",
  }
});
