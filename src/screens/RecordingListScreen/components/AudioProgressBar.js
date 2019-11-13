import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const AudioProgressBar = ({ progressPercentage, duration }) => {
  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progressPercentage,
      duration: duration
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
        <Animated.View
          style={
            ([StyleSheet.absoluteFill], { backgroundColor: 'black', width })
          }
        />
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
    padding: 8
  },

  bar: {
    height: 10,
    borderColor: '#000',
    width: '100%',
    borderWidth: 2,
    borderRadius: 4
  }
});

export default AudioProgressBar;
