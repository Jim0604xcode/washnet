import { Link } from "expo-router";
import React, { Suspense, useCallback, useState } from "react";
import {
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
import Colors from "@/constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { useUser } from "@/context/UserContext";

const LoginScreen = () => {
  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setLanguage } = useUser();

  const toggleLanguage = useCallback(async() => {
    setLanguage!(i18n.language === "cn" ? 'eng' : 'cn');
  },[i18n.language]);

  const handleMobileChange = (value: string) => {
    const filteredValue: string = value.replace(/[^0-9]/g, "");
    setMobile(filteredValue);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async () => {
    await login!(mobile, password);
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
      <StatusBar style="dark" />
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
          source={require("@/assets/images/logo-p99.png")}
          style={styles.logo}
        />
      </Suspense>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.intro}>
          <Text style={styles.text}>{t("login.title1")}</Text>
          <Text style={styles.text}>{t("login.title2")}</Text>
          <Text style={styles.subText}>{t("login.subtitle")}</Text>
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
              label={t("login.mobile")}
              placeholder={t("login.mbPlaceholder")}
              value={mobile}
              onChangeText={handleMobileChange}
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
              label={t("login.password")}
              placeholder={t("login.pwPlaceholder")}
              value={password}
              onChangeText={handlePasswordChange}
              autoComplete="password"
              autoCapitalize="none"
              secureTextEntry={true}
              maxLength={16}
              enterKeyHint="done"
              onSubmitEditing={handleLogin}
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
              <Link href="/register" asChild>
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
                      {t("login.register")}
                    </Button>
                  )}
                </Pressable>
              </Link>
              <Link href="/reset" asChild>
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
                      {t("login.forget")}
                    </Button>
                  )}
                </Pressable>
              </Link>
              <Pressable onPress={toggleLanguage}>
                {({ pressed }) => (
                  <Button
                    style={[styles.textBtn, { opacity: pressed ? 0.5 : 1 }]}
                    mode="text"
                    icon={() => (
                      <MaterialIcons
                        name="translate"
                        size={12}
                        color={Colors.light.text}
                      />
                    )}
                    textColor={Colors.light.text}
                    labelStyle={{ fontSize: 12 }}
                  >
                    {i18n.language === 'cn' ? 'English' : '中文'}
                  </Button>
                )}
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
        {t("login.login")}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
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
    fontSize: 36,
    fontWeight: "bold",
  },
  subText: {
    color: Colors.light.text,
    fontSize: 26,
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    // minHeight: 160,
    flex: 1
  },
  input: {
    width: '100%',
    minWidth: 280,
  },
  textBtnBox: {
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red'
  },
  textBtn: {
    width: 90,
  },
  button: {
    width: 280,
  },
});
export default LoginScreen;
