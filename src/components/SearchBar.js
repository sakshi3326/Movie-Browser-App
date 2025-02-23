// src/components/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      <Ionicons
        name="search"
        size={20}
        color="#666"
        style={styles.icon}
        onPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;