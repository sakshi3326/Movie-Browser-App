import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TabScreen = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.key}>{item.key}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const renderContent = () => {
    switch (data.type) {
      case 'KEY_VALUE':
        return (
          <FlatList
            data={Object.entries(data.data)}
            renderItem={renderItem}
            keyExtractor={(item) => item[0]}
          />
        );
      case 'PARAGRAPH':
        return data.data.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>{paragraph}</Text>
        ));
      case 'KEY_PARAGRAPH':
        return Object.entries(data.data).map(([key, value]) => (
          <View key={key}>
            <Text style={styles.heading}>{key}</Text>
            <Text style={styles.paragraph}>{value}</Text>
          </View>
        ));
      case 'TABLE':
        return (
          <FlatList
            data={data.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{data.heading}</Text>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
});

export default TabScreen;
