import { API, graphqlOperation } from 'aws-amplify';
import { createAudio } from '../../../graphql/mutations';

export const postRecordingToDynamo = async audioDetails => {
  const newAudio = await API.graphql(
    graphqlOperation(createAudio, { input: audioDetails })
  );
  return newAudio;
};
