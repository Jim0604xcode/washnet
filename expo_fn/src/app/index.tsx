import { useRouter } from "expo-router";
import React, { Suspense } from "react";
import {
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthContext";
import { setStorageItemAsync, useStorageState } from "../utils/useStorageState";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [[_, token]] = useStorageState(`${process.env.EXPO_PUBLIC_API_KEY}`); 
  const {verify} = useAuth();
  const sv = useSharedValue(0.8);

  const animation = useAnimatedStyle(
    () => ({transform: [{ scale: withSpring(sv.value, {damping: 4}) }],
    })
  );


  React.useEffect(() => {
    sv.value = sv.value + 0.4;
  },[])

  const redirectToLogin = React.useCallback(() => {
    const timeoutId = setTimeout(() => router.push('/login'), 600);
    return () => clearTimeout(timeoutId);
  }, [router]);

  React.useEffect(() => {
    if (token){
      verify!(token)
      .then(isVerified => {
        console.log('Verification:', isVerified);
        if (!isVerified) {
          return redirectToLogin();
        }
      })
      .catch(err => {
        console.error('Verification failed:', err);
      });
    } else {
      return redirectToLogin();
    }
  
  }, [token, redirectToLogin]);
  
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].primary,
          width: width,
         },
      ]}
    >
      <StatusBar style="dark" />
      <Suspense
        fallback={
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={Colors.light.secondary}
          />
        }
      >
        <Animated.Image
          source={require("@/src/assets/images/logo-p99.png")}
          style={[styles.logo, animation]}
        />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 20,
  },
  logo: {
    width: 210,
    height: 70,
    resizeMode: "contain",
    flex: 1,
  },
  intro: {
    gap: 10,
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
    flex: 1,
  }, 
  text: {
    color: Colors.light.text,
    fontSize: 31,
    fontWeight: "bold",
  },
  subText: {
    color: Colors.light.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
  loginBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  inner: {
    gap: 10,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  input: {
    width: '100%',
    minWidth: 280,
  },
  textBtnBox: {
    width: 280,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  textBtn: {
    width: 100,
  },
  button: {
    width: 280,
  },
});
export default index;
