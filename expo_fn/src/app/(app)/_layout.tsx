import React from "react";
import { Pressable, Image, View, StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
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
      contentContainerStyle={styles.container}
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
        label="更改註冊電話"
        onPress={() => router.push("/mobile")}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="whatsapp"
            size={20}
            color={Colors[colorScheme ?? "light"].text}
            />

        )}
      />
      <DrawerItem
        label="更改常用地址"
        onPress={() => router.push("/address")}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="home"
            size={20}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <DrawerItem
        label="更改密碼"
        onPress={() => router.push("/password")}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="key"
            size={20}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <DrawerItem
        label="刪除帳戶"
        onPress={() => router.push("/deleteUser")}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="account-cancel"
            size={20}
            color={Colors[colorScheme ?? "light"].text}
          />
        )}
      />
      <Divider style={{marginTop: 40}}/>
      <DrawerItem
        label="登出"
        onPress={()=>logout!()}
        style={styles.drawerItem}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 18,
        }}
        icon={(color) => (
          <MaterialCommunityIcons
            name="logout"
            size={20}
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
  }
});