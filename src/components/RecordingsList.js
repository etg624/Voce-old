import React, { useRef, useState, useEffect, useContext } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Loading from './Loading';

import AudioCard from './AudioCard';

const RecordingsList = ({
  onPlaybackPress,
  recordings,
  setCurrentPlayback,
  isLoading,
}) => {
  const [yState, setYState] = useState(0);
  const prevYState = usePrevious(yState);
  const getIndex = (y, _recordings) =>
    _recordings && Math.floor(((y / 214) * _recordings.length) / _recordings.length);
  const currentIndex = getIndex(yState);
  const prevIndex = getIndex(prevYState);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const handlePlayRecordingOnScroll = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    setYState(y);
    if (currentIndex >= 0 && currentIndex !== prevIndex) {
      console.log(
        `Playing ${recordings[currentIndex].title} in RecordingListScreen index`
      );
      onPlaybackPress(recordings[currentIndex].file.key);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView scrollEventThrottle={1000} onScroll={handlePlayRecordingOnScroll}>
      <NavigationEvents
        onDidBlur={() => {
          setCurrentPlayback(null);
        }}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={recordings}
        renderItem={({ item, index }) => {
          return (
            <AudioCard
              item={item}
              currentScrollPosY={yState}
              onPlaybackPress={onPlaybackPress}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default RecordingsList;
