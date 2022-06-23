import { createStore } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';

const devTools = () => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools();
  }
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

const initStore = () => createStore(reducer, devTools());

export const wrapper = createWrapper(initStore);
