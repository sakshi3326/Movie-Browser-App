import React, { useContext } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45; 

const FavoritesScreen = () => {
  const { favorites } = useContext(FavoritesContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
      style={styles.card}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.releaseDate}>📅 {item.release_date}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.vote_average}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites added yet.</Text>
          <Text style={styles.subText}>Start adding movies to your favorites list!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  list: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    margin: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  poster: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 12,
    color: '#BBBBBB',
    marginVertical: 4,
  },
  ratingBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subText: {
    fontSize: 14,
    color: '#BBBBBB',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default FavoritesScreen;
