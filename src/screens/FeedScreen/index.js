import React, { useEffect, useContext } from 'react';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';
import RecordingList from '../../components/recordingsList/index';
import { Context as RecordingsContext } from '../../context/recordingsContext/recordingsContext';
const Feed = ({ isFocused }) => {
  //prettier-ignore
  const { fetchRecordingsListForFeed, state: { loading } } = useContext(RecordingsContext);
  // useEffect(() => {
  //   isFocused ? fetchRecordingsListForFeed() : null;
  // }, [isFocused]);

  return (
    <>
      <NavigationEvents onWillFocus={() => fetchRecordingsListForFeed()} />
      <RecordingList screenToShow="feed" isLoading={loading} />
    </>
  );
};

Feed.navigationOptions = {
  title: 'Feed',
};

export default withNavigationFocus(Feed);
