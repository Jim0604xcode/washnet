import Colors from "@/src/constants/Colors";
import { Input } from "@/src/models";
import React from "react";
import { Controller, UseFormGetValues } from "react-hook-form";
import { Text, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";

type FormSlideProps = {
  data: any;
  control: any;
  errors: any;
  getValues: UseFormGetValues<{
    displayName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    district: string;
    street: string;
    building: string;
  }>;
};

const FormSlide: React.FC<FormSlideProps> = ({
  data,
  control,
  errors,
  getValues,
}) => {

  return (
    <View style={styles.inner}>
      <Text style={styles.subtitle}>{data.subtitle}</Text>
      {data.input.map((input: Input)=>(
        <Controller
          control={control}
          name={input.name}
          rules={input.rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="flat"
              label={input.label}
              placeholder={input.placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoComplete={
                input.autoComplete ?
                input.autoComplete
                  : undefined
              }
              keyboardType={
                input.keyboardType ?
                input.keyboardType 
                  : "default"
              }
              secureTextEntry={
                input.secureTextEntry ?
                input.secureTextEntry
                  : false
              }
              maxLength={input.maxLength}
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
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  inner: {
    gap: 10,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  subtitle: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    minWidth: 280,
  },
  errorText: {
    color: Colors.light.secondary,
    fontSize: 14,
  },
});

export default FormSlide;
