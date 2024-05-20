import Colors from "@/constants/Colors";
import { useUser } from "@/context/UserContext";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, Link } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, View, Text, useColorScheme } from "react-native";
import { IconButton } from "react-native-paper";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { userState } = useUser();

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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
            {userState?.lng === "cn" ?
              <Image
                source={require("@/assets/images/logo-cn-p99.png")}
                style={{width: 120, height: 26, marginTop: 0}}
              />
            :
              <Image
                source={require("@/assets/images/logo-eng-p99.png")}
                style={{width: 120, height: 36, marginTop: 4}}
              />
            }
          </View>
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
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 8,
              }}
            >
              <FontAwesome
                name="question-circle"
                size={20}
                color={Colors.light.text}
              />
              <Text
                style={{
                  color: Colors.light.text,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {t("forgot.header")}
              </Text>
            </View>
          )
        }}
      />
    </Stack>
  );
}
