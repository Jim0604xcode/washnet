import { Alert, StyleSheet, useColorScheme } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import useEditInfo, { EditAPI } from "@/utils/useEditInfo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import ConfirmEditDialog from "@/components/editForm/ConfirmEditDialog";
import { EditedMobileReq } from "@/models";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext";

export default function EditMobileDrawer() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { userState, setUserState } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {mobile: ""}});
  const router = useRouter();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [mobile, setMobile] = useState("");
  const editMobile = useEditInfo(EditAPI.MOBILE);

  const showConfirmDialog = useCallback(
    (data: EditedMobileReq) => {
      setMobile(data.mobile);
      setDialogVisible(true);
    },[]
  )

  const confirmResetMobile = () => {
    setDialogVisible(false);
    const data: EditedMobileReq = { mobile };
  
    editMobile.mutate(data, {
      onSuccess: () => {
        setUserState!((prev) => ({
          ...prev,
          mobile: data.mobile,
        }))
        router.replace("/laundry");
        Alert.alert(t("editMobile.success"));
        console.log("Edited mobile successfully");
      },
      onError: (error) => {
        console.error("Error editing mobile:", error);
        Alert.alert(t("editMobile.error"),t("editMobile.errorText"));
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].tint }]}
        >
          {t("editMobile.title")}
        </Text>
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          {t("editMobile.subtitle1")}
          <Text style={{ fontWeight: "700" }}>WhatsApp</Text>
          {t("editMobile.subtitle2")}
        </Text>
      </View>
      <View style={[styles.contentBox]}>
        <View style={styles.numberBox}>
          <View style={styles.iconTextRow}>
            <FontAwesome
              name="whatsapp"
              size={20}
              color={Colors[colorScheme ?? "light"].tint}
            />   
            <Text style={[styles.numberBold,
              {color: Colors[colorScheme ?? "light"].tint}]}
            >
              {t("editMobile.number")}
            </Text>
            </View>
          <Text style={[styles.numberBold, {color: Colors[colorScheme ?? "light"].tint}]}>
            {userState?.mobile as string}
          </Text>
        </View>
        <Entypo
          name="arrow-bold-down"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <View style={styles.inner}>
          <Controller
            control={control}
            name="mobile"
            rules={{
              required: t("editMobile.required"),
              minLength: {
                value: 8,
                message: t("editMobile.length"),
              },
              maxLength: {
                value: 8,
                message: t("editMobile.length"),
              },
              pattern: {
                value: /^[0-9]+$/,
                message: t("editMobile.pattern"),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label={t("editMobile.label")}
                placeholder={t("editMobile.placeholder")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                autoComplete="password"
                maxLength={8}
                theme={{
                  colors: {
                    onSurfaceVariant: Colors[colorScheme ?? "light"].outline,
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
                placeholderTextColor={Colors[colorScheme ?? "light"].outline}
              />
            )}
          />
          {errors.mobile && (
            <Text
              style={[
                styles.errorText,
                { color: Colors[colorScheme ?? "light"].outline },
              ]}
            >
              {errors.mobile?.message}
            </Text>
          )}
        </View>
        {editMobile.isPending ? 
        <ActivityIndicator style={styles.button} animating={true} color={Colors[colorScheme ?? "light"].tint}/>
        :
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
          {t("editMobile.confirm")}
        </Button>
        }
      </View>
      <ConfirmEditDialog
        visible={isDialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onConfirm={confirmResetMobile}
        newData={mobile}
        editAPI={EditAPI.MOBILE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    gap: 40,
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10
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
    justifyContent: "flex-start",
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  numberBox: {
    width: "100%",
    flexDirection: 'column',
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
  inner: {
    width: "100%",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
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
