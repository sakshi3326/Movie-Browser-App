// App.js
import React from 'react';
import { FavoritesProvider } from './src/context/FavoritesContext'; // For favorites feature
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <FavoritesProvider>
      <AppNavigator />
    </FavoritesProvider>
  );
}