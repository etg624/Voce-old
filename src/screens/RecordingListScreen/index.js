import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Storage } from 'aws-amplify';

import RecordingsList from './components/RecordingsList';

import { Context as RecordingContext } from '../../context/RecordingContext';

function RecordingsListScreen() {
  const {
    setPlayback,
    fetchRecordingsList,
    state: { recordings, playback }
  } = useContext(RecordingContext);

  useEffect(() => {
    fetchRecordingsList();
  }, []);

  useEffect(() => {
    if (playback) {
      return async () => {
        const { isLoaded } = await playback.getStatusAsync();
        if (isLoaded) {
          await playback.unloadAsync();
        }
      };
    }
  }, [playback]);

  const onPlaybackPress = async key => {
    try {
      const uri = await Storage.get(key, { level: 'public' });
      // uri: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, position: 0, duration: 1 }
      );
      setPlayback(sound);
    } catch (e) {
      console.log(e);
    }
  };

  return recordings.length ? (
    <View style={styles.listContainer}>
      <RecordingsList
        onPlaybackPress={onPlaybackPress}
        recordings={recordings}
        setPlayback={setPlayback}
      />
    </View>
  ) : (
    <View style={styles.noRecordingsContainer}>
      <Text style={styles.noRecordingsText}>😔</Text>
      <Text style={styles.noRecordingsText}>No Recordings Yet</Text>
    </View>
  );
}

RecordingsListScreen.navigationOptions = {
  title: 'Recordings'
};
const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  noRecordingsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noRecordingsText: {
    fontSize: 25
  }
});
export default RecordingsListScreen;
