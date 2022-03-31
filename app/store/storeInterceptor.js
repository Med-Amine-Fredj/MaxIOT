let injectedStore;

export const injectStore = (_store) => {
  injectedStore = _store;
};
export const getInjectedStore = () => {
  return injectedStore?.store;
};

export const getCompleteStore = () => {
  return injectedStore;
};
