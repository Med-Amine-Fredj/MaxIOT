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

import { useSelector } from 'react-redux';

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

export const updateDevicesData = (store, id, values, deviceData) => {
  try {
    store.dispatch({
      type: UPDATE_DEVICES_DATA_REQUEST,
    });

    const newArr = deviceData.map((obj) => {
      if (obj._id === id) {
        return { ...obj, values: values };
      }
      return obj;
    });

    store.dispatch({
      type: UPDATE_DEVICES_DATA_SUCCESS,
      payload: { data: newArr },
    });
  } catch (error) {
    store.dispatch({
      type: UPDATE_DEVICES_DATA_FAIL,
      payload: error,
    });
  }
};

export const removeDevicesData = (store, id, deviceData) => {
  try {
    store.dispatch({
      type: REMOVE_DEVICES_DATA_REQUEST,
    });

    const filteredData = deviceData.filter((item) => item._id !== id);

    store.dispatch({
      type: REMOVE_DEVICES_DATA_SUCCESS,
      payload: { data: filteredData },
    });
  } catch (error) {
    store.dispatch({
      type: REMOVE_DEVICES_DATA_FAIL,
      payload: error,
    });
  }
};
