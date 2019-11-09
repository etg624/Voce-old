import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Storage } from 'aws-amplify';

import Loading from '../../components/Loading';

import RecordingsList from './components/RecordingsList';
import EmptyRecordingList from './components/EmptyRecordingList';
import { Context as RecordingContext } from '../../context/RecordingContext';

function RecordingsListScreen() {
  const {
    setPlayback,
    fetchRecordingsList,
    updatePlaybackSeconds,
    state: { recordings, playback, loading, seconds }
  } = useContext(RecordingContext);

  useEffect(() => {
    fetchRecordingsList();
  }, []);

  useEffect(() => {
    if (playback) {
      playback.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      return async () => {
        // stops spamming on playback click
        const { isLoaded } = await playback.getStatusAsync();
        if (isLoaded) {
          await playback.unloadAsync();
        }
      };
    }
  }, [playback]);

  const _onPlaybackStatusUpdate = async playbackStatus => {
    if (!playbackStatus.isLoaded) {
    } else {
      if (playbackStatus.isPlaying) {
        const seconds = playbackStatus.positionMillis / 1000;
        updatePlaybackSeconds(seconds);
      } else {
        //paused
      }

      if (playbackStatus.isBuffering) {
        // console.log(playbackStatus);
      }
    }
  };

  const onPlaybackPress = async key => {
    try {
      const uri = await Storage.get(key, { level: 'public' });
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, position: 0, duration: 1 }
      );
      setPlayback(sound);
    } catch (e) {
      console.log(e);
    }
  };

  return loading ? (
    <View style={styles.centerScreen}>
      <Loading />
    </View>
  ) : recordings.length ? (
    <View style={styles.listContainer}>
      <RecordingsList
        onPlaybackPress={onPlaybackPress}
        recordings={recordings}
        setPlayback={setPlayback}
      />
    </View>
  ) : (
    <View style={styles.centerScreen}>
      <EmptyRecordingList />
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
  centerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default RecordingsListScreen;
