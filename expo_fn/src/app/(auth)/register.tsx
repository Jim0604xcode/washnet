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
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { SegmentedButtons } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

const RegisterScreen = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
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
    if (
      !dirtyFields.mobile ||
      !dirtyFields.email ||
      !dirtyFields.password ||
      !dirtyFields.confirmPassword
    ) {
      setSegment("login");
      leftIn();
    } else if (
      !dirtyFields.displayName ||
      !dirtyFields.district ||
      !dirtyFields.street ||
      !dirtyFields.building
    ) {
      setSegment("address");
      rightIn();
    } else {
      await register!(data);
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'
>
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
        <Text style={styles.title}>{t('register.title')}</Text>
        <Text style={styles.content}>
          {t('register.subtitle1')}
          <FontAwesome
            name="whatsapp"
            size={18}
            color={Colors.light.text}
          />
          {t('register.subtitle2')}
        </Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
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
                  label: t('register.segment1'),
                  icon: "login",
                  onPress: () => {
                    leftIn();
                  },
                },
                {
                  value: "address",
                  label: t('register.segment2'),
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
                    required: t('register.mbRequired'),
                    minLength: {
                      value: 8,
                      message: t('register.mbLength'),
                    },
                    maxLength: {
                      value: 8,
                      message: t('register.mbLength'),
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: t('register.mbPattern'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.mobile')}
                      placeholder={t('register.mbPlaceholder')}
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
                    required: t('register.pwRequired'),
                    minLength: {
                      value: 6,
                      message: t('register.pwMinLength'),
                    },
                    maxLength: {
                      value: 16,
                      message: t('register.pwMaxLength'),
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/,
                      message: t('register.pwPattern'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.password')}
                      placeholder={t('register.pwPlaceholder')}
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
                  <Text style={styles.errorText}>
                    {errors.password?.message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: t('register.cfpwRequired'),
                    validate: (value) =>
                      value === getValues("password") || t('register.cfpwValidate'),
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.cfPassword')}
                      placeholder={t('register.cfpwPlaceholder')}
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
                    required: t('register.emRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('register.emPattern'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.email')}
                      placeholder={t('register.emPlaceholder')}
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
                    required: t('register.nameRequired'),
                    minLength: {
                      value: 2,
                      message: t('register.nameMinLength'),
                    },
                    maxLength: {
                      value: 16,
                      message: t('register.nameMaxLength'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.name')}
                      placeholder={t('register.namePlaceholder')}
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
                    required: t('register.distRequired'),
                    minLength: {
                      value: 2,
                      message: t('register.distMinLength'),
                    },
                    maxLength: {
                      value: 30,
                      message: t('register.distMaxLength'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.district')}
                      placeholder={t('register.distPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      maxLength={31}
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
                  <Text style={styles.errorText}>
                    {errors.district?.message}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="street"
                  rules={{
                    required: t('register.stRequired'),
                    minLength: {
                      value: 2,
                      message: t('register.stMinLength'),
                    },
                    maxLength: {
                      value: 30,
                      message: t('register.stMaxLength'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.street')}
                      placeholder={t('register.stPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      maxLength={31}
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
                    required: t('register.bdlgRequired'),
                    minLength: {
                      value: 2,
                      message: t('register.bdlgMinLength'),
                    },
                    maxLength: {
                      value: 30,
                      message: t('register.bdlgMaxLength'),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="flat"
                      label={t('register.building')}
                      placeholder={t('register.bdlgPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      maxLength={31}
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
                  <Text style={styles.errorText}>
                    {errors.building?.message}
                  </Text>
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
        {(segment === "login") && (
        !dirtyFields.displayName ||
        !dirtyFields.district ||
        !dirtyFields.street ||
        !dirtyFields.building)
          ? t('register.next')
          : t('register.register')}
      </Button>
    </View>
    </ScrollView>
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
    justifyContent: "center",
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
    marginBottom: 34,
  },
});
export default RegisterScreen;
