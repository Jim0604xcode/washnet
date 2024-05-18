// (auth)/reset.tsx
import React, { useState } from "react";
import { Alert, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";

export default function ResetPasswordModal() {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const handleResetPassword = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert(t("reset.error"), t("reset.errorText"));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const result = await response.json();
      if (!result.isErr) {
        Alert.alert(t("reset.success"));
        router.replace("/login");
      } else {
        throw new Error(result.errMess);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(t("reset.error"), t("reset.errorText"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text
            style={[styles.title, { color: Colors.light.text }]}
          >
            {t("reset.title")}
          </Text>
          <Text
            style={[styles.info, { color: Colors.light.text }]}
          >
            {t("reset.info")}
          </Text>
         <Controller
            control={control}
            name="password"
            rules={{
              required: t('reset.pwRequired'),
              minLength: {
                value: 6,
                message: t('reset.pwMinLength'),
              },
              maxLength: {
                value: 16,
                message: t('reset.pwMaxLength'),
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                message: t('reset.pwPattern'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label={t("reset.password")}
                placeholder={t("reset.pwPlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                maxLength={16}
                right={
                  <TextInput.Icon 
                    icon={showPassword ? "eye-off" : "eye"}
                    color={Colors.light.outline}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors.light.tint,
                    background: Colors.light.surfaceContainerHL,
                    outline: Colors.light.outline,
                    placeholder: Colors.light.outline,
                    onSurfaceVariant: Colors.light.outline,
                  },
                }}
                style={styles.input}
                textColor={Colors.light.text}
                activeOutlineColor={Colors.light.tint}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>
              {errors.password?.message}
            </Text>
          )}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: t('reset.cfpwRequired'),
              validate: (value) =>
                value === getValues("password") || t('reset.cfpwValidate'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                label={t("reset.confirmPassword")}
                placeholder={t("reset.cfpwPlaceholder")}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                maxLength={16}
                right={
                  <TextInput.Icon 
                    icon={showPassword ? "eye-off" : "eye"}
                    color={Colors.light.outline}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                theme={{
                  colors: {
                    primary: Colors.light.tint,
                    background: Colors.light.surfaceContainerHL,
                    outline: Colors.light.outline,
                    placeholder: Colors.light.outline,
                    onSurfaceVariant: Colors.light.outline,
                  },
                }}
                style={styles.input}
                textColor={Colors.light.text}
                activeOutlineColor={Colors.light.tint}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword?.message}
            </Text>
          )}
          {loading ? (
            <ActivityIndicator animating={true} color={Colors.light.secondary} />
          ) : (
            <Button
              mode="contained"
              icon="lock-reset"
              onPress={handleSubmit(handleResetPassword)}
              style={styles.button}
              buttonColor={Colors.light.text}
              textColor={Colors.light.neutral}
            >
              {t("reset.submit")}
            </Button>
          )}
          <Link href={'/login'} asChild>
            <Button
              mode="text"
              style={[styles.button]}
              textColor={Colors.light.outline}
            >
              {t("reset.close")}
            </Button>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info:{
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 14,
    marginBottom: 10,
  },
});
