import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const width = Dimensions.get("window").width;
  const { register } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
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
    if (!dirtyFields.mobile || !dirtyFields.email || !dirtyFields.password || !dirtyFields.confirmPassword) {
      setSegment("login");
      leftIn();
    } else if (!dirtyFields.displayName || !dirtyFields.district || !dirtyFields.street || !dirtyFields.building) {
      setSegment("address");
      rightIn();
    } else {
      await register!(data)
    }
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
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
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
              label: "收發地址",
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
                required: "須提供手機號碼",
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
                  message: "只接受電話號碼",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="flat"
                  label="手機號碼"
                  placeholder="需要聯絡閣下收衫送衫"
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
                required: "須提供密碼",
                minLength: {
                  value: 8,
                  message: "至少8字元",
                },
                maxLength: {
                  value: 16,
                  message: "上限16字元",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    "密碼須包括大、小階英文及數字",
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
                required: "須確認密碼",
                validate: (value) =>
                  value === getValues("password") || "密碼不符",
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
                required: "須提供電郵",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "不符電郵格式",
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
                required: "請讓本店知道閣下稱呼",
                minLength: {
                  value: 2,
                  message: "至少2字元",
                },
                maxLength: {
                  value: 16,
                  message: "上限16字元",
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
                required: "須提供地區用作收衫送衫",
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
                  mode="flat"
                  label="地區"
                  placeholder="收衫送衫地址"
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
    justifyContent: 'center',
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
    color: Colors.light.outline,
    fontSize: 14,
  },
  button: {
    width: 280,
    marginBottom: 34
  },

});
export default RegisterScreen;
