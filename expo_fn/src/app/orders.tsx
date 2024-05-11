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

export default function OrdersModal() {
  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const { authState } = useAuth();
  const { data, isSuccess, isLoading, error } = useOrderData(authState?.token, QueryPeriod.CURRENT);

  return (
    <ScrollView
      style={[styles.container, {width: width}]}
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
            Error: {error.message}
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
                      size={26}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "dc" ? (
                    <MaterialIcons
                      name="dry-cleaning"
                      size={26}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "cs" ? (
                    <MaterialCommunityIcons
                      name="scissors-cutting"
                      size={26}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "fw" ? (
                    <MaterialCommunityIcons
                      name="fire"
                      size={26}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "lw" ? (
                    <MaterialCommunityIcons
                      name="lightbulb"
                      size={26}
                      color={Colors[colorScheme ?? "light"].tint}
                    />
                  ) : order.orderType === "ws" ? (
                    <MaterialCommunityIcons
                      name="water"
                      size={26}
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
                      ? "磅洗"
                      : order.orderType === "dc"
                      ? "乾洗"
                      : order.orderType === "cs"
                      ? "改衣"
                      : order.orderType === "fw"
                      ? "洗袋"
                      : order.orderType === "lw"
                      ? "洗家具"
                      : order.orderType === "ws"
                      ? "洗鞋"
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
                    編號：
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
                    數量：
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
                    狀態：
                  </Text>
                  {order.orderStatus === "w_pickup"
                    ? "等待收衫"
                    : order.orderStatus === "w_delivery"
                    ? "等待派送"
                    : order.orderStatus === "complete"
                    ? "已完成"
                    : "需查找紀錄"}
                </Text>
                <View
                  style={styles.labelAndText}
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    地址：
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: Colors[colorScheme ?? "light"].text },
                    ]}
                  >
                    {order.district} {order.street} {order.building}
                  </Text>
                </View>
                <View
                  style={styles.labelAndText}
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    預計收衫時間：
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
                  style={styles.labelAndText}
                  lightColor={Colors.light.surfaceContainer}
                  darkColor={Colors.dark.surfaceContainerHL}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: Colors[colorScheme ?? "light"].tint },
                    ]}
                  >
                    預計送衫時間：
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
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
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
    gap: 8,
  },
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    gap: 4,
  },
  type: {
    fontSize: 21,
    fontWeight: "bold",
  },
  labelAndText: {
    gap: 4,
  },
  text: {
    fontSize: 16,
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
