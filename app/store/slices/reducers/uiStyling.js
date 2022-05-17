const uiStyling = {
  initialState: {
    uiStylingData: [],
    loading: false,
    error: null,
  },
  reducers: {
    get_uistyling_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    get_uistyling_success: (dataSet, action) => {
      return { ...dataSet, loading: false, uiStylingData: action.payload };
    },
    get_uistyling_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
    get_uistyling_reset: (dataSet, action) => {
      return { ...dataSet, loading: false, uiStylingData: [], error: null };
    },

    insert_uiStyling_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    insert_uiStyling_success: (dataSet, action) => {
      dataSet.uiStylingData.push(action.payload.data);
      dataSet.loading = false;
    },
    insert_uiStyling_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },

    remove_uiStyling_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    remove_uiStyling_success: (dataSet, action) => {
      return { ...dataSet, loading: false, uiStylingData: action.payload.data };
    },
    remove_uiStyling_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },

    update_uiStyling_request: (dataSet, action) => {
      return { ...dataSet, loading: true };
    },
    update_uiStyling_success: (dataSet, action) => {
      return { ...dataSet, loading: false, uiStylingData: action.payload.data };
    },
    update_uiStyling_fail: (dataSet, action) => {
      return { ...dataSet, loading: false, error: action.payload };
    },
  },
};

export default uiStyling;

export const GET_UISTYLING_REQUEST = 'uiStyling/get_uistyling_request';
export const GET_UISTYLING_SUCCESS = 'uiStyling/get_uistyling_success';
export const GET_UISTYLING_FAIL = 'uiStyling/get_uistyling_fail';
export const GET_UISTYLING_RESET = 'uiStyling/get_uistyling_reset';

export const INSERT_UISTYLING_REQUEST = 'uiStyling/insert_uiStyling_request';
export const INSERT_UISTYLING_SUCCESS = 'uiStyling/insert_uiStyling_success';
export const INSERT_UISTYLING_FAIL = 'uiStyling/insert_uiStyling_fail';

export const REMOVE_UISTYLING_REQUEST = 'uiStyling/remove_uiStyling_request';
export const REMOVE_UISTYLING_SUCCESS = 'uiStyling/remove_uiStyling_success';
export const REMOVE_UISTYLING_FAIL = 'uiStyling/remove_uiStyling_fail';

export const UPDATE_UISTYLING_REQUEST = 'uiStyling/update_uiStyling_request';
export const UPDATE_UISTYLING_SUCCESS = 'uiStyling/update_uiStyling_success';
export const UPDATE_UISTYLING_FAIL = 'uiStyling/update_uiStyling_fail';
