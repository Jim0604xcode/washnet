import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Button, SegmentedButtons, Surface, shadow } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { Order, FormButtonControls, FormInputFlags, OrderType } from "@/models";
import AddressButton from "@/components/orderForm/AddressButton";
import PickupButton from "@/components/orderForm/PickupButton";
import { useSharedValue } from "react-native-reanimated";
import DeliveryButton from "@/components/orderForm/DeliveryButton";
import { useTranslation } from "react-i18next";
import ConfirmOrderDialog from "@/components/orderForm/ConfirmOrderDialog";
import { useUser } from "@/context/UserContext";

type OrderFormProps = {
  orderType: OrderType
}

const OrderForm: React.FC<OrderFormProps> = ({orderType}) => {
  const colorScheme = useColorScheme();
  const { userState } = useUser();
  const { t } = useTranslation();

  const defaultValues: Order = {
    orderType: orderType,
    pc: 1,
    pickupDateTime: "",
    deliveryDateTime: "",
    tel: userState?.mobile || "",
    building: userState?.address?.building || "",
    street: userState?.address?.street || "",
    district: userState?.address?.district || "",
    remarks: "",
  };

  const { control, handleSubmit, watch, reset, setValue } = useForm<Order>({defaultValues});

  useEffect(() => {
    if (userState?.mobile && userState?.address) {
      setValue("tel", userState.mobile);
      setValue("building", userState.address.building);
      setValue("street", userState.address.street);
      setValue("district", userState.address.district);
    }
  }, [userState?.mobile, userState?.address, setValue]);

  const formValue = watch();

  const height1 = useSharedValue(120);
  const height2 = useSharedValue(80);
  const height3 = useSharedValue(80);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const formBtnCtrls: FormButtonControls = useMemo(
    () => ({
      height1,
      height2,
      height3,
      isOpen1,
      isOpen2,
      isOpen3,
      setIsOpen1,
      setIsOpen2,
      setIsOpen3,
    }),
    [height1, height2, height3, isOpen1, isOpen2, isOpen3]
  );

  const formInputFlags: FormInputFlags = useMemo(() => {
    const hasAddress =
      formValue.building !== "" &&
      formValue.building !== undefined &&
      formValue.street !== "" &&
      formValue.street !== undefined &&
      formValue.district !== "" &&
      formValue.district !== undefined;

    const hasPickupDateTime =
      formValue.pickupDateTime !== "" && formValue.pickupDateTime !== undefined;

    const hasDeliveryDateTime =
      formValue.deliveryDateTime !== "" &&
      formValue.deliveryDateTime !== undefined;

    const hasAllStepsCompleted =
      hasAddress && hasPickupDateTime && hasDeliveryDateTime;

    return {
      hasAddress,
      hasPickupDateTime,
      hasDeliveryDateTime,
      hasAllStepsCompleted,
    };
  }, [
    formValue.building,
    formValue.street,
    formValue.district,
    formValue.pickupDateTime,
    formValue.deliveryDateTime,
  ]);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleDialogOpen = () => {
    if (formInputFlags.hasAllStepsCompleted) {
      setDialogIsOpen(true);
    } else {
      console.warn("Form is not yet completed.");
    }
  };

  return (
    <View style={styles.formBox}>
      <AddressButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        formValue={formValue}
        setFormValue={setValue}
      />
      <PickupButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        formValue={formValue}
        setFormValue={setValue}
      />
      <DeliveryButton
        formBtnCtrls={formBtnCtrls}
        formInputFlags={formInputFlags}
        formValue={formValue}
        setFormValue={setValue}
      />
      <Button
        icon="playlist-check"
        mode="contained"
        style={styles.confirmBtn}
        buttonColor={
          formInputFlags.hasAllStepsCompleted
            ? Colors[colorScheme ?? "light"].secondary
            : Colors[colorScheme ?? "light"].text
        }
        labelStyle={{
          color: Colors[colorScheme ?? "light"].background,
        }}
        onPress={handleDialogOpen}
      >
        {t("orderForm.confirmOrder")}
      </Button>
      <ConfirmOrderDialog
        dialogOpen={dialogIsOpen}
        setDialogOpen={setDialogIsOpen}
        formValue={formValue}
        setFormValue={setValue}
        defaultFormValue={defaultValues}
        formBtnCtrls={formBtnCtrls}
        reset={reset}
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  confirmBtn: {
    width: "100%",
  }
});
