import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import * as Battery from 'expo-battery';
import React, { useEffect, useState } from 'react';
// import Screen from './app/components/Screen';
// import HomeScreen from './app/Screens/HomeScreen';
import color from './app/config/colors';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import Header from './app/components/Header';
import Screen from './app/components/Screen';
import { io } from 'socket.io-client';
import axios from 'axios';

export default function App() {
  const [response, setResponse] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const socket = io('http://192.168.1.77:5000/');

    socket.on('FromAPI', (data) => {
      // setResponse(data);
      console.log('Operation on collection : ', data);
    });

    socket.on('connect', () => {
      console.log('Connected wih Id : ', socket.id);
    });

    return () => socket.disconnect();
  }, []);

  // Battery.getBatteryLevelAsync()
  //   .then((response) => setBatteryLevel(response * 100))
  //   .catch((err) => console.log(err));
  // useEffect(async () => {
  //   Battery.getBatteryLevelAsync()
  //     .then((response) => setBatteryLevel(response * 100))
  //     .catch((err) => console.log(err));
  //   console.log(batteryLevel);
  // }, [batteryLevel]);

  // React.useEffect(() => {
  //   (async () => {
  //     const [batteryLevel] = await Promise.all([
  //       Battery.getBatteryLevelAsync(),
  //     ]);

  //     setBatteryLevel(batteryLevel * 100);
  //   })();
  //   const batteryLevelListener = Battery.addBatteryLevelListener(
  //     ({ batteryLevel }) => {
  //       console.log('batteryLevel ===', batteryLevel);
  //       setBatteryLevel(batteryLevel * 100);
  //     }
  //   );

  //   return () => {
  //     batteryLevelListener && batteryLevelListener.remove();
  //   };
  // }, []);

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
        <StatusBar backgroundColor="#6E53A2" />
        <StatusBar backgroundColor="#6E53A2" />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backGround,
  },
});
