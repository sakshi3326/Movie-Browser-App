// src/navigation/AppNavigator.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NowPlayingScreen from '../screens/NowPlayingScreen';
import PopularScreen from '../screens/PopularScreen';
import TopRatedScreen from '../screens/TopRatedScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import FavoritesScreen from '../context/FavoritesScreen';
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Now Playing') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            } else if (route.name === 'Popular') {
              iconName = focused ? 'flame' : 'flame-outline';
            } else if (route.name === 'Top Rated') {
              iconName = focused ? 'star' : 'star-outline';
            } else if (route.name === 'Upcoming') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Now Playing" component={NowPlayingScreen} />
        <Tab.Screen name="Popular" component={PopularScreen} />
        <Tab.Screen name="Top Rated" component={TopRatedScreen} />
        <Tab.Screen name="Upcoming" component={UpcomingScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}