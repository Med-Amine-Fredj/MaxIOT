export const filterDeviceById = (store, deviceId) => {
  const devices = store.getState().entities?.devices?.devicesStyle;

  const dataFiltred = devices?.filter((n) => n?._id === deviceId);
  return dataFiltred;
};
