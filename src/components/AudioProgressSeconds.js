import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AudioProgressSeconds = ({
  seconds,
  shouldShowAudioProgressUpdate,
  duration
}) => {
  return (
    <View style={styles.container}>
      {shouldShowAudioProgressUpdate ? (
        <Text>00:0{seconds}</Text>
      ) : (
        <Text>00:00</Text>
      )}

      <View>
        <Text>00:0{duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3
  }
});

export default AudioProgressSeconds;
