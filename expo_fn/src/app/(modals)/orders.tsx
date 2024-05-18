import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  Platform,
  StyleSheet,
  useColorScheme,
  Dimensions,
} from "react-native";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
import { UserOrder } from "@/models";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useOrderData, { QueryPeriod } from "@/utils/useOrderData";
import { useTranslation } from "react-i18next";
import React from "react";

export default function OrdersModal() {
  const width = Dimensions.get('window').width;
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const { authState } = useAuth();
  const { data, isSuccess, isLoading, error } = useOrderData(authState?.token, QueryPeriod.CURRENT);

  return (
    <ScrollView
      style={{width: width}}
      contentContainerStyle={{
      paddingTop: 20,
      paddingHorizontal: 40,
      paddingBottom: 40,
      gap: 20,
    }}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={Colors[colorScheme ?? "light"].tint}
          size={"large"}
          style={{ marginTop: 0 }}
        />
      ) : null}
        {error ? (
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].secondary,
            }}
          >
            Sorry... {error.message}
          </Text>
        ) : null}
        {isSuccess
          ? data.map((order: UserOrder, idx: number) => (
              <View
                key={idx}
                style={styles.orderItem}
                lightColor={Colors.light.surfaceContainer}
                darkColor={Colors.dark.surfaceContainerHL}
                
              >
                <View
                  style={styles.itemTitle}
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  {order.orderType === "pw" ? (
                    <MaterialCommunityIcons
                      name="scale"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "dc" ? (
                    <MaterialIcons
                      name="dry-cleaning"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "cs" ? (
                    <MaterialCommunityIcons
                      name="scissors-cutting"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "fw" ? (
                    <MaterialCommunityIcons
                      name="bed"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "lw" ? (
                    <MaterialCommunityIcons
                      name="briefcase"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "ws" ? (
                    <MaterialCommunityIcons
                      name="shoe-sneaker"
                      size={20}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles.type,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {order.orderType === "pw"
                      ? t('orders.pw')
                      : order.orderType === "dc"
                      ? t('orders.dc')
                      : order.orderType === "cs"
                      ? t('orders.cs')
                      : order.orderType === "fw"
                      ? t('orders.fw')
                      : order.orderType === "lw"
                      ? t('orders.lw')
                      : order.orderType === "ws"
                      ? t('orders.ws')
                      : null}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.number')}
                  </Text>
                  {order.orderId}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.quantity')}
                  </Text>
                  {order.pc}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.status')}
                  </Text>
                  {order.orderStatus === "w_pickup"
                    ? t('orders.w_pickup')
                    : order.orderStatus === "w_service"
                    ? t('orders.w_service')
                    : order.orderStatus === "w_delivery"
                    ? t('orders.w_delivery')
                    : order.orderStatus === "complete"
                    ? t('orders.complete')
                    : t('orders.null')}
                </Text>
                <View
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.address')}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {order.district}{", "}{order.street}{", "}{order.building}
                  </Text>
                </View>
                <View
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.pickup')}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {order.pickupDateTime}
                  </Text>
                </View>
                <View
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    {t('orders.delivery')}
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {order.deliveryDateTime}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 29,
    fontWeight: "bold",
  },
  orderItem: {
    alignItems: "flex-start",
    width: "100%",
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 10,
    gap: 10,
  },
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8,
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    fontWeight: "900",
  },
  text: {
    fontSize: 16,
    lineHeight: 20
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    marginBottom: 10,
    height: 1,
    width: "80%",
    alignSelf: "center",
  },
});
