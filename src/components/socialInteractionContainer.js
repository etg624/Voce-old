import React from 'react';
import { View, StyleSheet } from 'react-native';

const SocialInteractionContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    padding: 4,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 5,
  },
});

export default SocialInteractionContainer;
