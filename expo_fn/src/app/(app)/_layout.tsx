import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useEffect } from "react";
import { Pressable, Image, View, StyleSheet, Switch } from "react-native";
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
import { useUser } from "@/context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function CustomDrawerContent(props:  DrawerContentComponentProps) {
  const colorScheme = useColorScheme();
  const { logout } = useAuth();
  const { userState, setUserState, setLanguage } = useUser();
  const { t , i18n } = useTranslation();
  const router = useRouter();
  const segment = useSegments();
  const [isCn, setIsCn] = React.useState(true);
  const { top, bottom } = useSafeAreaInsets();

  const onToggleSwitch = useCallback(async() => {
    setIsCn(!isCn);
    setLanguage!(isCn ? 'eng' : 'cn');
  },[setIsCn, setLanguage, isCn]);

  useEffect(() => {
    if (i18n.language === 'cn') {
      setIsCn(true);
    } else if (i18n.language === 'eng') {
      setIsCn(false);
    };
  }, [])

  const handleLogout = useCallback(()=>{
      logout!();
      setUserState!({
        mobile: null,
        address: null,
        lng: null
      })
  },[])
  
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container, {
          paddingTop: (top>30)?(top+4):(top>20)?(top+10):(top+20),
          paddingBottom: (bottom>0)?(bottom):(bottom+20),
          backgroundColor: Colors[colorScheme ?? "light"].surfaceContainerHL }
      ]}
      scrollEnabled={false}
    >
      <View style={styles.topBox}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.img}
        />
        <View style={styles.infoBox}>
          <Text
            style={[styles.infoText, 
              { color: Colors[colorScheme ?? "light"].tint },
            ]}
          >
            {userState?.mobile}
          </Text>
          {(userState?.address) ? (
            <View style={styles.address}>
              <Text
                style={[styles.infoText, 
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {userState?.address?.district}{", "}
              </Text>
              <Text
                style={[styles.infoText, 
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {userState?.address?.street}{", "}
              </Text>
              <Text
                style={[styles.infoText, 
                  { color: Colors[colorScheme ?? "light"].tint },
                ]}
              >
                {userState?.address?.building}
              </Text>
            </View>
            ) : ( <Text>👋</Text>)
            }
        </View>
      </View>
      <Divider style={[styles.divider, {backgroundColor: Colors[colorScheme ?? "light"].outline}]} />
      <View style={styles.itemBox}>
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
      </View>
      <Divider style={[styles.divider, {backgroundColor: Colors[colorScheme ?? "light"].outline}]} />
      <View style={styles.bottomBox}>
        <DrawerItem
          label={t('drawer.logout')}
          onPress={handleLogout}
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
  topBox: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    paddingHorizontal: 20,
    flex: 1
  },
  infoBox: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  img: { 
    width: 150,
    height: 42,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "700",
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  divider: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  itemBox: {
    flex: 2,
  },
  drawerItem: {
    paddingLeft: 20,
  },
  drawerLabel: {
    fontWeight: "700",
    fontSize: 16,
  },
  bottomBox: {
    justifyContent: "space-between",
    flex: 1,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 20
  },
  switch: {
    alignSelf: 'center',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '700',
  }
});
