import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const AudioProgressBar = ({ progressPercentage, duration, shouldUpdate }) => {
  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progressPercentage,
      duration: 1000
    }).start();
  }, [progressPercentage]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  });
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {shouldUpdate ? (
          <Animated.View
            style={
              ([StyleSheet.absoluteFill], { backgroundColor: 'black', width })
            }
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 3
  },

  bar: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default AudioProgressBar;
