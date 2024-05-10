import React from "react";
import { Pressable, Image, View, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useColorScheme, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Divider } from "react-native-paper";

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { authState, logout } = useAuth();
  return (
    <DrawerContentScrollView {...props}
      style={styles.container}
      contentContainerStyle={{
        flex: 1,
        gap: 10,
      }}
      >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 150, height: 42, alignSelf: 'center' }}
      />
      <View style={styles.infoBox}>
        <Text style={[styles.infoText, {color: Colors[colorScheme??'light'].text}]}>
          {authState?.mobile}
        </Text>
        <Text style={[styles.infoText, {color: Colors[colorScheme??'light'].text}]}>
          {authState?.mobile}
        </Text>
        <Text style={[styles.infoText, {color: Colors[colorScheme??'light'].text}]}>
          {authState?.mobile}
        </Text>
      </View>
      <Divider/>
      <DrawerItem
        label="重設手機號碼"
        onPress={() => router.push("/mobile")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="whatsapp"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
            />

        )}
      />
      <DrawerItem
        label="重設常用地址"
        onPress={() => router.push("/address")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="home"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <DrawerItem
        label="重設密碼"
        onPress={() => router.push("/password")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="key"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <DrawerItem
        label="刪除用戶"
        onPress={() => router.push("/userDeletion")}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="delete"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <Divider style={{marginTop: 40}}/>
      <DrawerItem
        label="登出"
        onPress={()=>logout!()}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="logout"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  const colorScheme = useColorScheme();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          shadowColor: "transparent",
        },
        headerTitle: () => (
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 28 }}
          />
        ),
        headerTintColor: Colors[colorScheme ?? "light"].text,
        drawerType: 'slide',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        drawerHideStatusBarOnOpen: true,
        headerRight: () => (
          <Link href="/orders" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="basket-check"
                  size={28}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      {/* All other screens should be hidden */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  infoBox: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});