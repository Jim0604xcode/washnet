import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";

export default function ModalsLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { authState } = useAuth();

  return (
    <Stack>
      <Stack.Screen
        name="orders"
        redirect={!authState?.isAuthenticated}
        options={{
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].tint,
          },
          headerTitle: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: 8,
              }}
            >
              <MaterialCommunityIcons
                name="basket-check"
                color={Colors[colorScheme ?? "light"].background}
                size={20}
              />
              <Text
                style={{
                  color: Colors[colorScheme ?? "light"].background,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {t("modals.orders")}
              </Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
