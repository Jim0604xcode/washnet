// (auth)/forgot.tsx
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function ForgotModal() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/user/forgetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileOrEmail: email }),
        }
      );

      const result = await response.json();
      if (!result.isErr) {
        Alert.alert(t("forgot.sent"));
      } else {
        Alert.alert(t("forgot.error"),t("forgot.errorText"));
    }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(t("forgot.error"),t("forgot.errorText"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, { color: Colors.light.secondary }]}
      >
        {t("forgot.title")}
      </Text>
      <Text
        style={[styles.info, { color: Colors.light.text}]}
      >
        {t("forgot.info")}
      </Text>
      <TextInput
        mode="outlined"
        label={t("forgot.email")}
        placeholder={t("forgot.placeholder")}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        theme={{
          colors: {
            primary: Colors.light.tint,
            background: Colors.light.surfaceContainerHL,
            outline: Colors.light.outline,
            placeholder: Colors.light.outline,
            onSurfaceVariant: Colors.light.outline
          },
        }}
        textColor={Colors.light.text}

      />
      {loading ? (
        <ActivityIndicator animating={true} color={Colors.light.secondary} />
      ) : (
        <Button
          mode="contained"
          icon={'send'}
          onPress={handleSendEmail}
          style={styles.button}
          buttonColor={Colors.light.text}
          textColor={Colors.light.neutral}
        >
          {t("forgot.send")}
        </Button>
      )}
      <Link href={'/login'} asChild>
        <Button
            mode="text"
            style={[styles.button]}
            textColor={Colors.light.outline}
            labelStyle={{ fontSize: 16 }}
        >
            {t("forgot.close")}
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    marginBottom: 20,
  },
  info:{
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: "100%",
  },
});
