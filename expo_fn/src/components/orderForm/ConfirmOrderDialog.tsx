import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { FormButtonControls, Order, OtherOrders } from "@/models";
import useSubmitForm from "@/utils/useSubmitForm";
import { useTranslation } from "react-i18next";
import { UseFormReset, UseFormSetValue } from "react-hook-form";

type ConfirmOrderDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formValue: Order;
  setFormValue: UseFormSetValue<Order> | UseFormSetValue<OtherOrders>;
  defaultFormValue: Order | OtherOrders;
  formBtnCtrls: FormButtonControls;
  reset: UseFormReset<Order> | UseFormReset<OtherOrders>;
  setService: null | React.Dispatch<React.SetStateAction<string>>;
};

const ConfirmOrderDialog = ({
  dialogOpen,
  setDialogOpen,
  formValue,
  setFormValue,
  defaultFormValue,
  formBtnCtrls,
  reset,
  setService,
}: ConfirmOrderDialogProps) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const [remarks, setRemarks] = useState("");
  const [pc, setPc] = useState("1");
  const [scroll, setScroll] = useState(false);

  const handlePcChange = (v: string) => {
    const filteredV: string = v.replace(/[^0-9]/g, "");
    setPc(filteredV);
  };

  const handlePcBlur = () => {
    setFormValue("pc", Number(pc));
    setScroll(false);
  };

  const handleRemarksBlur = () => {
    setFormValue("remarks", remarks);
    setScroll(false);
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

  const resetForm = useCallback(
    () => {
      reset(defaultFormValue);
      setPc("1");
      setRemarks("");
      height1.value = 120;
      height2.value = 80;
      height3.value = 80;
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setDialogOpen(false);
    },[defaultFormValue])
  

  const handleSubmit = useCallback(() => {
    const fetchFormValue: Order = {
      orderType: formValue.orderType,
      tel: formValue.tel,
      building: formValue.building,
      street: formValue.street,
      district: formValue.district,
      pickupDateTime: formValue.pickupDateTime,
      deliveryDateTime: formValue.deliveryDateTime,
      pc: Number(pc),
      remarks: remarks,
    };
    submission.mutate(fetchFormValue, {
      onSuccess: () => {
        resetForm();
        if (setService) setService("");
        Alert.alert(t("orderDialog.success"))
      },
      onError: (error) => {
        console.error("Error submitting form:", error, fetchFormValue);
        Alert.alert(t("orderDialog.error"),t("orderDialog.errorText"));
      },
    });
  }, [formValue, pc, remarks, isOpen1, isOpen2, isOpen3]);

  return (
    <Portal>
      <Dialog
        visible={dialogOpen}
        onDismiss={() => setDialogOpen(false)}
        style={[
          styles.dialogBox,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainer },
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView scrollEnabled={scroll} contentContainerStyle={styles.scrollContent}>
              <Dialog.Title
                style={[
                  styles.dialogTitle,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {t("orderDialog.confirmOrder")}
              </Dialog.Title>
              <Dialog.Content style={styles.dialogContent}>
                <Text
                  style={[
                    styles.dialogInfo,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.dialogInfoLabel,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t("orderDialog.tel")}
                  </Text>
                  {formValue.tel}
                </Text>
                <Text
                  style={[
                    styles.dialogInfo,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.dialogInfoLabel,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t("orderDialog.address")}
                  </Text>
                  {formValue.district}
                  {", "}
                  {formValue.street}
                  {", "}
                  {formValue.building}
                </Text>
                <Text
                  style={[
                    styles.dialogInfo,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.dialogInfoLabel,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t("orderDialog.pickup")}
                  </Text>
                  {formValue.pickupDateTime}
                </Text>
                <Text
                  style={[
                    styles.dialogInfo,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.dialogInfoLabel,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t("orderDialog.delivery")}
                  </Text>
                  {formValue.deliveryDateTime}
                </Text>
                <TextInput
                  onChangeText={handlePcChange}
                  onFocus={() => setScroll(true)}
                  onBlur={handlePcBlur}
                  value={pc}
                  mode="outlined"
                  label={t("orderDialog.pc")}
                  placeholder={t("orderDialog.pcPlaceholder")}
                  inputMode="numeric"
                  keyboardType="numeric"
                  maxLength={2}
                  selectTextOnFocus
                  style={{
                    backgroundColor:
                      Colors[colorScheme ?? "light"].surfaceContainer,
                  }}
                  outlineColor={Colors[colorScheme ?? "light"].outline}
                  activeOutlineColor={Colors[colorScheme ?? "light"].tint}
                />
                <TextInput
                  onChangeText={setRemarks}
                  onFocus={() => setScroll(true)}
                  onBlur={handleRemarksBlur}
                  defaultValue={remarks}
                  mode="outlined"
                  label={t("orderDialog.remarks")}
                  placeholder={t("orderDialog.remarksPlaceholder")}
                  blurOnSubmit
                  multiline
                  numberOfLines={2}
                  maxLength={100}
                  textAlignVertical="top"
                  style={{
                    backgroundColor:
                      Colors[colorScheme ?? "light"].surfaceContainer,
                    minHeight: 80,
                  }}
                  outlineColor={Colors[colorScheme ?? "light"].outline}
                  activeOutlineColor={Colors[colorScheme ?? "light"].tint}
                />
              </Dialog.Content>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Dialog.Actions
          style={styles.buttons}
        >
          <Button
            mode="text"
            onPress={() => setDialogOpen(false)}
            textColor={Colors[colorScheme ?? "light"].outline}
          >
            {t("orderDialog.cancel")}
          </Button>
          <Button
            onPress={handleSubmit}
            textColor={Colors[colorScheme ?? "light"].tint}
            icon="send"
            disabled={submission.isPending}
          >
            {submission.isPending
              ? t("orderDialog.sending")
              : t("orderDialog.send")}
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
    lineHeight: 20,
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
  buttons: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
