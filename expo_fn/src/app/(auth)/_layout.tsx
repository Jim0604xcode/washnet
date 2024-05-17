import Colors from "@/constants/Colors";
import { Stack, Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable } from "react-native";
import { IconButton } from "react-native-paper";

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          presentation: "card",
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTintColor: Colors.light.text,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: () => (
            <Image
              source={require("@/assets/images/logo-p99.png")}
              style={{ width: 100, height: 28 }}
            />
          ),
          headerLeft: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <IconButton
                    icon={"arrow-left"}
                    iconColor={Colors.light.text}
                    style={{
                      marginLeft: 15,
                      marginTop: 0,
                      opacity: pressed ? 0.5 : 1,
                    }}
                    size={28}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          presentation: "formSheet",
          headerTintColor: Colors.light.text,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: t("forgot.header"),
          headerLeft: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <IconButton
                    icon={"arrow-left"}
                    iconColor={Colors.light.text}
                    style={{ marginTop: 0, opacity: pressed ? 0.5 : 1 }}
                    size={28}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          presentation: "modal",
          headerTintColor: Colors.light.text,
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitle: t("reset.title"),
          headerLeft: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <IconButton
                    icon={"arrow-left"}
                    iconColor={Colors.light.text}
                    style={{ marginTop: 0, opacity: pressed ? 0.5 : 1 }}
                    size={28}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
