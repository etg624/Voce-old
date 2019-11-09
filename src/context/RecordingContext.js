import createContext from './createContext';
import { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { listAudios } from '../graphql/queries';

import { postRecordingToDynamo, postRecordingToS3 } from './helpers/index';
const initialState = {
  playback: null,
  seconds: 0,
  isRecording: false,
  recording: null,
  recordings: [],
  loading: true
};

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config;

const recordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYBACK_SECONDS':
      return { ...state, seconds: action.seconds };
    case 'SET_LOADING':
      return { ...state, loading: action.bool };
    case 'SET_IS_RECORDING':
      return { ...state, isRecording: action.bool };
    case 'SET_RECORDING':
      return { ...state, recording: action.recording };
    case 'SET_PLAYBACK':
      return { ...state, playback: action.playback };
    case 'POST_RECORDING_TO_S3_AND_DYNAMO':
      return {
        ...state,
        recordings: [action.recording, ...state.recordings]
      };
    case 'FETCH_RECORDING_LIST':
      return {
        ...state,
        recordings: [...state.recordings, ...action.recordings]
      };
    default:
      return state;
  }
};

const updatePlaybackSeconds = dispatch => seconds =>
  dispatch({ type: 'UPDATE_PLAYBACK_SECONDS', seconds });

const setIsRecording = dispatch => bool =>
  dispatch({ type: 'SET_IS_RECORDING', bool });

const setRecording = dispatch => recording =>
  dispatch({ type: 'SET_RECORDING', recording });

const setPlayback = dispatch => playback =>
  dispatch({ type: 'SET_PLAYBACK', playback });
//this is to be used with other action creators that have dispatch attached to them
const setLoading = bool => ({ type: 'SET_LOADING', bool });

const postRecordingToS3AndDynamo = dispatch => {
  return async (title, recording) => {
    dispatch(setLoading(true));
    const { key, localUri, extension } = await postRecordingToS3(
      title,
      recording,
      'public'
    );
    console.log(recording);
    const audioDetails = {
      title,
      durationInMillis: recording._finalDurationMillis,
      file: {
        bucket,
        region,
        localUri,
        key,
        mimeType: `audio/x-${extension}`
      }
    };
    const { data } = await postRecordingToDynamo(audioDetails);
    console.log(data);
    dispatch({
      type: 'POST_RECORDING_TO_S3_AND_DYNAMO',
      recording: data.createAudio
    });
    dispatch(setLoading(false));
  };
};

const fetchRecordingsList = dispatch => {
  return async () => {
    try {
      const res = await API.graphql(graphqlOperation(listAudios));
      dispatch({
        type: 'FETCH_RECORDING_LIST',
        recordings: res.data.listAudios.items
      });
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
    }
  };
};

export const { Context, Provider } = createContext(
  recordingReducer,
  {
    setIsRecording,
    setRecording,
    setPlayback,
    postRecordingToS3AndDynamo,
    fetchRecordingsList,
    updatePlaybackSeconds
  },
  initialState
);
