import React, { useContext, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from 'react-native';

import { Context as RecordingContext } from '../context/recordingContext/recordingContext';
import { Context as UserContext } from '../context/userContext/userContext';
import AudioProgressBar from './AudioProgressBar';
import AudioProgressSeconds from './AudioProgressSeconds';
import EllipsisModal from './EllipsisModal';

const AudioCard = ({ item, onPlaybackPress }) => {
  const {
    handleDeleteRecording,
    state: {
      playback,
      playback: { seconds }
    }
  } = useContext(RecordingContext);

  const {
    state: { currentUser }
  } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);

  const durationInSeconds = Math.round(item.durationInMillis / 1000);
  const progressPercentage = 100 * (seconds / durationInSeconds);
  const shouldShowAudioProgressUpdate = playback.key === item.file.key;

  return (
    <View
      // <TouchableOpacity>
      style={styles.audioCard}
      // onPress={() => {
      //   onPlaybackPress(item.file.key);
      // }}
    >
      <EllipsisModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        handleDeleteRecording={handleDeleteRecording}
      />
      <View style={styles.cardContents}>
        <View style={styles.cardHeader}>
          {/* User Info */}
          <View style={styles.userImageContainer}>
            <Image source={require('../assets/images/speakingGuy.png')} />
          </View>
          {currentUser && item.createdBy.id === currentUser.currentUser.id ? (
            <TouchableHighlight
              style={styles.ellipsis}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                style={{ aspectRatio: 0.5, resizeMode: 'contain' }}
                source={require('../assets/images/ellipsisVertical.png')}
              />
            </TouchableHighlight>
          ) : null}
        </View>

        {/* Audio Text */}
        <View>
          <Text style={styles.cardText}>{item.title}</Text>
          <Text>
            Recorded By:{' '}
            {
              <Text style={{ fontWeight: 'bold' }}>
                {item.createdBy.username}
              </Text>
            }
          </Text>
        </View>

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
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ellipsis: {
    alignSelf: 'flex-start',
    margin: 0
  },
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

  userImageContainer: {
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

  cardContents: {
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
