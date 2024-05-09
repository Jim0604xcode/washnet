import { KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import { Text } from "@/src/components/Themed"
import Colors from "@/src/constants/Colors";
import { UseFormRegister } from "react-hook-form";
import { FetchOrder, FormButtonControls, Order } from "@/src/models";
import useSubmitForm from "@/src/utils/useSubmitForm";

type ConfirmDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<Order>;
  formValue: Order;
  setFormValue: React.Dispatch<React.SetStateAction<Order>>;
  defaultFormValue: Order;
  formBtnCtrls: FormButtonControls;
};

const ConfirmDialog = ({
  dialogOpen,
  setDialogOpen,
  register,
  formValue,
  setFormValue,
  defaultFormValue,
  formBtnCtrls,
}: ConfirmDialogProps) => {
  const colorScheme = useColorScheme();

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
        if (isOpen1) {
          height1.value = (80)
          setIsOpen1(false)
        };
        if (isOpen2) {
          height2.value = (80)
          setIsOpen2(false)
        };
        if (isOpen3) {
          height3.value = (80)
          setIsOpen3(false)
        };
        setDialogOpen(false);
      },
      onError: (error) => {
        console.error('Error submitting form:', error, fetchFormValue)
        alert(`請稍後再試`)
      },
    });
  }, [formValue, pc, remarks])

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
          請確認訂單
        </Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
            ]}>
            <Text style={styles.dialogInfoLabel}>電話：</Text>
            {formValue.tel}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>地址：</Text>
            {formValue.fullAddress}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>收衫時間：</Text>
            {formValue.pickupDateTime}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.dialogInfoLabel}>送衫時間：</Text>
            {formValue.deliveryDateTime}
          </Text>
          <TextInput
            {...register("pc", { required: true })}
            onChangeText={handlePcChange}
            onBlur={handlePcBlur}
            value={pc}
            mode="outlined"
            label="衣服袋數"
            placeholder="需要清洗幾袋衣服？"
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
            label="備註（選填）"
            placeholder="有其他事項需要本店注意嗎？"
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
        <Dialog.Actions style={{ justifyContent: "space-between", paddingBottom: 10 }}>
          <IconButton
            icon={"close"}
            iconColor={Colors[colorScheme ?? "light"].outline}
            onPress={()=>setDialogOpen(false)}
          />
          <Button
            onPress={handleSubmit}
            textColor={Colors[colorScheme ?? "light"].tint}
            labelStyle={{ fontSize: 16 }}
            icon="send"
            disabled={submission.isPending}
          >
            {submission.isPending? '發送中':'發送訂單'}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDialog;

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
