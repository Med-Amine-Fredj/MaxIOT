import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import color from '../config/colors';
import GreenDot from './GreenDot';
import RedDot from './RedDot';

let h = Dimensions.get('window').height;

function date({ onPress, realTime }) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    let d = new Date();
    setDay(d.getDate());
    setMonth(months[d.getMonth()]);
    setYear(d.getFullYear());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{day} </Text>
      <Text style={styles.txt}>{month} </Text>
      <Text style={styles.txt}>{year}</Text>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flex: 1 }}>
          <GreenDot visible={realTime} />
          <RedDot visible={!realTime} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '5%',
    maxHeight: h * 0.7,
    flex: 1,
  },
  txt: {
    color: color.primary,
    fontSize: 20,
    fontWeight: '700',
  },
});

export default date;
