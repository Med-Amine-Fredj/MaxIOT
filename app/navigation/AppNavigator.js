import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ChartsDetailsScreen from '../Screens/ChartsDetailsScreen';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ChartsDetailsScreen"
        component={ChartsDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
