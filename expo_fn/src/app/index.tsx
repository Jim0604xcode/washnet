import { useRouter } from "expo-router";
import React, { Suspense } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useStorageState } from "@/utils/useStorageState";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [[_, token]] = useStorageState(`${process.env.EXPO_PUBLIC_API_KEY}`); 
  const {verify} = useAuth();
  const sv = useSharedValue(0.8);

  const animation = useAnimatedStyle(
    () => ({transform: [{ scale: withSpring(sv.value, {damping: 5}) }],
    })
  );

  React.useEffect(() => {
    sv.value = sv.value + 0.4;
  },[])

  const redirectToLogin = React.useCallback(() => {
    const timeoutId = setTimeout(() => router.replace('/login'), 600);
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
          source={require("@/assets/images/logo-p99.png")}
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
  },
  logo: {
    width: 210,
    height: 70,
    resizeMode: "contain",
    flex: 1,
    marginBottom: 25
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
