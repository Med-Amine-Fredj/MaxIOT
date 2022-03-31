import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createSlices } from "./slices";
import getMiddlewaresArray from "./middlewares";
import {
  createTransform,
  createMigrate,
  persistStore,
  persistReducer,
} from "redux-persist";
import { migrations } from "./migrations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { noPersistedSlices, slicesArray } from "./defaultStoreData";
import omit from "lodash/omit";
import initSubscriber from "redux-subscriber";

const MIGRATION_DEBUG = false;
const ENABLE_PERSIST = true;

const createSlicesReducers = (slices, _combineReducers) => {
  let slicesReducers = {};
  Object.keys(slices).map((slice) => {
    slicesReducers[slices[slice].name] = slices[slice].reducer;
  });
  return _combineReducers(slicesReducers);
};

const createReducer = (slices, _combineReducers) => {
  const entitiesReducer = createSlicesReducers(slices, _combineReducers);
  return _combineReducers({
    entities: entitiesReducer,
  });
};
const configureImxStore = ({
  slices,
  reducer,
  _configureStore,
  _persistReducer,
  _persistStore,
  _storage,
  _getMiddlewaresArray,
}) => {
  const blacklistTransform = createTransform((inboundState, key) => {
    if (key === "entities") {
      return omit(inboundState, noPersistedSlices);
    } else {
      return { ...inboundState };
    }
  });
  const persistConfig = {
    key: "entities",
    storage: _storage,
    transforms: [blacklistTransform],
    version: 0,
    migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
  };
  const persistedReducer = ENABLE_PERSIST
    ? _persistReducer(persistConfig, reducer)
    : reducer;
  let store = _configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(_getMiddlewaresArray(slices)),
  });

  let persistor = ENABLE_PERSIST ? _persistStore(store) : null;
  initSubscriber(store);

  return { persistor, store };
};

const createStore = () => {
  const appsSlices = createSlices(slicesArray);
  const reducer = createReducer(appsSlices, combineReducers);
  const slices = appsSlices;
  const storeConfig = {
    slicesArray: slicesArray,
    slices,
    reducer: reducer,
    _configureStore: configureStore,
    _persistStore: persistStore,
    _storage: AsyncStorage,
    _persistReducer: persistReducer,
    _getMiddlewaresArray: getMiddlewaresArray,
  };
  const { store, persistor } = configureImxStore(storeConfig);
  store.slices = slices;
  store.persistor = persistor;
  return { slices, store, persistor };
};

export const defaultStore = createStore();
