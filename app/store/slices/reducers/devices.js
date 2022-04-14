const devices = {
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    get_devices_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    get_devices_success: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesStyle: action.payload.data };
    },
    get_devices_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
    get_devices_reset: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesStyle: [], error: null };
    },

    update_devices_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    update_devices_success: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesStyle: action.payload.data };
    },
    update_devices_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
  },
};

export default devices;
export const GET_DEVICES_REQUEST = 'devices/get_devices_request';
export const GET_DEVICES_SUCCESS = 'devices/get_devices_success';
export const GET_DEVICES_FAIL = 'devices/get_devices_fail';
export const GET_DEVICES_RESET = 'devices/get_devices_reset';

export const UPDATE_DEVICES_REQUEST = 'devices/update_devices_request';
export const UPDATE_DEVICES_SUCCESS = 'devices/update_devices_success';
export const UPDATE_DEVICES_FAIL = 'devices/update_devices_data_fail';
