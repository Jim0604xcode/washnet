import { KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import { Text } from "@/components/Themed"
import Colors from "@/constants/Colors";
import { UseFormRegister } from "react-hook-form";
import { FetchOrder, FormButtonControls, Order } from "@/models";
import useSubmitForm from "@/utils/useSubmitForm";
import { useTranslation } from "react-i18next";

type ConfirmOrderDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<Order>;
  formValue: Order;
  setFormValue: React.Dispatch<React.SetStateAction<Order>>;
  defaultFormValue: Order;
  formBtnCtrls: FormButtonControls;
};

const ConfirmOrderDialog = ({
  dialogOpen,
  setDialogOpen,
  register,
  formValue,
  setFormValue,
  defaultFormValue,
  formBtnCtrls,
}: ConfirmOrderDialogProps) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const [remarks, setRemarks] = useState("");
  const [pc, setPc] = useState("1");

  const handlePcChange = (v: string) => {
    const filteredV: string = v.replace(/[^0-9]/g, "");
    setPc(filteredV);
  }

  const handlePcBlur = () => {
    setFormValue((prev) => ({
      ...prev,
      pc: Number(pc)
    }));
  };

  const handleRemarksBlur = () => {
    setFormValue((prev) => ({
      ...prev,
      remarks: remarks
    }));
  };
  const {
    height1,
    height2,
    height3,
    isOpen1,
    isOpen2,
    isOpen3,
    setIsOpen1,
    setIsOpen2,
    setIsOpen3,
  } = formBtnCtrls;

  const submission = useSubmitForm();
  
  const handleSubmit = useCallback(() => {
    // Create the most updated formValue {} for fetching
    const fetchFormValue: FetchOrder = {
      orderType: formValue.orderType,
      tel: formValue.tel,
      building: formValue.building,
      street: formValue.street,
      district: formValue.district,
      pickupDateTime: formValue.pickupDateTime,
      deliveryDateTime: formValue.deliveryDateTime,
      // Using the local states of pc and remarks
      pc: Number(pc),
      remarks: remarks,
    };
    submission.mutate(fetchFormValue, {
      onSuccess: () => {
        console.log('Form submitted successfully');
        setFormValue(defaultFormValue);
        setPc("1");
        setRemarks("");
        height1.value = (80)
        setIsOpen1(false)
        height2.value = (80)
        setIsOpen2(false)
        height3.value = (80)
        setIsOpen3(false)
        setDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error submitting form:', error, fetchFormValue)
        alert(`請稍後再試`)
      },
    });
  }, [formValue, pc, remarks, isOpen1, isOpen2, isOpen3])

  return (
    <Portal>
      <Dialog
        visible={dialogOpen}
        onDismiss={()=>setDialogOpen(false)}
        style={[
          styles.dialogBox,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
      >
        <Dialog.Title
          style={[
            styles.dialogTitle,
            { color: Colors[colorScheme ?? "light"].tint },
          ]}
        >
          {t('orderDialog.confirmOrder')}
        </Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
            ]}>
            <Text style={styles.dialogInfoLabel}>
              {t('orderDialog.tel')}
            </Text>
            {formValue.tel}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>
              {t('orderDialog.address')}
            </Text>
            {formValue.fullAddress}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>
              {t('orderDialog.pickup')}
            </Text>
            {formValue.pickupDateTime}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>
              {t('orderDialog.delivery')}
            </Text>
            {formValue.deliveryDateTime}
          </Text>
          <TextInput
            {...register("pc", { required: true })}
            onChangeText={handlePcChange}
            onBlur={handlePcBlur}
            value={pc}
            mode="outlined"
            label={t('orderDialog.pc')}
            placeholder={t('orderDialog.pcPlaceholder')}
            inputMode="numeric"
            keyboardType="numeric"
            maxLength={2}
            selectTextOnFocus
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
            }}
            outlineColor={Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
          <TextInput
            {...register("remarks")}
            onChangeText={setRemarks}
            onBlur={handleRemarksBlur}
            defaultValue={remarks}
            mode="outlined"
            label={t('orderDialog.remarks')}
            placeholder={t('orderDialog.remarksPlaceholder')}
            blurOnSubmit
            multiline            
            numberOfLines={2}
            maxLength={100}
            textAlignVertical='top'
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
              minHeight: 80,
            }}
            outlineColor= {Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
        </Dialog.Content>
        <Dialog.Actions style={{ 
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 10,
          gap: 10 }}
        >
          <Button
            mode="text"
            onPress={()=>setDialogOpen(false)}
            textColor={Colors[colorScheme ?? "light"].outline}
          >
            {t('orderDialog.cancel')}
          </Button>
          <Button
            onPress={handleSubmit}
            textColor={Colors[colorScheme ?? "light"].tint}
            icon="send"
            disabled={submission.isPending}
          >
            {submission.isPending? t('orderDialog.sending'):
            t('orderDialog.send')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmOrderDialog;

const styles = StyleSheet.create({
  dialogBox: {
    borderRadius: 14,
  },
  dialogTitle: {
    alignSelf: "center",
    fontSize: 21,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  dialogContent: {
    gap: 20,
    paddingHorizontal: 20,
  },
  dialogInfo: {
    fontSize: 16,
  },
  dialogInfoLabel: {
    fontWeight: "bold",
  },
  dialogInput: {
    fontSize: 16,
  },
  dialogTextarea: {
    minHeight: 80,
  },
});
