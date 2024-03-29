import {
  GET_DEVICES_REQUEST,
  GET_DEVICES_SUCCESS,
  GET_DEVICES_FAIL,
  UPDATE_DEVICES_REQUEST,
  UPDATE_DEVICES_SUCCESS,
  UPDATE_DEVICES_FAIL,
  REMOVE_DEVICES_REQUEST,
  REMOVE_DEVICES_SUCCESS,
  REMOVE_DEVICES_FAIL,
  INSERT_DEVICES_REQUEST,
  INSERT_DEVICES_SUCCESS,
  INSERT_DEVICES_FAIL,
} from '../slices/reducers/devices';

import axios from 'axios';
import { API_URL } from '../../config/dotEnvFile';

export const getDevices = async (store) => {
  try {
    store.dispatch({
      type: GET_DEVICES_REQUEST,
    });

    axios.get(`${API_URL}/devices`).then((response) => {
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

export const updateDevices = (store, id, meta) => {
  try {
    store.dispatch({
      type: UPDATE_DEVICES_REQUEST,
    });
    const deviceData = store.getState().entities?.devices?.devicesStyle;
    const newArr = deviceData.map((obj) => {
      if (obj._id === id) {
        return { ...obj, meta: meta };
      }
      return obj;
    });

    store.dispatch({
      type: UPDATE_DEVICES_SUCCESS,
      payload: { data: newArr },
    });
  } catch (error) {
    store.dispatch({
      type: UPDATE_DEVICES_FAIL,
      payload: error,
    });
  }
};

export const removeDevice = (store, data) => {
  try {
    store.dispatch({
      type: REMOVE_DEVICES_REQUEST,
    });

    const devicesStyle = store.getState().entities?.devices?.devicesStyle;
    const result = devicesStyle.filter((item) => item._id !== data);
    store.dispatch({
      type: REMOVE_DEVICES_SUCCESS,
      payload: { data: result },
    });
  } catch (error) {
    store.dispatch({
      type: REMOVE_DEVICES_FAIL,
      payload: error,
    });
  }
};

export const insertDevice = (store, data) => {
  try {
    store.dispatch({
      type: INSERT_DEVICES_REQUEST,
    });
    store.dispatch({
      type: INSERT_DEVICES_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    store.dispatch({
      type: INSERT_DEVICES_FAIL,
      payload: error,
    });
  }
};
