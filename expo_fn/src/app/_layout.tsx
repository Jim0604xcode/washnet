import 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { View, Text } from 'react-native';
const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(app)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    NotoSans: require('../assets/fonts/NotoSansCJKtc-Regular.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <PaperProvider>
            <SafeAreaProvider>
                <StackLayout/>
            </SafeAreaProvider>
          </PaperProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function StackLayout() {
  const { authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const ColorScheme = useColorScheme();

  useEffect(() => {
    const firstSegment = segments.length > 0 ? segments[0] : null;
    const isAuthenticated = authState?.isAuthenticated;
    const inProtected = firstSegment === '(app)';

    if (!isAuthenticated && inProtected) {
      router.replace('/login');
    } else if (isAuthenticated) {
      router.replace('/laundry');
    }
  }, [authState?.isAuthenticated])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="orders" 
        redirect={authState?.isAuthenticated!==true}
        options={{
        headerStyle: {
          backgroundColor: Colors[ColorScheme??'light'].tint,
        },
        headerTitle: ()=>(
          <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', columnGap: 8}}>
            <MaterialCommunityIcons
              name="basket-check"
              color={Colors[ColorScheme??'light'].background}
              size={20}
            />
            <Text style={{color: Colors[ColorScheme ?? 'light'].background,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
              現時訂單
            </Text>
          </View>
          ),
        presentation: 'modal' }} />
    </Stack>
  );
}