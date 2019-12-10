import React, { useEffect, useContext } from 'react';
import RecordingListScreen from '../../components/RecordingsList/index';
import { Context as RecordingContext } from '../../context/recordingContext/recordingContext';
const Feed = ({ navigation }) => {
  const {
    fetchRecordingsList,
    state: { recordings, loading },
  } = useContext(RecordingContext);
  useEffect(() => {
    fetchRecordingsList();
  }, []);
  return (
    <>
      <RecordingListScreen screenToShow="feed" recordings={recordings} isLoading={loading} />
    </>
  );
};

Feed.navigationOptions = {
  title: 'Feed',
};

export default Feed;
