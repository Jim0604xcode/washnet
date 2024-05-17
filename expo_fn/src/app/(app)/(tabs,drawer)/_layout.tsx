import React, { useMemo } from 'react';
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  
  const tabData = useMemo(() => [
    { name: 'laundry',
      title: t('tabs.laundry'),
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
      title: t('tabs.dryClean'),
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
      title: t('tabs.alteration'),
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
      title: t('tabs.others'),
      icon: (color: string) => (
        <Entypo
          name="water"
          style={{ marginBottom: -8 }}
          size={22}
          color={color}
        />
      ),
    },
  ], [t]);

  return (
    <Tabs
      screenOptions={{
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
         name='editMobile'
         options={{href: null}}
        />
        <Tabs.Screen
         name='editAddress'
         options={{href: null}}
        />
        {/* <Tabs.Screen
         name='editPassword'
         options={{href: null}}
        /> */}
        <Tabs.Screen
         name='deleteUser'
         options={{href: null}}
        />
    </Tabs>
  );
}