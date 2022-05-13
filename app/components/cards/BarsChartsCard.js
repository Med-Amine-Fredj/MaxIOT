import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native';
import colors from '../../config/colors';

import StackedBarsChart from '../charts/StackedBarsChart';
import MultiBarChart from '../charts/MultiBarChart';
import { SIMPLE_BAR, STACKED_BARS } from '../charts/AllChartsTypesConstants';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function BarsChartsCard({ chartObject, onPress, values, stackedNumber }) {
  return chartObject?.chartType === STACKED_BARS ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
        <View style={styles.chartContainer}>
          <StackedBarsChart
            dataArray={values || [0]}
            stackedNumber={stackedNumber}
            legendArray={chartObject?.meta?.legend}
            colorsArray={chartObject?.meta?.colors}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    chartObject?.chartType === SIMPLE_BAR && (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{chartObject?.name}</Text>
          </View>
          <View style={styles.chartContainer}>
            <MultiBarChart
              size="small"
              values={values || [0]}
              color={
                chartObject?.meta?.colors[chartObject?.meta?.colors.length - 1]
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: h * 0.015,
    paddingTop: '10%',
    overflow: 'hidden',
    height: h * 0.3,
    width: w * 0.89,
    marginHorizontal: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    minHeight: '90%',
    maxHeight: '90%',
  },
  titleContainer: {
    alignSelf: 'center',
    marginBottom: '3%',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BarsChartsCard;
