import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyRecordingList = ({ loading }) => {
  return (
    <>
      <Text style={styles.noRecordingsText}>😔</Text>
      <Text style={styles.noRecordingsText}>No Recordings Yet</Text>
    </>
  );
};

const styles = StyleSheet.create({
  noRecordingsText: {
    fontSize: 25
  }
});
export default EmptyRecordingList;
