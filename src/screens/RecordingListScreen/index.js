import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { Storage } from 'aws-amplify';

import Loading from '../../components/Loading';
import RecordingsList from '../../components/RecordingsList';
import EmptyRecordingList from '../../components/EmptyRecordingList';
import { Context as RecordingContext } from '../../context/recordingContext/recordingContext';
import { Context as UserContext } from '../../context/userContext/userContext';

function RecordingsListScreen({ type, navigation }) {
  const {
    setCurrentPlayback,
    fetchRecordingsList,
    updatePlaybackSeconds,
    state: { recordings, playback, loading }
  } = useContext(RecordingContext);

  const {
    getUserDataById,
    state: { currentUser, pressedUserId, pressedUserData }
  } = useContext(UserContext);
  useEffect(() => {
    console.log(type === 'profile' ? 'PROFILE' : 'FEED', pressedUserId);
    type === 'profile'
      ? getUserDataById(pressedUserId || currentUser.id)
      : fetchRecordingsList();
  }, [pressedUserId]);

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
        progressUpdateIntervalMillis: 100
      };
      const { sound } = await Audio.Sound.createAsync({ uri }, soundOptions);
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
        recordings={
          type === 'profile'
            ? pressedUserData && pressedUserData.recordings.items
            : recordings
        }
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
