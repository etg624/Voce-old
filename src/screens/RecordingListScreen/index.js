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
    setCurrentPlayback,
    fetchRecordingsList,
    updatePlaybackSeconds,
    state: { recordings, playback, loading, seconds }
  } = useContext(RecordingContext);

  useEffect(() => {
    fetchRecordingsList();
  }, []);

  useEffect(() => {
    if (playback.sound) {
      playback.sound.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
      return async () => {
        // stops spamming on playback click
        const { isLoaded } = await playback.sound.getStatusAsync();
        if (isLoaded) {
          await playback.sound.unloadAsync();
        }
      };
    }
  }, [playback.sound]);

  const _onPlaybackStatusUpdate = async playbackStatus => {
    if (!playbackStatus.isLoaded) {
    } else {
      if (playbackStatus.isPlaying) {
        const seconds = playbackStatus.positionMillis / 1000;
        console.log(playback.key);
        updatePlaybackSeconds(playback.key, seconds);
      } else {
        //paused
      }

      if (playbackStatus.isBuffering) {
        // console.log(playbackStatus);
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        updatePlaybackSeconds(playback.key, 0);
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
      setCurrentPlayback(sound, key);
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
        setCurrentPlayback={setCurrentPlayback}
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
