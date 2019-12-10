import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Storage } from 'aws-amplify';

import Loading from '../loading';
import RecordingsList from './recordingsList';
import EmptyRecordingList from '../emptyRecordingList';
import { Context as RecordingContext } from '../../context/recordingContext/recordingContext';

function RecordingsListScreen({ recordings }) {
  const {
    setCurrentPlayback,
    updatePlaybackSeconds,
    state: { playback, loading },
  } = useContext(RecordingContext);

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
        const seconds = Math.round(playbackStatus.positionMillis / 1000);
        updatePlaybackSeconds(playback.key, seconds);
      } else {
        //paused
      }

      if (playbackStatus.isBuffering) {
        // console.log(playbackStatus);
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        setTimeout(() => {
          updatePlaybackSeconds(playback.key, 0);
        }, 1000);
      }
    }
  };
  //This is passed down to the AudioCard component
  const onPlaybackPress = async key => {
    try {
      const uri = await Storage.get(key, { level: 'public' });
      const soundOptions = {
        shouldPlay: true,
        position: 0,
        duration: 1,
        progressUpdateIntervalMillis: 100,
      };
      const { sound } = await Audio.Sound.createAsync({ uri }, soundOptions);

      setCurrentPlayback(sound, key);
    } catch (e) {
      console.log(e);
    }
  };

  return loading ? (
    <Loading />
  ) : recordings && recordings.length ? (
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

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  centerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RecordingsListScreen;
