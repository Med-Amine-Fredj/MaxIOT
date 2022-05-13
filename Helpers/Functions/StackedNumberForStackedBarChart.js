export const stackedNumberCalculator = (store, id) => {
  const deviceData = store.getState().entities?.devicesData?.devicesData;
  const stackedNumber = deviceData?.filter((n) => n?.deviceId === id)[0]
    ?.numberStackedValues;
  return stackedNumber;
};
