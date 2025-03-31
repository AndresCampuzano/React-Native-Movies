import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'absolute',
          borderTopWidth: 0,
        },
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
