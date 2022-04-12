import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View, StatusBar, Text } from 'react-native';
import color from '../config/colors';

function Screen({ children, style }) {
  return (
    <>
      <SafeAreaView style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: color.backGround,
    // paddingTop: Constants.statusBarHeight + 20,
    marginLeft: '5%',
    marginRight: '5%',
    flex: 1,
    marginBottom: '3%',
  },
  view: {
    flex: 1,
  },
});

export default Screen;
