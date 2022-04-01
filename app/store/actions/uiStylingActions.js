import {
  GET_UISTYLING_REQUEST,
  GET_UISTYLING_SUCCESS,
  GET_UISTYLING_FAIL,
} from '../slices/reducers/uiStyling';

import axios from 'axios';

export const getUiStyling = async (store) => {
  try {
    store.dispatch({
      type: GET_UISTYLING_REQUEST,
    });

    const { data } = await axios.get('http://192.168.1.77:5000/api/uiStyling/');

    data &&
      store.dispatch({
        type: GET_UISTYLING_SUCCESS,
        payload: data,
      });
  } catch (error) {
    store.dispatch({
      type: GET_UISTYLING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
