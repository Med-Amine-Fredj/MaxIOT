import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native';

import colors from '../../config/colors';

import IncompletedGauge from '../charts/IncompletedGauge';
import BezierLineChart from '../charts/BezierLineChart';
import CircleGauge from '../charts/CircleGauge';
import SimpleLineChart from '../charts/SimpleLineChart';
import ProgressRing from '../charts/ProgressRing';
import SimplePieCharts from '../charts/SimplePieCharts';

import {
  BEZIER_LINE,
  COMPLETED_GAUGE,
  INCOMPLETED_GAUGE,
  PIE,
  PROGRESS_RING,
  SIMPLE_LINE,
} from '../charts/AllChartsTypesConstants';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function ChartsCard({ chartObject, onPress, values }) {
  return chartObject?.chartType === INCOMPLETED_GAUGE ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <IncompletedGauge
            value={values[values?.length - 1] || 0}
            min={chartObject?.meta?.min[chartObject?.meta?.min?.length - 1]}
            max={chartObject?.meta?.max[chartObject?.meta?.max?.length - 1]}
            warning={
              chartObject?.meta?.warning[chartObject?.meta?.warning?.length - 1]
            }
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject?.chartType === BEZIER_LINE ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <BezierLineChart dataArray={values || 0} size="small" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject?.chartType === COMPLETED_GAUGE ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <CircleGauge
            value={values[values?.length - 1] || 0}
            min={chartObject?.meta?.min[chartObject?.meta?.min?.length - 1]}
            max={chartObject?.meta?.max[chartObject?.meta?.max?.length - 1]}
            warning={
              chartObject?.meta?.warning[chartObject?.meta?.warning?.length - 1]
            }
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject?.chartType === SIMPLE_LINE ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <SimpleLineChart dataArray={values || [0]} size="small" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject?.chartType === PROGRESS_RING ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <ProgressRing
            dataArray={values || 0}
            dataColors={chartObject?.meta?.colors}
            dataLegend={chartObject?.meta?.legend}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject?.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    chartObject?.chartType === PIE && (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            {values?.length == chartObject?.meta?.names?.length ? (
              <SimplePieCharts
                size="small"
                names={chartObject?.meta?.names}
                values={values}
                colors={chartObject?.meta?.colors}
              />
            ) : (
              <>
                <Text>Chart Type : {chartObject?.chartType}</Text>
                <Text>No Data Found !</Text>
              </>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{chartObject?.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: h * 0.015,
    paddingTop: '10%',
    overflow: 'hidden',
    height: h * 0.3,
    width: (w / 2) * 0.88,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    minHeight: '80%',
    maxHeight: '80%',
  },
  titleContainer: {
    marginTop: '10%',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ChartsCard;
