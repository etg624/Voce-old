import React, { useEffect, useContext } from 'react';
import RecordingListScreen from '../../components/RecordingsList/index';
import { Context as RecordingContext } from '../../context/recordingContext/recordingContext';
const Feed = ({ navigation }) => {
  const {
    fetchRecordingsList,
    state: { recordings },
  } = useContext(RecordingContext);
  useEffect(() => {
    fetchRecordingsList();
  }, []);
  return (
    <>
      <RecordingListScreen screenToShow="feed" recordings={recordings} />
    </>
  );
};

Feed.navigationOptions = {
  title: 'Feed',
};

export default Feed;
