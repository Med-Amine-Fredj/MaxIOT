import axios from 'axios';

import { API_URL } from '@env';
import {
  GET_DEVICES_DATA_REQUEST,
  GET_DEVICES_DATA_SUCCESS,
  GET_DEVICES_DATA_FAIL,
  UPDATE_DEVICES_DATA_REQUEST,
  UPDATE_DEVICES_DATA_SUCCESS,
  UPDATE_DEVICES_DATA_FAIL,
  REMOVE_DEVICES_DATA_REQUEST,
  REMOVE_DEVICES_DATA_SUCCESS,
  REMOVE_DEVICES_DATA_FAIL,
} from '../slices/reducers/devicesData';

export const getDevicesData = async (store) => {
  try {
    store.dispatch({
      type: GET_DEVICES_DATA_REQUEST,
    });

    axios.get(`http://192.168.1.32:5000/api/sensors/`).then((response) => {
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

export const updateDevicesData = (store, id, value) => {
  try {
    store.dispatch({
      type: UPDATE_DEVICES_DATA_REQUEST,
    });
    const deviceData = store.getState().entities?.devicesData?.devicesData;
    const deviceById = deviceData.filter(
      (item) => item._id === id.toString()
    )[0];
    const deviceByIdModified = {
      ...deviceById,
      values: [...deviceById?.values, value],
    };

    const devices = deviceData?.filter((item) => item._id !== id);
    store.dispatch({
      type: UPDATE_DEVICES_DATA_SUCCESS,
      payload: { data: [...devices, deviceByIdModified] },
    });
  } catch (error) {
    store.dispatch({
      type: UPDATE_DEVICES_DATA_FAIL,
      payload: error,
    });
  }
};

export const removeDeviceData = (store, data) => {
  try {
    store.dispatch({
      type: REMOVE_DEVICES_DATA_REQUEST,
    });

    store.dispatch({
      type: REMOVE_DEVICES_DATA_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    store.dispatch({
      type: REMOVE_DEVICES_DATA_FAIL,
      payload: error,
    });
  }
};
