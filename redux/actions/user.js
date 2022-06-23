import axios from 'axios';
import { LOAD_USER_SUCCESS } from '../constants/userConstants';

export const loadUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/my-data');
  dispatch({
    type: LOAD_USER_SUCCESS,
    payload: data,
  });
};
