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

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function ChartsCard({ chartObject, onPress }) {
  return chartObject.type === 'Incompleted Gauge' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <IncompletedGauge
            value={chartObject.value}
            min={chartObject.min}
            max={chartObject.max}
            warning={chartObject.warning}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject.type === 'Bezier Line Chart' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <BezierLineChart dataArray={chartObject.value} size="small" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject.type === 'Completed Gauge' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <CircleGauge
            value={chartObject.value}
            min={chartObject.min}
            max={chartObject.max}
            warning={chartObject.warning}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject.type === 'Simple Line Chart' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <SimpleLineChart dataArray={chartObject.value} size="small" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : chartObject.type === 'Progress Ring' ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.chartContainer}>
          <ProgressRing
            dataArray={chartObject.value}
            dataColors={chartObject.dataColors}
            dataLegend={chartObject.legend}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{chartObject.title}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    chartObject.type === 'Pie Chart' && (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <SimplePieCharts
              size="small"
              names={chartObject.names}
              values={chartObject.values}
              colors={chartObject.colors}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{chartObject.title}</Text>
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
    width: (w / 2) * 0.88,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
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

export default ChartsCard;
