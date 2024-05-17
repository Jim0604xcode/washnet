import React, { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { EditAPI } from "@/utils/useEditInfo";
import { useTranslation } from "react-i18next";

type ConfirmMobileDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  newData: string | null;
  editAPI: EditAPI;
};

const ConfirmEditDialog = ({
  visible,
  onDismiss,
  onConfirm,
  newData,
  editAPI,
}: ConfirmMobileDialogProps) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation(); 
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[
          styles.dialogBox,
          { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainerHL },
        ]}
      >
        <Dialog.Title
          style={[
            styles.dialogTitle,
            { color: Colors[colorScheme ?? "light"].tint },
          ]}
        >
          {editAPI === 'editUserMobile' ? 
            t("editDialog.mobile")
            :
            editAPI === 'editUserAddress' ?
            t("editDialog.address")
            :
            editAPI === 'editUserPassword' ?
            t("editDialog.password")
            :
            editAPI === 'delUser' ?
            t("editDialog.delete")
            :
            null
          }
        </Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Text style={[styles.dialogInfo,
              { color: Colors[colorScheme ?? "light"].text }]}
          >
            {editAPI === 'editUserMobile' ? 
              t("editDialog.mobileText")
              :
              editAPI === 'editUserAddress' ?
              t("editDialog.addressText")
              :
              editAPI === 'editUserPassword' ?
              t("editDialog.passwordText")
              :
              editAPI === 'delUser' ?
              t("editDialog.deleteText")
              :
              null
            }
          </Text>
          { editAPI !== 'editUserPassword' ? (
            <Text style={styles.dialogInfoBold}>{newData}</Text>
          ) : (
            <TextInput
              mode="outlined"
              defaultValue={newData as string}
              editable={false}
              secureTextEntry={!showNewPassword}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? "eye-off" : "eye"}
                  color={Colors[colorScheme ?? "light"].text}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
              style={[
                styles.input,
                { 
                  backgroundColor: Colors[colorScheme ?? "light"].surfaceContainerHL,
                },
              ]}
              textColor={Colors[colorScheme ?? "light"].text}
              outlineColor={Colors[colorScheme ?? "light"].surfaceContainerHL}
            />
          )}
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button
            mode="text"
            onPress={onDismiss}
            textColor={Colors[colorScheme ?? "light"].outline}
          >
            {t("editDialog.cancel")}
          </Button>
          <Button icon="check"
            onPress={onConfirm}
            textColor={Colors[colorScheme ?? "light"].tint}
            labelStyle={{ fontSize: 16 }}
          >
            {t("editDialog.confirm")}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogBox: {
    borderRadius: 14,
    gap: 20
  },
  dialogTitle: {
    alignSelf: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  dialogContent: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 10
  },
  dialogInfo: {
    fontSize: 16,
  },
  dialogInfoBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogActions: {
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingHorizontal: 20,
    gap: 10
  },
  input: {
    paddingLeft: 40,
    width: "100%",
    height: 18,
    textAlign: "center",
    fontWeight: 'bold',
  },
});

export default ConfirmEditDialog;
