import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import AudioCard from './AudioCard';

const RecordingsList = ({
  onPlaybackPress,
  recordings,
  setCurrentPlayback
}) => {
  return (
    <>
      <NavigationEvents onDidBlur={() => setCurrentPlayback(null)} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={recordings}
        renderItem={({ item, index }) => {
          return (
            <AudioCard
              item={item}
              index={index}
              onPlaybackPress={onPlaybackPress}
            />
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
