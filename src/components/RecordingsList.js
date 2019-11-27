import React, { useRef, createRef, useState, useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";

import AudioCard from "./AudioCard";

const RecordingsList = ({ onPlaybackPress, recordings, setCurrentPlayback }) => {
  const [yState, setYState] = useState(0);
  const prevYState = usePrevious(yState);
  const getIndex = y => Math.floor(((y / 214) * recordings.length) / recordings.length);
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
      onPlaybackPress(recordings[currentIndex].file.key);
    }
  };

  return (
    <ScrollView scrollEventThrottle={1000} onScroll={handlePlayRecordingOnScroll}>
      <NavigationEvents onDidBlur={() => setCurrentPlayback(null)} />
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
