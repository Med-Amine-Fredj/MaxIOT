import {
  GET_DEVICES_REQUEST,
  GET_DEVICES_SUCCESS,
  GET_DEVICES_FAIL,
} from '../slices/reducers/devices';

import axios from 'axios';

export const getDevicesData = async (store) => {
  try {
    store.dispatch({
      type: GET_DEVICES_REQUEST,
    });

    axios.get('http://192.168.1.77:5000/api/devices/').then((response) => {
      store.dispatch({
        type: GET_DEVICES_SUCCESS,
        payload: { data: response.data },
      });
    });
  } catch (error) {
    store.dispatch({
      type: GET_DEVICES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
