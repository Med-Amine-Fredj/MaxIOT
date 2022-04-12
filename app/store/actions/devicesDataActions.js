import axios from 'axios';

import { API_URL } from '@env';
import {
  GET_DEVICES_DATA_FAIL,
  GET_DEVICES_DATA_REQUEST,
  GET_DEVICES_DATA_SUCCESS,
} from '../slices/reducers/devicesData';

export const getDevicesData = async (store) => {
  try {
    store.dispatch({
      type: GET_DEVICES_DATA_REQUEST,
    });

    axios.get(`http://192.168.1.93:5000/api/sensors/`).then((response) => {
      store.dispatch({
        type: GET_DEVICES_DATA_SUCCESS,
        payload: { data: response.data },
      });
    });
  } catch (error) {
    store.dispatch({
      type: GET_DEVICES_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
