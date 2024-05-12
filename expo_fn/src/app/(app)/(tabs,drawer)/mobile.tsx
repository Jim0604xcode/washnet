import { StyleSheet, useColorScheme } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Feather, FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import useEditUser, { EditType, EditUserMobile } from "@/utils/useEditInfo";
import { useRouter } from "expo-router";

export default function MobileDrawer() {
  const colorScheme = useColorScheme();
  const { authState, setAuthState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      newMobile: "",
      password: "",
    },
  });
  const router = useRouter();

  const edit = useEditUser(EditType.MOBILE);

  const onResetMobile = async (data: EditUserMobile) => {
    edit.mutate(data, {
      onSuccess: () => {
        setAuthState!({ 
          isAuthenticated: true,
          token: authState?.token as string,
          mobile: data.newMobile 
        });
        router.push("/laundry");
        alert('更改號碼成功')
        console.log('Edited mobile successfully');
        
      },
      onError: (error) => {
        console.error('Error editing mobile:', error)
        alert(`請稍後再試`)
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
          通訊。下單後，我們將需要聯絡閣下確定交收事宜。
        </Text>
      </View>
      <View style={[styles.contentBox, {borderColor: Colors[colorScheme??"light"].outline}]}>
        <View
          style={[
            styles.numberBox,
            { backgroundColor: Colors[colorScheme ?? "light"].tertiary },
          ]}
        >
          <Text style={[styles.numberBold, {color: Colors[colorScheme??"light"].text}]}>現時號碼</Text>
          <View style={[styles.numberRow, {
            backgroundColor: Colors[colorScheme ?? "light"].tertiary,
          }]}>
            <FontAwesome
              name="whatsapp"
              size={20}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text style={styles.numberBold}>{authState?.mobile as string}</Text>
          </View>
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
          <Controller
            control={control}
            name="password"
            rules={{
              required: "須提供密碼",
              minLength: {
                value: 6,
                message: "至少6字元",
              },
              maxLength: {
                value: 16,
                message: "上限16字元",
              },
              // pattern: {
              //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              //   message: "密碼須包括大、小階英文及數字",
              // },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label="密碼認證"
                placeholder="須提供密碼認證"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={true}
                maxLength={16}
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
                  },
                ]}
                outlineColor={Colors[colorScheme ?? "light"].outline}
                activeOutlineColor={Colors[colorScheme ?? "light"].tint}
                placeholderTextColor={Colors[colorScheme ?? "light"].outline}
              />
            )}
          />
          {errors.password && (
            <Text
              style={[
                styles.errorText,
                { color: Colors[colorScheme ?? "light"].outline },
              ]}
            >
              {errors.password?.message}
            </Text>
          )}
        </View>
      </View>
      <Button
        icon="check"
        style={styles.button}
        mode="contained"
        buttonColor={Colors[colorScheme ?? "light"].text}
        labelStyle={{
          color: Colors[colorScheme ?? "light"].background,
        }}
        onPress={handleSubmit(onResetMobile)}
      >
        確認更改
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    gap: 20,
  },
  titleBox: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 20,
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
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 14
  },
  numberBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 14,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  numberBold: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inner: {
    width: "100%",
    gap: 20,
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
    marginBottom: 20,
  },
});
