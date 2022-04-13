const devicesData = {
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    get_devices_data_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    get_devices_data_success: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesData: action.payload.data };
    },
    get_devices_data_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
    get_devices_data_reset: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesData: [], error: null };
    },

    update_devices_data_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    update_devices_data_success: (dataSet, action) => {
      return { ...dataSet, loading: false, devicesData: action.payload.data };
    },
    update_devices_data_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
  },
};

export default devicesData;
export const GET_DEVICES_DATA_REQUEST = 'devicesData/get_devices_data_request';
export const GET_DEVICES_DATA_SUCCESS = 'devicesData/get_devices_data_success';
export const GET_DEVICES_DATA_FAIL = 'devicesData/get_devices_data_fail';
export const GET_DEVICES_DATA_RESET = 'devicesData/get_devices_data_reset';

export const UPDATE_DEVICES_DATA_REQUEST =
  'devicesData/update_devices_data_request';
export const UPDATE_DEVICES_DATA_SUCCESS =
  'devicesData/update_devices_data_success';
export const UPDATE_DEVICES_DATA_FAIL = 'devicesData/update_devices_data_fail';
