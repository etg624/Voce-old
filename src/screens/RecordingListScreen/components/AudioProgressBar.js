import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

const AudioProgressBar = ({ progress }) => {
  return <View style={styles.bar}></View>;
};

const styles = StyleSheet.create({
  bar: {
    height: 10,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 4
  }
});

export default AudioProgressBar;
