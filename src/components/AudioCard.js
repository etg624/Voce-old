import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

import { Context as RecordingContext } from '../context/recordingContext/recordingContext';
import { Context as UserContext } from '../context/userContext/userContext';
import AudioProgressBar from './AudioProgressBar';
import AudioProgressSeconds from './AudioProgressSeconds';

const AudioCard = ({ item, onPlaybackPress }) => {
  const {
    setCurrentPlayback,
    state: {
      playback,
      playback: { seconds }
    }
  } = useContext(RecordingContext);

  const durationInSeconds = Math.round(item.durationInMillis / 1000);
  const progressPercentage = 100 * (seconds / durationInSeconds);

  const shouldShowAudioProgressUpdate = playback.key === item.file.key;

  return (
    <TouchableOpacity
      style={styles.audioCard}
      onPress={() => {
        console.log(item);
        onPlaybackPress(item.file.key, () => {
          setCurrentPlayback(null);
        });
      }}
    >
      <View style={styles.userInfo}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/speakingGuy.png')}
          />
        </View>
        <View>
          <Text style={styles.cardText}>{item.title}</Text>
          <Text>
            Recorded By:{' '}
            {<Text style={{ fontWeight: 'bold' }}>{item.user.username}</Text>}
          </Text>

          {/* Audio Progress  */}

          <View style={styles.progress}>
            <AudioProgressBar
              progressPercentage={progressPercentage}
              duration={durationInSeconds}
              shouldUpdate={shouldShowAudioProgressUpdate}
            />
            <AudioProgressSeconds
              duration={durationInSeconds}
              seconds={seconds}
              shouldShowAudioProgressUpdate={shouldShowAudioProgressUpdate}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

  userInfo: {
    margin: 20
  },
  cardText: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 20
  },
  progress: {
    flex: 1,
    marginTop: 10,
    alignContent: 'flex-end'
  }
});

export default AudioCard;
