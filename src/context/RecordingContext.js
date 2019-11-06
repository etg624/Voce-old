import createContext from './createContext';
import { API, graphqlOperation } from 'aws-amplify';

import { listAudios } from '../graphql/queries';
import { createAudio } from '../graphql/mutations';
const initialState = {
  playback: null,
  isRecording: false,
  recording: null,
  recordings: []
};

const recordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IS_RECORDING':
      return { ...state, isRecording: action.trueOrFalse };
    case 'SET_RECORDING':
      return { ...state, recording: action.recording };
    case 'SET_PLAYBACK':
      return { ...state, playback: action.playback };
    case 'POST_RECORDING':
      return { ...state, recordings: [action.recording, ...state.recordings] };
    case 'FETCH_RECORDING_LIST':
      return {
        ...state,
        recordings: [...state.recordings, ...action.recordings]
      };
    default:
      return state;
  }
};

const setIsRecording = dispatch => {
  return trueOrFalse => dispatch({ type: 'SET_IS_RECORDING', trueOrFalse });
};

const setRecording = dispatch => {
  return recording => dispatch({ type: 'SET_RECORDING', recording });
};
const setPlayback = dispatch => {
  return playback => dispatch({ type: 'SET_PLAYBACK', playback });
};
const postRecording = dispatch => {
  return async audioDetails => {
    const newAudio = await API.graphql(
      graphqlOperation(createAudio, { input: audioDetails })
    );
    return dispatch({
      type: 'POST_RECORDING',
      recording: newAudio.data.createAudio
    });
  };
};

const fetchRecordingsList = dispatch => {
  return async () => {
    const res = await API.graphql(graphqlOperation(listAudios));

    return dispatch({
      type: 'FETCH_RECORDING_LIST',
      recordings: res.data.listAudios.items
    });
  };
};

export const { Context, Provider } = createContext(
  recordingReducer,
  {
    setIsRecording,
    setRecording,
    setPlayback,
    postRecording,
    fetchRecordingsList
  },
  initialState
);
