import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { darkTheme } from '../theme';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import PopularScreen from '../screens/PopularScreen';
import TopRatedScreen from '../screens/TopRatedScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import FavoritesScreen from '../context/FavoritesScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer theme={darkTheme}>
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
          tabBarActiveTintColor: darkTheme.colors.tabBarActiveTintColor, 
          tabBarInactiveTintColor: darkTheme.colors.tabBarInactiveTintColor,
          tabBarStyle: {
            backgroundColor: darkTheme.colors.tabBarBackground, 
            borderTopWidth: 0, 
          },
          headerStyle: {
            backgroundColor: darkTheme.colors.surface, 
          },
          headerTintColor: darkTheme.colors.text, 
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Now Playing"
          component={NowPlayingScreen}
          options={{ title: 'Now Playing' }}
        />
        <Tab.Screen
          name="Popular"
          component={PopularScreen}
          options={{ title: 'Popular' }}
        />
        <Tab.Screen
          name="Top Rated"
          component={TopRatedScreen}
          options={{ title: 'Top Rated' }}
        />
        <Tab.Screen
          name="Upcoming"
          component={UpcomingScreen}
          options={{ title: 'Upcoming' }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
        <Tab.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{ tabBarButton: () => null }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}