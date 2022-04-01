import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Header from '../components/Header';

import ListItemSeparator from '../components/ListItemSeparator';

import ChartDetailsCard from '../components/cards/ChartDetailsCard';

import colors from '../config/colors';

import IncompletedGauge from '../components/charts/IncompletedGauge';
import BezierLineChart from '../components/charts/BezierLineChart';
import CircleGauge from '../components/charts/CircleGauge';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import ProgressRing from '../components/charts/ProgressRing';
import StackedBarsChart from '../components/charts/StackedBarsChart';
import SimplePieCharts from '../components/charts/SimplePieCharts';
import MultiBarChart from '../components/charts/MultiBarChart';

import dataDetails from '../mockData/dataDetails';

import {
  BEZIER_LINE,
  COMPLETED_GAUGE,
  INCOMPLETED_GAUGE,
  PIE,
  PROGRESS_RING,
  SIMPLE_BAR,
  SIMPLE_LINE,
  STACKED_BARS,
} from '../components/charts/AllChartsTypesConstants';

import ActivityIndicator from '../components/ActivityIndicator';

function ChartsDetailsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };
  const item = route.params.item;

  return (
    <>
      <ActivityIndicator visible={route.params.item.length === 0} />
      <StatusBar backgroundColor="#6E53A2" />

      <Header onPress={() => navigation.goBack()} title={item?.name} />
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          {item?.chartType === SIMPLE_LINE && (
            <>
              <SimpleLineChart dataArray={item?.meta?.values} size="large" />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.values[item?.meta?.values.length - 1]}
                </Text>
              </View>
            </>
          )}

          {item?.chartType === BEZIER_LINE && (
            <>
              <BezierLineChart dataArray={item?.meta?.values} size="large" />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.values[item?.meta?.values.length - 1]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === INCOMPLETED_GAUGE && (
            <>
              <IncompletedGauge
                value={item?.meta?.values[item?.meta?.values.length - 1]}
                min={item?.meta?.min[item?.meta?.min.length - 1]}
                max={item?.meta?.max[item?.meta?.max.length - 1]}
                warning={item?.meta?.warning[item?.meta?.warning.length - 1]}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Min : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.min[item?.meta?.min.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Warning : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.warning[item?.meta?.warning.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Max : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.max[item?.meta?.max.length - 1]}%
                </Text>
              </View>
            </>
          )}
          {item?.chartType == COMPLETED_GAUGE && (
            <>
              <CircleGauge
                value={item?.meta?.values[item?.meta?.values.length - 1]}
                min={item?.meta?.min[item?.meta?.min.length - 1]}
                max={item?.meta?.max[item?.meta?.max.length - 1]}
                warning={item?.meta?.warning[item?.meta?.warning.length - 1]}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Min : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.min[item?.meta?.min.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Warning : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.warning[item?.meta?.warning.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Max : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.max[item?.meta?.max.length - 1]}%
                </Text>
              </View>
            </>
          )}
          {item?.chartType === SIMPLE_BAR && (
            <View style={{ alignSelf: 'center', marginBottom: '10%' }}>
              <MultiBarChart
                size="large"
                values={item?.meta?.values}
                color={item?.meta?.colors[item?.meta?.colors.length - 1]}
              />
            </View>
          )}
          {item?.chartType === STACKED_BARS && (
            <View style={{ marginLeft: 50 }}>
              <StackedBarsChart
                size="large"
                dataArray={item?.meta?.values}
                legendArray={item?.meta?.legend}
                colorsArray={item?.meta?.colors}
              />
            </View>
          )}
          {item?.chartType === PIE && (
            <View style={{ alignSelf: 'center', marginBottom: '10%' }}>
              <SimplePieCharts
                size="large"
                names={item?.meta?.names}
                values={item?.meta?.values}
                colors={item?.meta?.colors}
              />
            </View>
          )}
          {item?.chartType === PROGRESS_RING && (
            <ProgressRing
              size="large"
              dataArray={item?.meta?.values}
              dataColors={item?.meta?.colors}
              dataLegend={item?.meta?.legend}
            />
          )}
        </View>
        <SafeAreaView style={{ flex: 2, backgroundColor: 'white' }}>
          <ListItemSeparator />
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={dataDetails}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => <ChartDetailsCard item={item} />}
          />
        </SafeAreaView>
      </View>
      <StatusBar backgroundColor="#6E53A2" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  chartContainer: {
    marginTop: '10%',
  },
  lineChartTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '2%',
  },
  lineChartTextTitle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 13,
    margin: 5,
  },
  lineChartText: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ChartsDetailsScreen;
