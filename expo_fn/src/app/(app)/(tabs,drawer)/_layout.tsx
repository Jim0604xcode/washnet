import React from 'react';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';

const tabData = [
  { name: 'laundry', 
    title: '磅洗',
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="scale"
        style={{ marginBottom: -8 }}
        size={26} 
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
        size={26}
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
        size={26}
        color={color}
      />
    ),
  },
  { name: 'otherCleaning', 
    title: '其他清洗',
    icon: (color: string) => (
      <Entypo
        name="water"
        style={{ marginBottom: -8 }}
        size={22}
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
          marginBottom: 22,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          borderBottomStartRadius: 14,
          borderBottomEndRadius: 14,
          paddingHorizontal: 10,
          height: 66
        },
        tabBarItemStyle: {
          padding: 0,
          marginBottom: -16,
        }
      }}
    >
      {tabData.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (tab.icon(color)),
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
        {/* <Tabs.Screen
         name='password'
         options={{href: null}}
        /> */}
        <Tabs.Screen
         name='deleteUser'
         options={{href: null}}
        />
    </Tabs>
  );
}