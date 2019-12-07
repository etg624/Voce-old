import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import usePrevious from '../../hooks/usePrevious';
import Loading from '../Loading';

import AudioCard from '../AudioCard';

const RecordingsList = ({ onPlaybackPress, recordings, setCurrentPlayback, isLoading }) => {
  const [yState, setYState] = useState(0);
  const prevYState = usePrevious(yState);

  //possibly create a dimensions context to be able to use globally
  const getIndex = (y, _recordings) =>
    _recordings && Math.floor(((y / 214) * _recordings.length) / _recordings.length);
  const currentIndex = getIndex(yState, recordings);
  const prevIndex = getIndex(prevYState, recordings);

  const handlePlayRecordingOnScroll = ({ nativeEvent }) => {
    const { y } = nativeEvent.contentOffset;
    setYState(y);

    if (currentIndex >= 0 && currentIndex !== prevIndex) {
      console.log(`Playing ${recordings[currentIndex].title} in RecordingListScreen index`);
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
        renderItem={({ item }) => {
          return <AudioCard item={item} currentScrollPosY={yState} />;
        }}
      />
    </ScrollView>
  );
};

export default RecordingsList;
