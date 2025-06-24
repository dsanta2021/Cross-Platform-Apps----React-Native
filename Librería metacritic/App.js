import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, Pressable, ScrollView } from 'react-native';
import { getLatestGames } from "./lib/metacritic";

const icon = require('./assets/icon.png');

export default function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView>
        {games.map((game) => (
          <View key={game.slug} style={styles.card}>
            <Image
              source={{ uri: game.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.description}>{game.description}</Text>
            <Text style={styles.score}>Score: {game.score}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    marginBottom: 10,
  },

  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    color: '#eee',
    fontSize: 16,
    marginTop: 5,
  },
  score: {
    color: 'green',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
