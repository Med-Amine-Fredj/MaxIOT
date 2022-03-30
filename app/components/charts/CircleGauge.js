import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

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

  return (
    <>
      <View style={styles.container}>
        <View>
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
