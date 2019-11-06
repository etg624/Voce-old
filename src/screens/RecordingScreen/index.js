import React, { useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid';

import { createAudio } from '../../graphql/mutations';
import config from '../../../aws-exports';
import RecordButton from './components/RecordButton';
import PlaybackForm from './components/PlaybackForm';
import { Context as RecordingContext } from '../../context/RecordingContext';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config;

Auth.configure({
  identityPoolId: config.aws_cognito_identity_pool_id,
  region: config.aws_cognito_region
});

Storage.configure({
  AWSS3: {
    bucket,
    region
  }
});

export default function RecordingScreen({ navigation }) {
  const {
    setIsRecording,
    setRecording,
    setPlayback,
    postRecording,
    state: { isRecording, recording, playback }
  } = useContext(RecordingContext);

  const [hasAudioPermissions, setAudioPermissions] = useState(false);

  const audioModeOptions = {
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
    staysActiveInBackground: true
  };

  useEffect(() => {
    async function askForAudioPermissions() {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      setAudioPermissions(status === 'granted');
    }

    askForAudioPermissions();
  }, []);

  const beginRecording = async () => {
    const _recording = new Audio.Recording();

    try {
      await Audio.setAudioModeAsync(audioModeOptions);
      await _recording.prepareToRecordAsync(
        (Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
          android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000
          },
          ios: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 96400,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false
          }
        })
      );

      await _recording.startAsync();
      setRecording(_recording);
      setIsRecording(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    await Audio.setAudioModeAsync({
      ...audioModeOptions,
      allowsRecordingIOS: false
    });

    await recording.stopAndUnloadAsync();
    const { sound } = await recording.createNewLoadedSoundAsync({
      isLooping: false,
      isMuted: false,
      volume: 1
    });

    setPlayback(sound);
    setIsRecording(false);
  };

  const startRecordedPlayBack = async () => {
    await Audio.setAudioModeAsync({
      ...audioModeOptions,
      allowsRecordingIOS: false
    });
    try {
      (await playback.playAsync()) || (await playback.replayAsync());
    } catch (error) {
      console.log(error);
    }
  };

  const saveAndUnloadRecordedPlayback = async title => {
    const localUri = recording._uri;
    const uriParts = localUri.split('.');
    const extension = uriParts[uriParts.length - 1];
    const response = await fetch(localUri);
    const blob = await response.blob();
    const formattedFile = `${title.trim()}_${uuid()}.${extension}`;

    // const url = `https://${config.aws_user_files_s3_bucket}.s3.${config.aws_user_files_s3_bucket_region}.amazonaws.com/public/${formattedFile}`;
    Storage.put(formattedFile, blob, {
      level: 'public',
      contentType: `audio/x-${extension}`
    })
      .then(res => {
        const { key } = res;
        const audioDetails = {
          title,
          file: {
            bucket,
            region,
            localUri,
            key,
            mimeType: `audio/x-${extension}`
          }
        };
        postRecording(audioDetails);
      })
      .catch(err => console.log('STORAGE<ERROR>', err));

    setPlayback(null);

    await playback.unloadAsync();
    navigation.navigate('RecordingsList');
  };

  return (
    <View
      style={
        !playback
          ? styles.mainContainer
          : { ...styles.mainContainer, justifyContent: 'center' }
      }
    >
      {playback ? (
        <View style={styles.form}>
          <PlaybackForm
            startPlayback={startRecordedPlayBack}
            savePlaybackInfo={title => saveAndUnloadRecordedPlayback(title)}
          />
        </View>
      ) : (
        <>
          <View style={styles.recordingStatus}>
            <Text style={styles.recordingStatusText}>
              {isRecording ? 'Recording' : 'Record'}
            </Text>
          </View>
          <View style={styles.recordingButton}>
            <RecordButton
              hasAudioPermissions={hasAudioPermissions}
              isRecording={isRecording}
              stopRecording={stopRecording}
              beginRecording={beginRecording}
            />
          </View>
        </>
      )}
    </View>
  );
}

RecordingScreen.navigationOptions = {
  title: 'Record'
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  recordingButton: {
    marginBottom: 80,
    alignSelf: 'center'
  },
  recordingStatus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordingStatusText: {
    fontSize: 60
  },
  form: {}
});
