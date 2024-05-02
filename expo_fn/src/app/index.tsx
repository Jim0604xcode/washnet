import { Link } from "expo-router";
import React, { Suspense, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthContext";

const index = () => {
  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleTelChange = (value: string) => {
    const filteredValue: string = value.replace(/[^0-9]/g, "");
    setTel(filteredValue);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    await login!(tel, password);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].primary,
          width: width,
         },
      ]}
    >
      <Suspense
        fallback={
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={Colors.light.secondary}
          />
        }
      >
        <Image
          source={require("@/src/assets/images/logo-p99.png")}
          style={styles.logo}
        />
      </Suspense>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.intro}>
          <Text style={styles.text}>一個電話</Text>
          <Text style={styles.text}>三步落單</Text>
          <Text style={styles.text}>洗衫... 其實唔難👍</Text>
        </View>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.loginBox}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              mode="flat"
              label="手機號碼"
              placeholder="請輸入手機號碼"
              value={tel}
              onChangeText={handleTelChange}
              keyboardType="numeric"
              autoComplete="password"
              maxLength={8}
              theme={{
                colors: { onSurfaceVariant: Colors.light.outline}
              }}
              style={[styles.input, {
                backgroundColor: Colors.light.primary,
              }]}
              underlineColor={Colors.light.outline}
              textColor={Colors.light.text}
              placeholderTextColor={Colors.light.outline}
              activeUnderlineColor={Colors.light.text}
            />
            <TextInput
              mode="flat"
              label="密碼"
              placeholder="請輸入密碼"
              value={password}
              onChangeText={handlePasswordChange}
              autoComplete="password"
              secureTextEntry={true}
              maxLength={16}
              theme={{
                colors: { onSurfaceVariant: Colors.light.outline}
              }}
              style={[styles.input, {
                backgroundColor: Colors.light.primary,
              }]}
              underlineColor={Colors.light.outline}
              textColor={Colors.light.text}
              activeUnderlineColor={Colors.light.text}
            />
            <View style={styles.textBtnBox}>
              <Pressable>
                {({ pressed }) => (
                  <Button
                    style={[styles.textBtn, { opacity: pressed ? 0.5 : 1 }]}
                    mode="text"
                    icon={() => (
                      <FontAwesome
                        name="pencil"
                        size={12}
                        color={Colors.light.text}
                      />
                    )}
                    textColor={Colors.light.text}
                    labelStyle={{ fontSize: 12 }}
                  >
                    註冊
                  </Button>
                )}
              </Pressable>
              <Pressable>
                {({ pressed }) => (
                  <Button
                    style={[styles.textBtn, { opacity: pressed ? 0.5 : 1 }]}
                    mode="text"
                    icon={() => (
                      <FontAwesome
                        name="question-circle"
                        size={12}
                        color={Colors.light.text}
                      />
                    )}
                    textColor={Colors.light.text}
                    labelStyle={{ fontSize: 12 }}
                  >
                    忘記密碼
                  </Button>
                )}
              </Pressable>
            </View>
            <Button
              style={styles.button}
              mode="contained"
              buttonColor={Colors.light.text}
              icon={() => (
                <FontAwesome
                  name="sign-in"
                  size={16}
                  color={Colors.light.surface}
                />
              )}
              textColor={Colors.light.surface}
              labelStyle={{ fontSize: 16 }}
              onPress={handleLogin}
            >
              登入
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingTop: 20,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    flex: 0.5,
  },
  intro: {
    gap: 10,
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
    flex: 1,
  },
  text: {
    color: Colors.light.text,
    fontSize: 31,
    fontWeight: "bold",
  },
  subText: {
    color: Colors.light.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  inner: {
    gap: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  input: {
    width: '100%',
    minWidth: 280,
  },
  textBtnBox: {
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  textBtn: {
    width: 100,
  },
  button: {
    width: 280,
  },
});
export default index;