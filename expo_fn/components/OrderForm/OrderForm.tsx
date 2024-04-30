import React, { useMemo, useState } from "react";
import { StyleSheet, View, useColorScheme} from "react-native";
import { Button, Dialog, IconButton, Portal, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text } from "@/components/Themed";
import { useForm } from "react-hook-form";
import { Order, FormButtonControls, FormInputFlags } from "@/models";
import AddressButton from "@/components/orderForm/AddressButton";
import PickupButton from "@/components/orderForm/PickupButton";
import { useSharedValue } from "react-native-reanimated";
import DeliveryButton from "./DeliveryButton";

const OrderForm: React.FC = () => {
  const colorScheme = useColorScheme();

  const [formValue, setFormValue] = useState<Order>({
    orderType: "pw",
    pc: 0,
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



  const [dialogOpen, setDialogOpen] = useState(false);


  const showDialog = () => setDialogOpen(true);

  const hideDialog = () => {
    setDialogOpen(false)
    console.log(formValue);
  };

  const [remarks, setRemarks] = useState(formValue.remarks);
  const handleRemarksChange = (newRemarks: string) => {
    setRemarks(newRemarks);
  };
  const handleRemarksBlur = () => {
    setFormValue(prevState => ({
      ...prevState,
      remarks: remarks
    }));
  };

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
        onPress={showDialog}
      >
        確認訂單
      </Button>
      <Portal>
        <Dialog visible={dialogOpen} onDismiss={hideDialog}
          style={[
            styles.dialogBox,
            {backgroundColor: Colors[colorScheme?? 'light'].surfaceContainer}
          ]}>
          <Dialog.Title style={[
            styles.dialogTitle,
            {color: Colors[colorScheme?? 'light'].tint}]}>
            請確認訂單
          </Dialog.Title>
          <Dialog.Content
            style={styles.dialogContent}
            >
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>電話：</Text>
              {formValue.tel}
            </Text>
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>地址：</Text>
              {formValue.fullAddress}
            </Text>
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>收衫時間：</Text>
              {formValue.pickupDateTime}
            </Text>
            <Text style={styles.dialogInfo}>
              <Text style={styles.dialogInfoLabel}>送衫時間：</Text>
              {formValue.deliveryDateTime}
            </Text>
            <TextInput
              {...register("pc",
                { required: true }
              )}
              onChangeText={(v: string) => {
                const filteredV = v.replace(/[^0-9]/g, '');
                setFormValue((formValue) => {
                  const newFormValue = { ...formValue };
                  newFormValue.pc = Number(filteredV);
                  return newFormValue;
                });
              }}
              keyboardType="numeric"
              mode="outlined"
              label="衣服袋數"
              value={(formValue.pc).toString()}
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
              }}
                outlineColor= {Colors[colorScheme ?? "light"].outline}
                activeOutlineColor={Colors[colorScheme ?? "light"].tint}
            />
            <TextInput
              {...register("remarks",
                { required: true }
              )}
              onChangeText={handleRemarksChange}
              onBlur={handleRemarksBlur}
              value={remarks}
              multiline
              mode="outlined"
              label="備注（如有需要）"
              placeholder="請填寫注意事項"               
              numberOfLines={2
              }
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
                minHeight: 80,

              }}
              outlineColor= {Colors[colorScheme ?? "light"].outline}
              activeOutlineColor={Colors[colorScheme ?? "light"].tint}
            />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: 'space-between'}}>
          <IconButton 
            icon={'close'} 
            iconColor={Colors[colorScheme?? 'light'].outline}
            onPress={hideDialog}
          />
            <Button
              onPress={hideDialog}
              textColor={Colors[colorScheme ?? "light"].tint}
              labelStyle={{fontSize: 16}}
              icon="send"
            >發送訂單</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  },
  dialogBox: {
    borderRadius: 14,
    borderWidth: 0,
    gap: 0
  },
  dialogTitle: {
    alignSelf: "center",
    fontSize: 21,
    fontWeight: 'bold',
  },
  dialogContent: {
    gap: 20,
    padding: 20,
  },
  dialogInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogInfo: {
    fontSize: 16,
  },
  dialogInput: {
    fontSize: 16,
  },
  dialogTextarea: {
    minHeight: 80
  }

});
