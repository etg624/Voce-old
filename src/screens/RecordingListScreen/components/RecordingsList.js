import React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

const RecordingsList = ({ onPlaybackPress, recordings, setPlayback }) => {
  return (
    <>
      <NavigationEvents onDidBlur={() => setPlayback(null)} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={recordings}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.audioCard}
              onPress={() => {
                onPlaybackPress(item.file.key);
              }}
            >
              <View style={styles.userInfo}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../../assets/images/speakingGuy.png')}
                  />
                </View>
                <View>
                  <Text style={styles.cardText}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  audioCard: {
    marginTop: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 5
  },

  imageContainer: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    borderRadius: 4,
    width: '20%',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  image: {},
  userInfo: {
    margin: 20
  },
  cardText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 20
  }
});

export default RecordingsList;
