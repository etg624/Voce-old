import { API, graphqlOperation } from 'aws-amplify';
import config from '../../../aws-exports';

import createContext from '../createContext';

import { listAudios, getUser } from '../../graphql/queries';
import { deleteAudio } from '../../graphql/mutations';

import { postRecordingToDynamo, postRecordingToS3 } from './helpers/index';

const initialState = {
  recordings: [],
  loading: true,
};

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

const recordingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.bool };
    case 'POST_RECORDING_TO_S3_AND_DYNAMO':
      return {
        ...state,
        recordings: [action.recording, ...state.recordings],
      };
    case 'HANDLE_DELETE_RECORDING': {
      return {
        ...state,
        recordings: state.recordings.filter(
          recording => recording.id !== action.recordingToDelete.id
        ),
      };
    }
    case 'FETCH_RECORDING_LIST_FOR_FEED':
      return { ...state, recordings: [...action.recordings] };
    case 'GET_USER_RECORDINGS_BY_ID':
      return { ...state, recordings: [...action.recordings] };
    case 'RESET_RECORDINGS_STATE':
      return { ...state, recordings: [] };

    default:
      return state;
  }
};

//this is to be used with other action creators that have dispatch attached to them
const setLoading = bool => ({ type: 'SET_LOADING', bool });

const postRecordingToS3AndDynamo = dispatch => {
  return async (title, recording, id) => {
    dispatch(setLoading(true));
    const { key, localUri, extension } = await postRecordingToS3(title, recording, 'public');
    const file = {
      bucket,
      region,
      localUri,
      key,
      mimeType: `audio/x-${extension}`,
    };

    const audioDetails = {
      title,
      audioCreatedById: id,
      durationInMillis: recording._finalDurationMillis,
      file,
    };
    const { data } = await postRecordingToDynamo(audioDetails);
    dispatch({
      type: 'POST_RECORDING_TO_S3_AND_DYNAMO',
      recording: data.createAudio,
    });

    dispatch(setLoading(false));
  };
};

const fetchRecordingsListForFeed = dispatch => {
  return async () => {
    try {
      dispatch(setLoading(true));
      const res = await API.graphql(graphqlOperation(listAudios));

      dispatch({
        type: 'FETCH_RECORDING_LIST_FOR_FEED',
        recordings: res.data.listAudios.items,
      });

      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  };
};

const getUserRecordingsById = dispatch => async id => {
  try {
    dispatch(setLoading(true));
    const res = await API.graphql(graphqlOperation(getUser, { id }));

    dispatch({ type: 'GET_USER_RECORDINGS_BY_ID', recordings: res.data.getUser.recordings.items });
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  }
};

const handleDeleteRecording = dispatch => {
  return async id => {
    const res = await API.graphql(graphqlOperation(deleteAudio, { input: { id } }));

    dispatch({
      type: 'HANDLE_DELETE_RECORDING',
      recordingToDelete: res.data.deleteAudio,
    });
  };
};

const resetRecordingsState = dispatch => () => dispatch({ type: 'RESET_RECORDINGS_STATE' });

export const { Context, Provider } = createContext(
  recordingsReducer,
  {
    resetRecordingsState,
    getUserRecordingsById,
    handleDeleteRecording,
    postRecordingToS3AndDynamo,
    fetchRecordingsListForFeed,
  },
  initialState
);
