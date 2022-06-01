import React from 'react';
import Constants from 'expo-constants';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
} from 'react-native';

import Icon from './Icon';

import colors from '../config/colors';
import GreenDot from './GreenDot';
import RedDot from './RedDot';

let screenHeigth = Dimensions.get('window').height;

function Header({ onPress, title, realTime, onRealTimePress }) {
  return (
    <>
      <View style={styles.screen}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={onPress}>
            <View>
              <Icon iconName="left" iconColor={colors.primary} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={onRealTimePress}>
            <View
              style={{
                flex: 1,
              }}
            >
              <GreenDot visible={realTime} />
              <RedDot visible={!realTime} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: screenHeigth * 0.06,
    // marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  titleContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Header;
