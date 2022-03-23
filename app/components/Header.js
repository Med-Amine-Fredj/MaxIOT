import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';

import Icon from './Icon';

function Header({ onPress, title }) {
  return (
    <>
      <View style={styles.screen}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.iconContainer}>
            <Icon iconName="left" iconColor="#6E53A2" />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 45,
    // marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  titleContainer: {
    alignSelf: 'center',
    flex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
