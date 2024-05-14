import React, { useCallback, useMemo, useState } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useEditInfo, { EditAPI } from "@/utils/useEditInfo";
import { useRouter } from "expo-router";
import ConfirmEditDialog from "@/components/editForm/ConfirmEditDialog";
import { EditedAddressReq } from "@/models";

export default function AddressDrawer() {
  const colorScheme = useColorScheme();
  const { authState, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newDistrict: "",
      newStreet: "",
      newBuilding: "",
    },
  });
  const router = useRouter();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [newDistrict, setNewDistrict] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newBuilding, setNewBuilding] = useState("");
  const [scroll, setScroll] = useState(false);

  const newAddress = useMemo(() => {
    return `${newDistrict} ${newStreet} ${newBuilding}`;
  }, [newDistrict, newStreet, newBuilding]);

  const showConfirmDialog = useCallback((data: EditedAddressReq) => {
    setNewDistrict(data.newDistrict);
    setNewStreet(data.newStreet);
    setNewBuilding(data.newBuilding);
    setDialogVisible(true);
  }, []);

  const editAddress = useEditInfo(EditAPI.ADDRESS);

  const confirmEditAddress = useCallback(() => {
    setDialogVisible(false);
    const data: EditedAddressReq = { newDistrict, newStreet, newBuilding };
  
    editAddress.mutate(data, {
      onSuccess: () => {
        router.push("/laundry");
        Alert.alert("更改地址成功");
        console.log("Edited address successfully");
      },
      onError: (error) => {
        console.error("Error editing address:", error);
        Alert.alert("唔好意思...", "請稍後再試");
      },
    });
    },
    [newDistrict, newStreet, newBuilding]
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
              更改常用地址
            </Text>
            <Text
              style={[
                styles.info,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              請提供準確地址以便收發衣服。
            </Text>
          </View>
          <View style={styles.contentBox}>
            <View style={styles.numberBox}>
              <View style={styles.iconTextRow}>
                <MaterialCommunityIcons
                  name="home"
                  size={20}
                  color={Colors[colorScheme ?? "light"].tint}
                />
                <Text
                  style={[
                    styles.numberBold,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  現時地址
                </Text>
              </View>
              <Text
                style={[
                  styles.numberBold,
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {authState?.mobile as string}
              </Text>
            </View>
            <Entypo
              name="arrow-bold-down"
              size={24}
              color={Colors[colorScheme ?? "light"].text}
            />
            <View style={styles.inputBox}>
              <Controller
                control={control}
                name="newDistrict"
                rules={{
                  required: "須提供地區名稱用作收衫送衫",
                  minLength: {
                    value: 2,
                    message: "至少2字元",
                  },
                  maxLength: {
                    value: 30,
                    message: "上限30字元",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="地區"
                    placeholder="請填寫地區"
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
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
              {errors.newDistrict && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.newDistrict?.message}
                </Text>
              )}
              <Controller
                control={control}
                name="newStreet"
                rules={{
                  required: "須提供街道名稱用作收衫送衫",
                  minLength: {
                    value: 2,
                    message: "至少2字元",
                  },
                  maxLength: {
                    value: 30,
                    message: "上限30字元",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="街道"
                    placeholder="請填寫街道"
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
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
              {errors.newStreet && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.newStreet?.message}
                </Text>
              )}
              <Controller
                control={control}
                name="newBuilding"
                rules={{
                  required: "須提供大廈名稱用作收衫送衫",
                  minLength: {
                    value: 2,
                    message: "至少2字元",
                  },
                  maxLength: {
                    value: 30,
                    message: "上限30字元",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="大廈"
                    placeholder="請填寫大廈"
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
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
              {errors.newBuilding && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.newBuilding?.message}
                </Text>
              )}
            </View>
            {editAddress.isPending ? (
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
            onConfirm={confirmEditAddress}
            newData={newAddress}
            editAPI={EditAPI.ADDRESS}
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
