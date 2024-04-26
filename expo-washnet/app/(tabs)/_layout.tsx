import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

const tabData = [
  { name: 'Laundry', 
    title: '磅洗',
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="scale"
        style={{ marginBottom: -8 }}
        size={28} 
        color={color}
      />
    ),
  },
  { name: 'DryCleaning', 
    title: '乾洗',
    icon: (color: string) => (
      <MaterialIcons
        name="dry-cleaning"
        style={{ marginBottom: -8 }}
        size={28}
        color={color}
      />
    ),
  },
  { name: 'Alteration', 
    title: '改衣',
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="scissors-cutting"
        style={{ marginBottom: -8 }}
        size={28}
        color={color}
      />
    ),
  },
  { name: 'OtherCleaning', 
    title: '其他清洗',
    icon: (color: string) => (
      <MaterialIcons
        name="water"
        style={{ marginBottom: -8 }}
        size={28}
        color={color}
      />
    ),
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          shadowColor: 'transparent',
        },
        headerTitle: () => (
          <Image 
            source={require('@/assets/images/logo.png')}
            style={{width: 100, height: 28}
          }
          />
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].primary,
          borderTopWidth: 0,
          marginHorizontal: 15,
          marginBottom: 21,
          borderRadius: 14,
          overflow: 'hidden',
          height: 70
        },
        tabBarItemStyle: {
          padding: 0,
          marginBottom: -18,
        },
      }}>
      {tabData.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (tab.icon(color)),
            headerLeft: () => (
              <Link href="/drawer" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <MaterialIcons
                      name="more-vert"
                      size={28}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
            headerRight: () => (
              <Link href="/orders" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="shopping-basket"
                      size={24}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
