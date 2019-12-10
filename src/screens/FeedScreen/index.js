import React, { useEffect, useContext } from 'react';
import { withNavigationFocus } from 'react-navigation';
import RecordingListScreen from '../../components/recordingsList/index';
import { Context as RecordingsContext } from '../../context/recordingsContext/recordingsContext';
const Feed = ({ isFocused }) => {
  const {
    fetchRecordingsListForFeed,
    state: { recordings, loading },
  } = useContext(RecordingsContext);
  useEffect(() => {
    isFocused ? fetchRecordingsListForFeed() : null;
  }, [isFocused]);

  return (
    <>
      <RecordingListScreen screenToShow="feed" isLoading={loading} />
    </>
  );
};

Feed.navigationOptions = {
  title: 'Feed',
};

export default withNavigationFocus(Feed);
