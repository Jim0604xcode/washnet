import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { Pressable, Image, View, StyleSheet, ScrollViewProps, ScrollView, Switch } from "react-native";
import { Drawer } from "expo-router/drawer";
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import { useColorScheme, Text } from "react-native";
import { Link, useRouter, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";

function CustomDrawerContent(props:  DrawerContentComponentProps) {
  const colorScheme = useColorScheme();
  const { authState, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const segment = useSegments();
  const [isCn, setIsCn] = React.useState(true);


  const onToggleSwitch = () => {
    setIsCn(!isCn);
    i18n.changeLanguage(isCn ? 'eng' : 'cn');
  };


  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].surfaceContainerHL },
      ]}
      scrollEnabled={false}
    >

      <View style={styles.infoBox}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 150, height: 42 }}
        />
        <Text
          style={[
            styles.infoText,
            { color: Colors[colorScheme ?? "light"].tint },
          ]}
        >
          {authState?.mobile}
        </Text>
      </View>
      <Divider style={[styles.divider, {backgroundColor: Colors[colorScheme ?? "light"].outline}]} />
      <DrawerItem
        label={t('drawer.mobile')}
        onPress={() => router.push("/editMobile")}
        focused={segment[2] === "editMobile"}
        style={styles.drawerItem}
        labelStyle={styles.drawerLabel}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        icon={({ color }) => (
          <MaterialCommunityIcons 
            name="whatsapp"
            size={26}
            color={color}/>
        )}
      />
      <DrawerItem
        label={t('drawer.address')}
        onPress={() => router.push("/editAddress")}
        focused={segment[2] === "editAddress"}
        style={styles.drawerItem}
                activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        labelStyle={styles.drawerLabel}
        icon={({ color }) => (
          <MaterialCommunityIcons
            name="home"
            size={26}
            color={color} />
        )}
      />
      {/* <DrawerItem
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
      /> */}
      <DrawerItem
        label={t('drawer.delete')}
        onPress={() => router.push("/deleteUser")}
        focused={segment[2] === "deleteUser"}
        style={styles.drawerItem}
        activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
        activeTintColor={Colors[colorScheme ?? "light"].background}
        inactiveTintColor={Colors[colorScheme ?? "light"].text}
        labelStyle={styles.drawerLabel}
        icon={({ color }) => (
          <MaterialCommunityIcons
            name="account-cancel"
            size={26}
            color={color}
          />
        )}
      />
      <Divider style={[styles.divider, {backgroundColor: Colors[colorScheme ?? "light"].outline}]} />
      <View style={styles.bottomBox}>
        <DrawerItem
          label={t('drawer.logout')}
          onPress={logout!}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          activeBackgroundColor={Colors[colorScheme ?? "light"].tint}
          activeTintColor={Colors[colorScheme ?? "light"].background}
          inactiveTintColor={Colors[colorScheme ?? "light"].text}
          icon={({ color }) => (
            <MaterialCommunityIcons name="logout" size={20} color={color} />
          )}
        />
        <View style={styles.switchBox}>
          <Text style={[styles.switchLabel, {
            color: isCn ? Colors[colorScheme ?? "light"].outline : Colors[colorScheme ?? "light"].text,
          }]}>English</Text>
          <Switch style={styles.switch}
            thumbColor={Colors[colorScheme??'light'].surfaceContainerHL}
            trackColor={{
              false: Colors[colorScheme ?? "light"].p80,
              true: Colors[colorScheme ?? "light"].tint 
            }}
            ios_backgroundColor={Colors[colorScheme ?? "light"].p80}
            value={isCn}
            onValueChange={onToggleSwitch}
          />
          <Text style={[styles.switchLabel,{
            color: isCn ? Colors[colorScheme ?? "light"].text : Colors[colorScheme ?? "light"].outline,
          }]}>中文</Text>
        </View>
      </View>
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
  bottomBox: {
    justifyContent: "space-between",
    paddingBottom: 60,
    flex: 1,
  },
  infoBox: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "700",
  },
  drawerItem: {
    paddingLeft: 20,
  },
  drawerLabel: {
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  switch: {
    alignSelf: 'center',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
  }
});
