import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../config/colors';
import NoDataFound from '../NoDataFound';
import { schedulePushNotification } from '../../../Helpers/notification';

export default function CircleGauge({ value, min, max, warning, size }) {
  var levelStyle = StyleSheet.flatten([
    styles.txt,
    {
      fontSize: size == 'large' ? 50 : 35,
      color:
        value <= min || value >= max
          ? colors.dark_red
          : value == warning
          ? colors.dark_warning
          : colors.light_green,
    },
  ]);

  var messageStyle = StyleSheet.flatten([
    styles.message,
    {
      color:
        value <= min || value >= max
          ? colors.dark_red
          : value == warning
          ? colors.dark_warning
          : colors.light_green,
    },
  ]);

  var percentStyle = StyleSheet.flatten([
    styles.percent,
    {
      color:
        value <= min || value >= max
          ? colors.dark_red
          : value == warning
          ? colors.dark_warning
          : colors.light_green,
    },
  ]);

  // const sendNotif = async (title, body) => {
  //   await schedulePushNotification(title, body);
  // };
  // if (value == warning) {
  //   sendNotif('Warning at the circle gauge', 'value is now in warning zone');
  // } else if (value <= min) {
  //   sendNotif('Warning at the circle gauge', 'value is below the minimum');
  // } else if (value >= max) {
  //   sendNotif('Warning at the circle gauge', 'value is over the maximum');
  // }

  return (
    <>
      {value === 0 ? (
        <View style={{ flex: 1 }}>
          <NoDataFound visible={true} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ minHeight: '10%' }}>
            {value == warning && (
              <View style={styles.messageContainer}>
                <AntDesign
                  name="warning"
                  size={size == 'large' ? 30 : 25}
                  color={colors.dark_warning}
                />
                {size == 'large' && <Text style={messageStyle}>Warning</Text>}
              </View>
            )}
            {(value >= max || value <= min) && (
              <View style={styles.messageContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={size == 'large' ? 30 : 25}
                  color={colors.dark_red}
                />
                {size == 'large' && <Text style={messageStyle}>Error</Text>}
              </View>
            )}
          </View>
          <View style={{ alignSelf: 'center' }}>
            <AnimatedCircularProgress
              size={size == 'large' ? 180 : 110}
              width={6}
              fill={Math.abs(value)}
              backgroundWidth={1}
              tintColor={
                value <= min || value >= max
                  ? colors.light_red
                  : value == warning
                  ? colors.dark_warning
                  : colors.light_green
              }
              tintTransparency={false}
              backgroundColor={
                value <= min || value >= max
                  ? '#FFDCDC'
                  : value == warning
                  ? '#FFF0D7'
                  : '#EBFFFF'
              }
              lineCap="round"
              duration={1000}
              rotation={value < 0 ? (360 * value) / 100 : 0}
              childrenContainerStyle={{
                shadowColor:
                  value <= min || value >= max
                    ? colors.dark_red
                    : value == warning
                    ? colors.dark_warning
                    : colors.light_green,
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 20,
                backgroundColor: 'white',
              }}
            >
              {(fill) => (
                <>
                  <View style={styles.valueContainer}>
                    <Text style={levelStyle}>{Math.round(value)}</Text>
                    <Text style={percentStyle}>%</Text>
                  </View>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  valueContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  message: {
    fontSize: 14,
    marginTop: 3,
    marginLeft: 3,
  },
  percent: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '10%',
  },
});
