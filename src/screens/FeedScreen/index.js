import React from 'react';
import RecordingListScreen from '../../components/RecordingsList/index';

const Feed = ({ navigation }) => {
  return (
    <>
      <RecordingListScreen screenToShow="feed" />
    </>
  );
};

Feed.navigationOptions = {
  title: 'Feed',
};

export default Feed;
