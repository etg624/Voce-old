import createContext from './createContext';
import { API, graphqlOperation } from 'aws-amplify';

import { listAudios } from '../graphql/queries';
import { createAudio } from '../graphql/mutations';
const initialState = {
  playback: null,
  isRecording: false,
  recording: null,
  recordings: [],
  loading: true
};

const recordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.bool };
    case 'SET_IS_RECORDING':
      return { ...state, isRecording: action.bool };
    case 'SET_RECORDING':
      return { ...state, recording: action.recording };
    case 'SET_PLAYBACK':
      return { ...state, playback: action.playback };
    case 'POST_RECORDING':
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

const setIsRecording = dispatch => bool =>
  dispatch({ type: 'SET_IS_RECORDING', bool });

const setRecording = dispatch => recording =>
  dispatch({ type: 'SET_RECORDING', recording });

const setPlayback = dispatch => playback =>
  dispatch({ type: 'SET_PLAYBACK', playback });

//this is to be used with other action creators that have dispatch attached to them
const setLoading = bool => ({ type: 'SET_LOADING', bool });

const postRecording = dispatch => {
  return async audioDetails => {
    const newAudio = await API.graphql(
      graphqlOperation(createAudio, { input: audioDetails })
    );
    dispatch({
      type: 'POST_RECORDING',
      recording: newAudio.data.createAudio
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
    postRecording,
    fetchRecordingsList
  },
  initialState
);
