import { StatusBar } from 'expo-status-bar';
import { ScrollView, Platform, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/src/context/AuthContext';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { UserOrder } from '../models';

export default function Orders() {
  const colorScheme = useColorScheme();
  const { authState } = useAuth();
  const {data, isSuccess, isLoading, error} = useQuery({
    queryKey: ['orderData'],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/userOrders`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState?.token}`
            },
          }
        );
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`)
        };
        const result = await res.json();
        if (!result.isErr) {
          return result.data;
        } else {
          throw new Error(result.errMess);
        };
      } catch (error) {
        throw error; // Caught by React Query's error handling
      }
    }
  })
  return (
    <View style={styles.container} >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      {/* <Text style={styles.title} lightColor={Colors.light.tint} darkColor={Colors.dark.tint} >
        現時訂單
      </Text> */}
      <Icon
        source="basket"
        color={ Colors[colorScheme ?? "light"].tint }
        size={66}
      />
      <ScrollView 
        style={{
          width: '100%',
        }}
        contentContainerStyle={
        {
          paddingBottom: 100,
        }
      }>
        {isLoading ? 
        <ActivityIndicator animating={true} size={'large'} color={Colors[colorScheme?? 'light'].tertiary}/> 
        : null}
        {error ? 
        <Text lightColor={Colors.light.secondary} darkColor={Colors.light.secondary}>
          Error: {error.message}
        </Text> : null}
        {isSuccess ? (
          data.map((order: UserOrder, idx: number) => (
        <View key={idx} style={styles.orderItem}>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }]}>
            <Text style={styles.text}>訂單編號：</Text>
            {order.orderId}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }]}>
            <Text style={styles.text}>服務：</Text>
            {order.orderType}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }]}>
            <Text style={styles.text}>數量：</Text>
            {order.pc}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }]}>
            <Text style={styles.text}>預計收衫時間：</Text>
            {order.pickupDateTime}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }]}>
            <Text style={styles.text}>預計送衫時間：</Text>
            {order.deliveryDateTime}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.text}>地址：</Text>
            {order.fullAddress}
          </Text>
          <Text style={[styles.text,
            { color: Colors[colorScheme ?? "light"].text }
          ]}>
            <Text style={styles.text}>現時狀態：</Text>
            {order.orderStatus}
          </Text>
          <View style={styles.separator} lightColor={Colors.light.tint} darkColor={Colors.dark.tint} />
        </View>
          ))
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  orderItem: {
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 0,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
});
