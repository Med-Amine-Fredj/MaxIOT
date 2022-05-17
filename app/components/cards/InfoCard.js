import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native';

import colors from '../../config/colors';

let d = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function InfoCard({ number, message, chartObject }) {
  return (
    chartObject?.chartType === 'Simple_Data' && (
      <TouchableWithoutFeedback>
        <View style={styles.card}>
          <View style={styles.container}>
            <View style={styles.numberContainer}>
              <Text numberOfLines={1} style={styles.number}>
                {number[number?.length - 1]}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text numberOfLines={3} style={styles.txt}>
                {message}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: h * 0.015,
    overflow: 'hidden',
    height: h * 0.1,
    width: (d / 2) * 0.885,
    marginHorizontal: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  numberContainer: {
    maxWidth: '60%',
    marginLeft: '1%',
  },
  number: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
  },
  textContainer: {
    maxWidth: '30%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  txt: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default InfoCard;
