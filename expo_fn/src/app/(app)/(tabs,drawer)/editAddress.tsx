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
import { useTranslation } from "react-i18next";

export default function EditAddressDrawer() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { authState, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      district: "",
      street: "",
      building: "",
    },
  });
  const router = useRouter();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [scroll, setScroll] = useState(false);

  const newAddress = useMemo(() => {
    return `${district} ${street} ${building}`;
  }, [district, street, building]);

  const showConfirmDialog = useCallback((data: EditedAddressReq) => {
    setDistrict(data.district);
    setStreet(data.street);
    setBuilding(data.building);
    setDialogVisible(true);
  }, []);

  const editAddress = useEditInfo(EditAPI.ADDRESS);

  const confirmEditAddress = useCallback(() => {
    setDialogVisible(false);
    const data: EditedAddressReq = { district, street, building };
    console.log(data);
  
    editAddress.mutate(data, {
      onSuccess: () => {
        router.replace("/laundry");
        Alert.alert(t("editAddress.success"));
        console.log("Edited address successfully");
      },
      onError: (error) => {
        console.error("Error editing address:", error);
        Alert.alert(t("editAddress.error"), t("editAddress.errorText"));
      },
    });
    },
    [district, street, building]
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
              {t("editAddress.title")}
            </Text>
            <Text
              style={[
                styles.info,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              {t("editAddress.subtitle")}
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
                  {t("editAddress.address")}
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
                name="district"
                rules={{
                  required: t("editAddress.distRequired"),
                  minLength: {
                    value: 2,
                    message: t("editAddress.minLength"),
                  },
                  maxLength: {
                    value: 30,
                    message: t("editAddress.maxLength"),
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={t("editAddress.district")}
                    placeholder={t("editAddress.distPlaceholder")}
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
                    maxLength={31}
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
              {errors.district && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.district?.message}
                </Text>
              )}
              <Controller
                control={control}
                name="street"
                rules={{
                  required: t("editAddress.stRequired"),
                  minLength: {
                    value: 2,
                    message: t("editAddress.minLength"),
                  },
                  maxLength: {
                    value: 30,
                    message: t("editAddress.maxLength"),
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={t("editAddress.street")}
                    placeholder={t("editAddress.stPlaceholder")}
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
                    maxLength={31}
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
              {errors.street && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.street?.message}
                </Text>
              )}
              <Controller
                control={control}
                name="building"
                rules={{
                  required: t("editAddress.bdlgRequired"),
                  minLength: {
                    value: 2,
                    message: t("editAddress.minLength"),
                  },
                  maxLength: {
                    value: 30,
                    message: t("editAddress.maxLength"),
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label={t("editAddress.building")}
                    placeholder={t("editAddress.bdlgPlaceholder")}
                    value={value}
                    onBlur={()=>{
                      onBlur();
                      setScroll(false);
                    }}
                    onFocus={()=>setScroll(true)}
                    onChangeText={onChange}
                    autoCapitalize="words"
                    maxLength={31}
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
              {errors.building && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.building?.message}
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
                {t("editAddress.confirm")}
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
