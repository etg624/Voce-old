import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

const PlaybackForm = ({ savePlaybackInfo, startPlayback }) => {
  const audioInput = useRef(null);
  const [audioTitle, setAudioTitle] = useState('');
  const [
    shouldDisplayRequiredFieldError,
    setShouldDisplayRequiredFieldError
  ] = useState(false);
  const checkIfShouldDisplayRequiredFieldError = input => {
    if (!input.trim().length) {
      return setShouldDisplayRequiredFieldError(true);
    }
    return savePlaybackInfo(input);
  };

  return (
    <View style={styles.formContainer}>
      <View>
        {shouldDisplayRequiredFieldError ? (
          <Text style={styles.requiredError}>Title is Required!</Text>
        ) : null}
        <TextInput
          style={styles.textInput}
          onChangeText={text => setAudioTitle(text)}
          value={audioTitle}
          placeholder="Add a title for your recording"
          ref={audioInput}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => startPlayback()}>
          <Image
            style={styles.image}
            source={require('../assets/images/play.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => checkIfShouldDisplayRequiredFieldError(audioTitle)}
        >
          <Image
            style={{ height: 40, width: 40 }}
            source={require('../assets/images/addRecording.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    padding: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    minWidth: '90%',
    marginVertical: 15
  },
  requiredError: { alignSelf: 'center', color: 'red', fontWeight: 'bold' },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default PlaybackForm;
