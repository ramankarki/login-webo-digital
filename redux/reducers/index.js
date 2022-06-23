import { combineReducers } from 'redux';

import { loadedUserReducer } from './userReducers';

const reducer = combineReducers({
  loadedUser: loadedUserReducer,
});

export default reducer;
