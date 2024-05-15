import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { Pressable, Image, View, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useColorScheme, Text } from "react-native";
import { Link, useNavigation, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Divider, Switch } from "react-native-paper";

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { authState, logout } = useAuth();
  const navigator = useNavigation();
  const segment = useSegments();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainerHL },
      ]}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 150, height: 42, alignSelf: "center" }}
      />
      <View style={styles.infoBox}>
        <Text
          style={[
            styles.infoText,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
        >
          {authState?.mobile}
        </Text>
      </View>
      <Divider />
      <DrawerItem
        label="更改註冊電話"
        onPress={() => router.push("/(app)/(drawer)/mobile")}
        focused={segment[2] === "mobile"}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        icon={({ color }) => (
          <MaterialCommunityIcons name="whatsapp" size={20} color={color} />
        )}
      />
      <DrawerItem
        label="更改常用地址"
        onPress={() => router.push("/(app)/(drawer)/address")}
        focused={segment[2] === "address"}
        style={styles.drawerItem}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={({ color }) => (
          <MaterialCommunityIcons name="home" size={20} color={color} />
        )}
      />
      <DrawerItem
        label="更改密碼"
        onPress={() => router.push("/(app)/(drawer)/password")}
        focused={segment[2] === "password"}
        style={styles.drawerItem}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={({ color }) => (
          <MaterialCommunityIcons name="key" size={20} color={color} />
        )}
      />
      <DrawerItem
        label="刪除帳戶"
        onPress={() => router.push("/(app)/(drawer)/deleteUser")}
        focused={segment[2] === "deleteUser"}
        style={styles.drawerItem}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={({ color }) => (
          <MaterialCommunityIcons
            name="account-cancel"
            size={20}
            color={color}
          />
        )}
      />
      <Divider style={{ marginTop: 40 }} />
      <Switch style={styles.switch} value={true} color={Colors[colorScheme??'light'].secondary}/>
      <DrawerItem
        label="登出"
        onPress={logout!}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        icon={({ color }) => (
          <MaterialCommunityIcons name="logout" size={20} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            drawerType: "slide",
            headerShown: useClientOnlyValue(false, true),
            drawerHideStatusBarOnOpen: true,
            headerRight: () => (
              <Link href="/orders" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <MaterialCommunityIcons
                      name="basket-check"
                      size={26}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
        }}
      >
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  infoBox: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  drawerItem: {
    paddingLeft: 20,
  },
  switch: {
    marginLeft: 20,
  }
});
