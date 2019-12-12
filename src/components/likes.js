import React from 'react';
import { Text } from 'react-native';
import SocialInteractionContainer from './socialInteractionContainer';
import { updateLike } from '../graphql/mutations';

const Likes = () => {
  return (
    <SocialInteractionContainer>
      <Text>Likes</Text>
    </SocialInteractionContainer>
  );
};

export default Likes;
