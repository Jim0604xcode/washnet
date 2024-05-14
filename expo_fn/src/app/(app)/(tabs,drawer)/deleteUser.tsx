import { Alert, Keyboard, StyleSheet, useColorScheme, TouchableWithoutFeedback, Dimensions } from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useEditInfo, { EditAPI } from "@/utils/useEditInfo";
import React, { useCallback, useState } from "react";
import ConfirmEditDialog from "@/components/editForm/ConfirmEditDialog";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeleteUserDrawer() {
  const colorScheme = useColorScheme();
  const { authState, logout } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {delete: ""}});
  const [isDialogVisible, setDialogVisible] = useState(false);
  const deleteUser = useEditInfo(EditAPI.DELETE);
  const width = Dimensions.get('window').width;

  // const showConfirmDialog = useCallback(
  //   () => {
  //   },[]
  // )

  const confirmDeleteUser = () => {
    setDialogVisible(false);
  
    deleteUser.mutate(null, {
      onSuccess: () => {
        logout!();
        Alert.alert("成功刪除帳戶");
        console.log("Deleted user successfully");
      },
      onError: (error) => {
        console.error("Error deleting user:", error);
        Alert.alert('唔好意思...','請稍後再試');
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
        <View style={styles.touchableContainer}>
          <View style={styles.titleBox}>
            <Text
              style={[styles.title, { color: Colors[colorScheme ?? "light"].tint }]}
            >
              刪除帳戶？請等等...
            </Text>
            <Text
              style={[styles.info, { color: Colors[colorScheme ?? "light"].text }]}
            >
              請閣下再三考慮是否需要刪除此帳戶。一經刪除，你將
              <Text style={{fontWeight: 'bold'}}>不能</Text>
              恢復使用此號碼登入。
            </Text>
          </View>
          <View style={[styles.contentBox]}>
            <View style={styles.numberBox}>
              <View style={styles.iconTextRow}>
                <MaterialCommunityIcons
                  name="account-cancel"
                  size={20}
                  color={Colors[colorScheme ?? "light"].tint}
                />   
                <Text style={[styles.numberBold,
                  {color: Colors[colorScheme ?? "light"].tint}]}
                >
                  刪除帳戶
                </Text>
              </View>
              <Text style={[styles.numberBold, {color: Colors[colorScheme ?? "light"].tint}]}>
                {authState?.mobile}
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
                name="delete"
                rules={{
                  required: `須輸入「 DELETE 」以確定刪除帳戶`,
                  validate: (value) =>
                    value === ("DELETE") || "須輸入「 DELETE 」以確定刪除帳戶",

                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="確定刪除帳戶"
                    placeholder="請輸入「 DELETE 」確定"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    maxLength={30}
                    value={value}
                    theme={{
                      colors: {
                        onSurfaceVariant: Colors[colorScheme ?? "light"].outline,
                      },
                    }}
                    style={[
                      styles.input,
                      {
                        backgroundColor:
                          Colors[colorScheme ?? "light"].background,
                        borderColor: Colors[colorScheme ?? "light"].outline,
                      },
                    ]}
                    outlineColor={Colors[colorScheme ?? "light"].outline}
                    activeOutlineColor={Colors[colorScheme ?? "light"].error}
                    placeholderTextColor={Colors[colorScheme ?? "light"].outline}
                  />
                )}
              />
              {errors.delete && (
                <Text
                  style={[
                    styles.errorText,
                    { color: Colors[colorScheme ?? "light"].outline },
                  ]}
                >
                  {errors.delete?.message}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.btnBox}>
        {deleteUser.isPending ? 
          <ActivityIndicator style={styles.button} animating={true} color={Colors[colorScheme ?? "light"].tint}/>
          :
          <Button
            icon="cancel"
            style={styles.button}
            mode="contained"
            buttonColor={Colors[colorScheme ?? "light"].text}
            labelStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            onPress={handleSubmit(()=>setDialogVisible(true))}
          >
            刪除
          </Button>
            }
      </View>
        <ConfirmEditDialog
          visible={isDialogVisible}
          onDismiss={() => setDialogVisible(false)}
          onConfirm={confirmDeleteUser}
          newData={null}
          editAPI={EditAPI.DELETE}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  touchableContainer: {
    width: "100%",
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
    fontSize: 29,
    fontWeight: "bold",
  },
  info: {
    fontSize: 18,
  },
  contentBox: {
    width: '100%',
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    paddingVertical: 10,
  },
  numberBox: {
    width: "100%",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    gap: 4,

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
    paddingHorizontal: 0,
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
  },
  btnBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  }
});
