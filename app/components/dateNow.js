import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import color from '../config/colors';
import GreenDot from './GreenDot';
import RedDot from './RedDot';

let screenHeigth = Dimensions.get('window').height;

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
      <View style={styles.container}>
        <Text style={styles.txt}>{day} </Text>
        <Text style={styles.txt}>{month} </Text>
        <Text style={styles.txt}>{year}</Text>
      </View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.dotContainer}>
          <View style={{ justifyContent: 'center', marginLeft: '10%' }}>
            <Text>{realTime ? 'Synchronous Data' : 'Asynchronous Data'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <GreenDot visible={realTime} />
            <RedDot visible={!realTime} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '5%',
    // maxHeight: h * 0.7,
    flex: 1,
  },
  txt: {
    color: color.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  dotContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end',
    // marginLeft: '60%',
    backgroundColor: 'white',
    borderRadius: 15,
  },
});

export default date;
