import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, Link, useRouter, useSegments } from "expo-router";
import React from "react";
import { Image, Text,Pressable, useColorScheme } from "react-native";
import { IconButton } from "react-native-paper";

export default function AuthLayout() {
    const colorScheme = useColorScheme();

    return (
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ 
            presentation: "card",
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTintColor: Colors.light.text,
            headerShown: true,
              headerStyle: {
                backgroundColor: Colors.light.primary,
              },
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerTitle: () => (
                <Image 
                  source={require('@/assets/images/logo-p99.png')}
                  style={{width: 100, height: 28}
                }
                />
              ),
            headerLeft: () => (
              <Link href="/login" asChild>
                <Pressable >
                  {({ pressed }) => (
                      <IconButton icon={"arrow-left"}
                        iconColor={Colors.light.text}
                        style={{ marginLeft: 15, marginTop: 0, opacity: pressed ? 0.5 : 1 }}
                        size={28}
                      />
                  )}
                </Pressable>
              </Link>
            )
          }}
        />
      </Stack>
    )
  }