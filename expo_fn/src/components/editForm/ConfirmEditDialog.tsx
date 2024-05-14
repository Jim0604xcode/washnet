import React, { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { EditAPI } from "@/utils/useEditInfo";

type ConfirmMobileDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  newData: string;
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
            "確認新號碼"
            :
            editAPI === 'editUserAddress' ?
            "確認新地址"
            :
            editAPI === 'editUserPassword' ?
            "確認新密碼"
            :
            null
          }
        </Dialog.Title>
        <Dialog.Content style={styles.dialogContent}>
          <Text style={[styles.dialogInfo,
              { color: Colors[colorScheme ?? "light"].text }]}
          >
            {editAPI === 'editUserMobile' ? 
              "你的註冊電話將改為"
              :
              editAPI === 'editUserAddress' ?
              "你的常用地址將改為"
              :
              editAPI === 'editUserPassword' ?
              "你的密碼將改為"
              :
              null
            }
          </Text>
          { editAPI !== 'editUserPassword' ? (
            <Text style={styles.dialogInfoBold}>{newData}</Text>
          ) : (
            <TextInput
              mode="outlined"
              defaultValue={newData}
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
            取消
          </Button>
          <Button icon="check" 
            onPress={onConfirm}
            textColor={Colors[colorScheme ?? "light"].tint}
            labelStyle={{ fontSize: 16 }}
          >
            確認
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
