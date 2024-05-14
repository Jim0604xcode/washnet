import React, { useCallback, useState } from "react";
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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useEditInfo, { EditAPI } from "@/utils/useEditInfo";
import { useRouter } from "expo-router";
import ConfirmEditDialog from "@/components/editForm/ConfirmEditDialog";
import { EditedPasswordReq } from "@/models";

export default function PasswordDrawer() {
  const colorScheme = useColorScheme();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const router = useRouter();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [scroll, setScroll] = useState(false);

  const showConfirmDialog = useCallback((data: EditedPasswordReq) => {
    setCurrentPassword(data.currentPassword);
    setNewPassword(data.newPassword);
    setDialogVisible(true);
  }, []);

  const editPassword = useEditInfo(EditAPI.PASSWORD);

  const confirmEditPassword = useCallback(() => {
    setDialogVisible(false);
    const data: EditedPasswordReq = { currentPassword, newPassword };
  
    editPassword.mutate(data, {
      onSuccess: () => {
        router.push("/laundry");
        Alert.alert("成功更改密碼");
        console.log("Edited password successfully");
      },
      onError: (error) => {
        console.error("Error editing password:", error);
        Alert.alert("唔好意思...", "請稍後再試");
      },
    });
    },
    [currentPassword, newPassword]
  )


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}
          scrollEnabled={scroll}
        >
          <View style={styles.titleBox}>
            <Text
              style={[
                styles.title,
                { color: Colors[colorScheme ?? "light"].tint },
              ]}
            >
              更改密碼
            </Text>
            <Text
              style={[
                styles.info,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              請先輸入現時密碼，然後輸入新密碼。
            </Text>
          </View>
          <View style={styles.contentBox}>
            <View style={styles.numberBox}>
              <View style={styles.iconTextRow}>
                <MaterialCommunityIcons
                  name="key"
                  size={20}
                  color={Colors[colorScheme ?? "light"].tint}
                />
                <Text
                  style={[
                    styles.numberBold,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  現時密碼
                </Text>
              </View>
              <View style={styles.inputBox}>
              <Controller
                control={control}
                name="currentPassword"
                rules={{
                  required: "須認證現時密碼",
                  minLength: {
                    value: 6,
                    message: "至少6字元",
                  },
                  maxLength: {
                    value: 16,
                    message: "上限16字元",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                    message: "密碼須包括英文字母及數字",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="現時密碼"
                    placeholder="請輸入現時密碼"
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoComplete="password"
                    autoCapitalize="none"
                    secureTextEntry={!showCurrentPassword}
                    right={
                      <TextInput.Icon
                        icon={showCurrentPassword ? "eye-off" : "eye"}
                        color={Colors[colorScheme ?? "light"].outline}
                        onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                      />
                    }
                    maxLength={16}
                    theme={{
                      colors: {
                        onSurfaceVariant:
                          Colors[colorScheme ?? "light"].outline,
                      },
                    }}
                    style={[
                      styles.input,
                      {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].surfaceContainer,
                        borderColor: Colors[colorScheme ?? "light"].outline,
                      },
                    ]}
                    outlineColor={Colors[colorScheme ?? "light"].outline}
                    activeOutlineColor={Colors[colorScheme ?? "light"].tint}
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].outline
                    }
                  />
                )}
              />
              {errors.currentPassword && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.currentPassword?.message}
                </Text>
              )}
            </View>
            </View>
            <Entypo
              name="arrow-bold-down"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
            <View style={styles.inputBox}>
              <Controller
                control={control}
                name="newPassword"
                rules={{
                  required: "須提供新密碼",
                  validate: (value) =>
                    value !== getValues("currentPassword") || "與提供之舊密碼相同",
                  minLength: {
                    value: 6,
                    message: "至少6字元",
                  },
                  maxLength: {
                    value: 16,
                    message: "上限16字元",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                    message: "密碼須包括英文字母及數字",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="新密碼"
                    placeholder="請輸入新密碼"
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    secureTextEntry={!showNewPassword}
                    right={
                      <TextInput.Icon
                        icon={showNewPassword ? "eye-off" : "eye"}
                        color={Colors[colorScheme ?? "light"].outline}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                      />
                    }
                    maxLength={16}
                    theme={{
                      colors: {
                        onSurfaceVariant:
                          Colors[colorScheme ?? "light"].outline,
                      },
                    }}
                    style={[
                      styles.input,
                      {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].surfaceContainer,
                        borderColor: Colors[colorScheme ?? "light"].outline,
                      },
                    ]}
                    outlineColor={Colors[colorScheme ?? "light"].outline}
                    activeOutlineColor={Colors[colorScheme ?? "light"].tint}
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].outline
                    }
                  />
                )}
              />
              {errors.newPassword && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.newPassword?.message}
                </Text>
              )}
            </View>
            {editPassword.isPending ? (
              <ActivityIndicator
                style={styles.button}
                animating={true}
                color={Colors[colorScheme ?? "light"].tint}
              />
            ) : (
              <Button
                icon="check"
                style={styles.button}
                mode="contained"
                buttonColor={Colors[colorScheme ?? "light"].text}
                labelStyle={{
                  color: Colors[colorScheme ?? "light"].background,
                }}
                onPress={handleSubmit(showConfirmDialog)}
              >
                確認更改
              </Button>
            )}
          </View>

          <ConfirmEditDialog
            visible={isDialogVisible}
            onDismiss={() => setDialogVisible(false)}
            onConfirm={confirmEditPassword}
            newData={newPassword}
            editAPI={EditAPI.PASSWORD}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  info: {
    fontSize: 18,
  },
  contentBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 0,
    gap: 20,
  },
  numberBox: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 14,
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  numberBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  input: {
    width: "100%",
    minWidth: 280,
  },
  errorText: {
    fontSize: 14,
  },
  button: {
    width: "100%",
    marginVertical: 10,
  },
});
