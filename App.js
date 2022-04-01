import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';

import color from './app/config/colors';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';

import { defaultStore } from './app/store';
import { Provider } from 'react-redux';
import { injectStore } from './app/store/storeInterceptor';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const appStore = defaultStore;

  useEffect(() => {
    if (appStore) {
      injectStore(appStore);
    }
  }, [appStore]);

  return (
    <>
      <Provider store={appStore.store}>
        <PersistGate loading={null} persistor={appStore.persistor}>
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backGround,
  },
});
