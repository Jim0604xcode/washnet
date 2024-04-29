import { Link } from "expo-router";
import React, { Suspense } from "react";
import { Image, Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Button } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const index = () => {

  return (
    <SafeAreaView style={styles.container}>
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
        <Link href="/laundry" asChild>
            <Button 
                style={styles.button}
                mode="contained"
                buttonColor={Colors.light.text}
                icon={()=><FontAwesome
                    name="arrow-right"
                    size={16}
                    color={Colors.light.surface}
                />}
                textColor={Colors.light.surface}
                labelStyle={
                    {fontSize: 16}
                }
            >
                登入
            </Button>
        </Link>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.light.primary,
            gap: 60,
            padding: 20,
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
            width: '100%',
        },
    }
)
export default index