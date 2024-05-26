import React, { useMemo } from 'react';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  
  const tabData = useMemo(() => [
    { name: 'laundry',
      title: t('tabs.laundry'),
      icon: (color: string) => (
        <MaterialCommunityIcons
          name="scale"
          size={26} 
          color={color}
        />
      ),
    },
    { name: 'dryCleaning', 
      title: t('tabs.dryClean'),
      icon: (color: string) => (
        <MaterialIcons
          name="dry-cleaning"
          size={26}
          color={color}
        />
      ),
    },
    { name: 'alteration', 
      title: t('tabs.alteration'),
      icon: (color: string) => (
        <MaterialCommunityIcons
          name="scissors-cutting"
          size={26}
          color={color}
        />
      ),
    },
    { name: 'otherCleaning', 
      title: t('tabs.others'),
      icon: (color: string) => (
        <Entypo
          name="water"
          size={22}
          color={color}
        />
      ),
    },
  ], [t]);

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS === "ios" ? false : true,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].primary,
          borderTopWidth: 0,
          marginHorizontal: 15,
          marginBottom: (bottom>20)?(bottom-13):
            (bottom>0)?(bottom):Platform.OS==="android"?(bottom+20):(bottom+4),
          borderRadius: 14,
          elevation: 2,
          paddingHorizontal: 10,
          height: 66
        },
        tabBarItemStyle: {
          padding: 0,
          gap: -8,
          marginBottom: (bottom>0)?(-bottom+16):(-bottom+12),
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
         name='editMobile'
         options={{href: null}}
        />
        <Tabs.Screen
         name='editAddress'
         options={{href: null}}
        />
        <Tabs.Screen
         name='deleteUser'
         options={{href: null}}
        />
    </Tabs>
  );
}