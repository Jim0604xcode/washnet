import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack, Tabs, useNavigation } from 'expo-router';
import { Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/context/AuthContext';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';

const tabData = [
  { name: 'laundry', 
    title: '磅洗',
    icon: (color: string, size: number) => (
      <MaterialCommunityIcons
        name="scale"
        style={{ marginBottom: -8 }}
        size={size} 
        color={color}
      />
    ),
  },
  { name: 'dryCleaning', 
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
  { name: 'alteration', 
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
  { name: 'otherCleaning', 
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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
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
      }}
    >
      {tabData.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (tab.icon(color, size)),
          }}
        />
      ))}
        <Tabs.Screen
         name='mobile'
         options={{href: null}}
        />
        <Tabs.Screen
         name='address'
         options={{href: null}}
        />
        <Tabs.Screen
         name='password'
         options={{href: null}}
        />
        <Tabs.Screen
         name='userDeletion'
         options={{href: null}}
        />
    </Tabs>
  );
}