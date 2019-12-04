import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 25,
  },
  centerScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
