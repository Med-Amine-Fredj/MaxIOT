import {
  GET_UISTYLING_REQUEST,
  GET_UISTYLING_SUCCESS,
  GET_UISTYLING_FAIL,
  INSERT_UISTYLING_FAIL,
  INSERT_UISTYLING_SUCCESS,
  INSERT_UISTYLING_REQUEST,
  REMOVE_UISTYLING_REQUEST,
  REMOVE_UISTYLING_SUCCESS,
  REMOVE_UISTYLING_FAIL,
  UPDATE_UISTYLING_REQUEST,
  UPDATE_UISTYLING_SUCCESS,
  UPDATE_UISTYLING_FAIL,
} from '../slices/reducers/uiStyling';

import { API_URL } from '@env';

import axios from 'axios';

export const getUiStyling = async (store) => {
  try {
    store.dispatch({
      type: GET_UISTYLING_REQUEST,
    });

    const { data } = await axios.get(`http://192.168.0.135:5000/api/uiStyling`);

    data &&
      store.dispatch({
        type: GET_UISTYLING_SUCCESS,
        payload: data,
      });
  } catch (error) {
    store.dispatch({
      type: GET_UISTYLING_FAIL,
      payload: error,
    });
  }
};

export const insertUiSyling = (store, data) => {
  try {
    store.dispatch({
      type: INSERT_UISTYLING_REQUEST,
    });
    store.dispatch({
      type: INSERT_UISTYLING_SUCCESS,
      payload: { data },
    });
  } catch (error) {
    store.dispatch({
      type: INSERT_UISTYLING_FAIL,
      payload: error,
    });
  }
};

export const removeUiStyling = (store, data) => {
  try {
    store.dispatch({
      type: REMOVE_UISTYLING_REQUEST,
    });

    const uiStyling = store.getState().entities?.uiStyling?.uiStylingData;
    const result = uiStyling.filter((item) => item._id !== data);

    store.dispatch({
      type: REMOVE_UISTYLING_SUCCESS,
      payload: { data: result },
    });
  } catch (error) {
    store.dispatch({
      type: REMOVE_UISTYLING_FAIL,
      payload: error,
    });
  }
};

export const updateUiStyling = (store, id, components) => {
  try {
    store.dispatch({
      type: UPDATE_UISTYLING_REQUEST,
    });

    const uiStyling = store.getState().entities?.uiStyling?.uiStylingData;
    const newArr = uiStyling.map((obj) => {
      if (obj._id === id) {
        return { ...obj, components: components };
      }
      return obj;
    });

    store.dispatch({
      type: UPDATE_UISTYLING_SUCCESS,
      payload: { data: newArr },
    });
  } catch (error) {
    store.dispatch({
      type: UPDATE_UISTYLING_FAIL,
      payload: error,
    });
  }
};
