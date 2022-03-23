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

let d = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function BarsChartsCard({ chartObject, onPress }) {
  return chartObject.type === 'Stacked Bars' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
        <View style={styles.chartContainer}>
          <StackedBarsChart
            dataArray={chartObject.value}
            labelsArray={chartObject.labels}
            legendArray={chartObject.legend}
            colorsArray={chartObject.colors}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    chartObject.type === 'MultiBar Chart' && (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{chartObject.title}</Text>
          </View>
          <View style={styles.chartContainer}>
            <MultiBarChart
              size="small"
              values={chartObject.values}
              color={chartObject.color}
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
    width: d * 0.89,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1%',
  },
  chartContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: '80%',
    maxHeight: '80%',
  },
  titleContainer: {
    marginBottom: '10%',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BarsChartsCard;
