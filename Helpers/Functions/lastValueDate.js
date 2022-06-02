export const lastValueDate = (store, id) => {
  const deviceData = store.getState().entities?.devicesData?.devicesData;

  let date = deviceData?.filter((n) => n?.deviceId === id)[0]?.updatedAt;
  return date;
};
