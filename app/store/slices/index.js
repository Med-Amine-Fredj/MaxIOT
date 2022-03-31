import { createSlice } from "@reduxjs/toolkit";
import * as slicesReducers from "./reducers";

const sliceCreator = (name, _createSlice, _slicesReducers = {}) => {
  const sliceReducers = _slicesReducers[name];

  return _createSlice({
    name: name,
    ...sliceReducers,
  });
};

export const createSlices = (slicesArray) => {
  return slicesArray.reduce((accumulator, sliceName) => {
    const elementSlice = sliceCreator(sliceName, createSlice, slicesReducers);
    accumulator[sliceName] = elementSlice;
    return accumulator;
  }, {});
};
