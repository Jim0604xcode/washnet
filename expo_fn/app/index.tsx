import { Link } from "expo-router";
import React, { Suspense } from "react";
import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from 'react-native-paper';

const index = () => {

  return (
    <View style={styles.container}>
        <Suspense fallback={<ActivityIndicator animating={true} size={'large'} color={Colors.light.secondary}/>}>
            <Image 
                source={require('@/assets/images/logo-p99.png')}
                style={styles.logo}
            />
        </Suspense>
        <View style={styles.intro}>
            
            <Text style={styles.text}>
                一個電話
            </Text>
            <Text style={styles.text}>
                三步落單
            </Text>
            <Text style={styles.text}>
                洗衫... 其實唔難👍
            </Text>
        </View>
        <Link href="/Laundry" asChild>
            <Pressable >
            {({ pressed }) => (
                <View style={styles.button}>
                    <FontAwesome
                      name="arrow-right"
                      size={16}
                      color={'#FFF'}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                    <Text style={styles.buttonLabel}>
                        登入
                    </Text>
                </View>
                  )}
            </Pressable>
        </Link>
    </View>
    )


}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: Colors.light.primary,
            gap: 60,
        },
        logo: {
            width: 150,
            height: 42,
            resizeMode: "contain",
        },
        intro: {
            gap: 10,
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: 20,
        },
        text: {
            color: Colors.light.text,
            fontSize: 31,
            fontWeight: "900",
        },
        subText: {
            color: Colors.light.secondary,
            fontSize: 16,
            fontWeight: "bold",
        },
        button: {
            backgroundColor: Colors.light.tabIconSelected,
            paddingHorizontal: 54,
            paddingVertical: 18,
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        buttonLabel: {
            color: '#FFF',
            fontSize: 18,
        },
    }
)
export default index