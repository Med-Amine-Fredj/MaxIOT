export const chartValuesCalculator = (store, id) => {
  const deviceData = store.getState().entities?.devicesData?.devicesData;
  let arr = [];
  deviceData
    ?.filter((n) => n?.deviceId === id)[0]
    ?.values.forEach((element) => {
      arr = [...arr, element.value];
    });
  return arr;
};
