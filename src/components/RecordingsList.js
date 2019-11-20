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
        keyExtractor={item => item.id}
        data={recordings}
        renderItem={({ item }) => {
          return <AudioCard item={item} onPlaybackPress={onPlaybackPress} />;
        }}
      />
    </>
  );
};

export default RecordingsList;
