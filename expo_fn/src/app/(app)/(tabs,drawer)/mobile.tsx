import { Alert, StyleSheet, useColorScheme } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import useEditInfo, { EditedInfo, EditAPI } from "@/utils/useEditInfo";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import ConfirmEditDialog from "@/components/editForm/ConfirmEditDialog";
import { EditedMobileReq } from "@/models";

export default function MobileDrawer() {
  const colorScheme = useColorScheme();
  const { authState, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {newMobile: ""}});
  const router = useRouter();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const editMobile = useEditInfo(EditAPI.MOBILE);

  const showConfirmDialog = useCallback(
    (data: EditedMobileReq) => {
      setNewMobile(data.newMobile);
      setDialogVisible(true);
    },[]
  )

  const confirmResetMobile = () => {
    setDialogVisible(false);
    const data = { newMobile };
  
    editMobile.mutate(data, {
      onSuccess: () => {
        setAuthState!({
          isAuthenticated: true,
          token: authState?.token as string,
          mobile: data.newMobile,
        });
        router.push("/laundry");
        Alert.alert("更改號碼成功");
        console.log("Edited mobile successfully");
      },
      onError: (error) => {
        console.error("Error editing mobile:", error);
        Alert.alert('唔好意思...','請稍後再試');
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text
          style={[styles.title, { color: Colors[colorScheme ?? "light"].tint }]}
        >
          更改註冊電話
        </Text>
        <Text
          style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
        >
          請確保你的新號碼能以
          <Text style={{ fontWeight: "700" }}>WhatsApp</Text>
          通訊。
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
              現時號碼
            </Text>
            </View>
          <Text style={[styles.numberBold, {color: Colors[colorScheme ?? "light"].tint}]}>
            {authState?.mobile as string}
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
            name="newMobile"
            rules={{
              required: "須輸入新手機號碼",
              minLength: {
                value: 8,
                message: "須8位數香港號碼",
              },
              maxLength: {
                value: 8,
                message: "須8位數香港號碼",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "只接受手機號碼",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="新手機號碼"
                placeholder="請輸入新號碼"
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
          {errors.newMobile && (
            <Text
              style={[
                styles.errorText,
                { color: Colors[colorScheme ?? "light"].outline },
              ]}
            >
              {errors.newMobile?.message}
            </Text>
          )}
        </View>
        {editMobile.isPending || editMobile.isSuccess ? 
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
          確認更改
        </Button>
        }
      </View>
      <ConfirmEditDialog
        visible={isDialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onConfirm={confirmResetMobile}
        newData={newMobile}
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
