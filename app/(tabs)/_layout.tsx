import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(229,229,229,0.7)',
          position: 'absolute',
          borderTopWidth: 1,
        },
        tabBarBackground: () => <BlurView intensity={30} style={{ flex: 1 }} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={icons.home} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image source={icons.search} style={{ tintColor: color, width: size, height: size }} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
