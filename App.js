import React, { useEffect, useState } from 'react';

import { LogBox, View } from 'react-native';
import * as Network from 'expo-network';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';

import { defaultStore } from './app/store';
import { Provider } from 'react-redux';
import { injectStore } from './app/store/storeInterceptor';
import { PersistGate } from 'redux-persist/integration/react';
import colors from './app/config/colors';

export default function App() {
  const appStore = defaultStore;
  const [online, setOnline] = useState();
  const onlineFunction = async () => {
    try {
      const { isConnected } = await Network.getNetworkStateAsync();
      setOnline(isConnected);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    onlineFunction();
    if (appStore) {
      injectStore(appStore);
    }
    console.log('online', online);
  }, [appStore, online]);

  return (
    <>
      <Provider store={appStore.store}>
        <PersistGate loading={null} persistor={appStore.persistor}>
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
            {!online && (
              <View
                style={{ backgroundColor: colors.light_red, height: 10 }}
              ></View>
            )}
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}
