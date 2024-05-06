import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "@/src/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { SegmentedButtons } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width;
  const { register } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      displayName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      district: "",
      street: "",
      building: "",
    },
  });

  const onRegister = async (data: any) => {
    await register!(data);
  };
  const [segment, setSegment] = React.useState("login");
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  const leftIn = React.useCallback(() => {
    opacity.value = 0;
    translateX.value = -40;
    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withTiming(0, { duration: 300 });
  }, [segment]);

  const rightIn = React.useCallback(() => {
    opacity.value = 0;
    translateX.value = 40;
    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withTiming(0, { duration: 300 });
  }, [segment]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].primary,
          width: width,
        },
      ]}
    >
      <StatusBar style="dark" />
      <View style={styles.intro}>
        <Text style={styles.title}>註冊用戶</Text>
        <Text style={styles.content}>
          {"我們將以 "}
          <FontAwesome
            name="whatsapp"
            size={18}
            color={Colors[colorScheme ?? "light"].text}
          />
          {" WhatsApp聯絡閣下號碼"}
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust based on your app's header height or any top padding
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.formBox}>
        <SegmentedButtons
          value={segment}
          onValueChange={setSegment}
          buttons={[
            {
              value: "login",
              label: "登入資料",
              icon: "login",
              onPress: () => {
                leftIn();
              },
            },
            {
              value: "address",
              label: "收送地址",
              icon: "map-marker",
              onPress: () => {
                rightIn();
              },
            },
          ]}
          theme={{
            colors: {
              secondaryContainer: Colors.light.tertiary,
              onSecondaryContainer: Colors.light.text,
              onSurface: Colors.light.outline,
              outline: Colors.light.outline,
            },
          }}
        />
        {segment === "login" && (
          <Animated.View style={[styles.inner, animatedStyles]}>
            <Controller
              control={control}
              name="mobile"
              rules={{
                required: "需要聯絡閣下以收衫送衫",
                minLength: {
                  value: 8,
                  message: "Mobile number must be 8 digits",
                },
                maxLength: {
                  value: 8,
                  message: "Mobile number must be 8 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numeric values are allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="手機號碼"
                  placeholder="請輸入手機號碼"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  autoComplete="password"
                  maxLength={8}
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  placeholderTextColor={Colors.light.outline}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile?.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password can be no more than 16 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "Password must include at least one lowercase letter, one uppercase letter, and one number",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="密碼"
                  placeholder="請輸入密碼"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoComplete="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  maxLength={16}
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password?.message}</Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="確認密碼"
                  placeholder="請再次輸入密碼"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoComplete="password"
                  secureTextEntry={true}
                  maxLength={16}
                  autoCapitalize="none"
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword?.message}
              </Text>
            )}

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="電郵"
                  placeholder="用作重設密碼"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoComplete="email"
                  keyboardType="email-address"
                  maxLength={30}
                  autoCapitalize="none"
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email?.message}</Text>
            )}
          </Animated.View>
        )}
        {segment === "address" && (
          <Animated.View style={[styles.inner, animatedStyles]}>
            <Controller
              control={control}
              name="displayName"
              rules={{
                required: "Display name is required",
                minLength: {
                  value: 2,
                  message: "Display name must be at least 2 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Display name can be no more than 16 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="稱呼"
                  placeholder="請問如何稱呼閣下？"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoComplete="name"
                  autoCapitalize="words"
                  maxLength={16}
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.displayName && (
              <Text style={styles.errorText}>
                {errors.displayName?.message}
              </Text>
            )}
            <Controller
              control={control}
              name="district"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Can be no more than 30 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="地區"
                  placeholder="用作收衫送衫地址"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={30}
                  autoCapitalize="words"
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.district && (
              <Text style={styles.errorText}>{errors.district?.message}</Text>
            )}

            <Controller
              control={control}
              name="street"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Can be no more than 30 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="街道"
                  placeholder="用作收衫送衫地址"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  maxLength={30}
                  autoCapitalize="words"
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.street && (
              <Text style={styles.errorText}>{errors.street?.message}</Text>
            )}

            <Controller
              control={control}
              name="building"
              rules={{
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Can be no more than 30 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="大廈"
                  placeholder="用作收衫送衫地址"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  maxLength={30}
                  theme={{
                    colors: { onSurfaceVariant: Colors.light.outline },
                  }}
                  style={[
                    styles.input,
                    {
                      backgroundColor: Colors.light.primary,
                    },
                  ]}
                  underlineColor={Colors.light.outline}
                  textColor={Colors.light.text}
                  activeUnderlineColor={Colors.light.text}
                />
              )}
            />
            {errors.building && (
              <Text style={styles.errorText}>{errors.building?.message}</Text>
            )}
          </Animated.View>
        )}
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Button
        style={styles.button}
        mode="contained"
        buttonColor={Colors.light.text}
        icon={() => (
          <FontAwesome name="pencil" size={16} color={Colors.light.surface} />
        )}
        textColor={Colors.light.surface}
        labelStyle={{ fontSize: 16 }}
        onPress={handleSubmit(onRegister)}
      >
        註冊
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  intro: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.light.text,
    fontSize: 26,
    fontWeight: "bold",
  },
  content: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  formBox: {
    flex: 1,
    width: "100%",
    gap: 20,
    padding: 40,
    justifyContent: 'center'
  },
  inner: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    minWidth: 280,
  },
  errorText: {
    color: Colors.light.secondary,
    fontSize: 14,
  },
  button: {
    width: 280,
    marginBottom: 34
  },

});
export default RegisterScreen;
