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
  },
};

export default uiStyling;
export const GET_UISTYLING_REQUEST = 'uiStyling/get_uistyling_request';
export const GET_UISTYLING_SUCCESS = 'uiStyling/get_uistyling_success';
export const GET_UISTYLING_FAIL = 'uiStyling/get_uistyling_fail';
export const GET_UISTYLING_RESET = 'uiStyling/get_uistyling_reset';
