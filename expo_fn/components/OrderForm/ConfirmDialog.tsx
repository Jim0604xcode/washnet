import { StyleSheet, Text, useColorScheme } from "react-native";
import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
} from "react-native-paper";
import Colors from "@/constants/Colors";
import { UseFormRegister } from "react-hook-form";
import { Order } from "@/models";
import useSubmitForm from "@/utils/useSubmitForm";

type ConfirmDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<Order>;
  formValue: Order;
  setFormValue: React.Dispatch<React.SetStateAction<Order>>;
};

const ConfirmDialog = ({
  dialogOpen,
  setDialogOpen,
  register,
  formValue,
  setFormValue,
}: ConfirmDialogProps) => {
  const colorScheme = useColorScheme();

  const [remarks, setRemarks] = useState("");
  const [pc, setPc] = useState("1");

  const handlePcChange = (v: string) => {
    const filteredV: string = v.replace(/[^0-9]/g, "");
    setPc(filteredV);
  }

  const handlePcBlur = () => {
    setFormValue((formValue) => {
      const newFormValue = { ...formValue };
      newFormValue.pc = Number(pc);
      return newFormValue;
    });
  };

  const handleRemarksBlur = () => {
    setFormValue((prev) => ({
      ...prev,
      remarks: remarks
    }));
  };

  const submission = useSubmitForm();
  
  const handleSubmit = useCallback(
    () => {
      const latestFormValue = {
        ...formValue,
        pc: Number(pc),
        remarks: remarks,
      };
      submission.mutate(latestFormValue, {
        onSuccess: () => {
          console.log('Form submitted successfully');
          setDialogOpen(false);
        },
        onError: (error) => {
          console.error('Error submitting form:', error);
        },
      });
      console.log(latestFormValue);
    }, [pc, remarks])

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
            <Text style={[
              styles.dialogInfoLabel,
              { color: Colors[colorScheme ?? "light"].text }
            ]}>電話：</Text>
            {formValue.tel}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={[
              styles.dialogInfoLabel,
              { color: Colors[colorScheme ?? "light"].text }
            ]}>地址：</Text>
            {formValue.fullAddress}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={[
              styles.dialogInfoLabel,
              { color: Colors[colorScheme ?? "light"].text }
            ]}>收衫時間：</Text>
            {formValue.pickupDateTime}
          </Text>
          <Text style={[
            styles.dialogInfo,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={[
              styles.dialogInfoLabel,
              { color: Colors[colorScheme ?? "light"].text }
            ]}>送衫時間：</Text>
            {formValue.deliveryDateTime}
          </Text>
          <TextInput
            {...register("pc", { required: true })}
            onChangeText={(v)=>handlePcChange(v)}
            onBlur={handlePcBlur}
            keyboardType="numeric"
            mode="outlined"
            label="衣服袋數"
            placeholder="需要清洗幾袋衣服？"
            value={pc}
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
            }}
            outlineColor={Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />

          <TextInput
            {...register("remarks")}
            onChangeText={(v)=>setRemarks(v)}
            onBlur={handleRemarksBlur}
            defaultValue={remarks}
            multiline
            mode="outlined"
            label="備註（選填）"
            placeholder="有其他事項需要本店注意嗎？"               
            numberOfLines={2}
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer,
              minHeight: 80,
            }}
            outlineColor= {Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-between" }}>
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
    borderWidth: 0,
    gap: 0,
  },
  dialogTitle: {
    alignSelf: "center",
    fontSize: 21,
    fontWeight: "bold",
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
    minHeight: 80,
  },
});
