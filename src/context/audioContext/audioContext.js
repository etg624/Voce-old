import createContext from '../createContext';

const initialState = {
  playback: { sound: null, seconds: 0, key: '' },
  seconds: 0,
  isRecording: false,
  recording: null,
  loading: true,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYBACK_SECONDS':
      return {
        ...state,
        playback: {
          ...state.playback,
          seconds: action.key === state.playback.key ? action.seconds : 0,
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.bool };
    case 'SET_IS_RECORDING':
      return { ...state, isRecording: action.bool };
    case 'SET_RECORDING':
      return { ...state, recording: action.recording };
    case 'SET_CURRENT_PLAYBACK':
      return {
        ...state,
        playback: { ...state.playback, sound: action.sound, key: action.key },
      };
    default:
      return state;
  }
};

const updatePlaybackSeconds = dispatch => (key, seconds) =>
  dispatch({ type: 'UPDATE_PLAYBACK_SECONDS', seconds, key });

const setIsRecording = dispatch => bool => dispatch({ type: 'SET_IS_RECORDING', bool });

const setRecording = dispatch => recording => dispatch({ type: 'SET_RECORDING', recording });

const setCurrentPlayback = dispatch => (sound, key) =>
  dispatch({ type: 'SET_CURRENT_PLAYBACK', sound, key });

export const { Context, Provider } = createContext(
  audioReducer,
  {
    setIsRecording,
    setRecording,
    setCurrentPlayback,
    updatePlaybackSeconds,
  },
  initialState
);
