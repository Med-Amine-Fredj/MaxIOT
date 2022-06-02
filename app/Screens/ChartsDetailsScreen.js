import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

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
import { useSelector, useStore } from 'react-redux';
import { stackedNumberCalculator } from '../../Helpers/Functions/StackedNumberForStackedBarChart';
import { chartValuesCalculator } from '../../Helpers/Functions/chartsDataCalculator';
import SelectedDropdown from '../components/SelectedDropdown';
import { lastValueDate } from '../../Helpers/Functions/lastValueDate';
import { filterDeviceById } from '../../Helpers/Functions/filterDeviceById';

function ChartsDetailsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };

  const id = route.params.id;

  const realTime = route.params.realTime;

  const [item, setItem] = useState({});

  const [realTim, setReal] = useState(realTime);

  const deviceStyle = useSelector(
    (state) => state?.entities?.devices?.devicesStyle
  );

  const deviceData = useSelector(
    (state) => realTim && state?.entities?.devicesData?.devicesData
  );
  const [selectedFilter, setSelectedFilter] = useState();

  useEffect(() => {
    setItem(deviceStyle?.filter((n) => n?._id === id)[0]);
    console.log('Selected Filter =========', selectedFilter);
  }, [selectedFilter]);

  return (
    <>
      <ActivityIndicator visible={!id} />
      <Header
        realTime={realTim}
        onPress={() => navigation.goBack()}
        onRealTimePress={() => setReal(!realTim)}
        title={item?.name}
      />

      <View style={styles.container}>
        <View
          style={{ alignItems: 'flex-end', marginTop: 3, marginRight: '2%' }}
        >
          <SelectedDropdown
            data={deviceStyle?.filter((n) => n?._id === id)[0]?.chartType}
            realTime={realTim}
            onSelect={(selectedItem) => {
              setSelectedFilter(selectedItem);
            }}
          />
        </View>
        <View style={styles.chartContainer}>
          {item?.chartType === SIMPLE_LINE && (
            <>
              <SimpleLineChart
                dataArray={chartValuesCalculator(store, item._id) || [0]}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {
                    chartValuesCalculator(store, item._id)[
                      chartValuesCalculator(store, item._id)?.length - 1
                    ]
                  }
                </Text>
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}

          {item?.chartType === BEZIER_LINE && (
            <>
              <BezierLineChart
                dataArray={chartValuesCalculator(store, item._id)}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {
                    chartValuesCalculator(store, item._id)[
                      chartValuesCalculator(store, item._id)?.length - 1
                    ]
                  }
                </Text>
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === INCOMPLETED_GAUGE && (
            <>
              <IncompletedGauge
                value={
                  chartValuesCalculator(store, item._id)[
                    chartValuesCalculator(store, item._id)?.length - 1
                  ]
                }
                min={item?.meta?.min[item?.meta?.min?.length - 1]}
                max={item?.meta?.max[item?.meta?.max?.length - 1]}
                warning={item?.meta?.warning[item?.meta?.warning?.length - 1]}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Min : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.min[item?.meta?.min?.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Warning : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.warning[item?.meta?.warning?.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Max : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.max[item?.meta?.max?.length - 1]}%
                </Text>
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType == COMPLETED_GAUGE && (
            <>
              <CircleGauge
                value={
                  chartValuesCalculator(store, item._id)[
                    chartValuesCalculator(store, item._id)?.length - 1
                  ]
                }
                min={item?.meta?.min[item?.meta?.min?.length - 1]}
                max={item?.meta?.max[item?.meta?.max?.length - 1]}
                warning={item?.meta?.warning[item?.meta?.warning?.length - 1]}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Min : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.min[item?.meta?.min?.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Warning : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.warning[item?.meta?.warning?.length - 1]}%
                </Text>
                <Text style={styles.lineChartTextTitle}>Max : </Text>
                <Text style={styles.lineChartText}>
                  {item?.meta?.max[item?.meta?.max?.length - 1]}%
                </Text>
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === SIMPLE_BAR && (
            <>
              <View
                style={{
                  alignSelf: 'center',
                }}
              >
                <MultiBarChart
                  size="large"
                  values={chartValuesCalculator(store, item._id)}
                  color={item?.meta?.colors[item?.meta?.colors?.length - 1]}
                />
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === STACKED_BARS && (
            <>
              <View style={{ marginLeft: 50 }}>
                <StackedBarsChart
                  size="large"
                  dataArray={chartValuesCalculator(store, item._id) || 0}
                  stackedNumber={stackedNumberCalculator(store, item._id) || 0}
                  legendArray={item?.meta?.legend}
                  colorsArray={item?.meta?.colors}
                />
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === PIE && (
            <>
              <View style={{ alignSelf: 'center', marginBottom: '10%' }}>
                <SimplePieCharts
                  size="large"
                  names={item?.meta?.names}
                  values={chartValuesCalculator(store, item._id)}
                  colors={item?.meta?.colors}
                />
              </View>
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
          {item?.chartType === PROGRESS_RING && (
            <>
              <ProgressRing
                size="large"
                dataArray={chartValuesCalculator(store, item._id)}
                dataColors={item?.meta?.colors}
                dataLegend={item?.meta?.legend}
              />
              <View style={styles.lineChartTextDateContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value Date: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[0]}
                </Text>
                <Text style={styles.lineChartTextTitle}>Last Value Time: </Text>
                <Text style={styles.lineChartText}>
                  {lastValueDate(store, item._id).split('T')[1].split('.')[0]}
                </Text>
              </View>
            </>
          )}
        </View>
        <SafeAreaView>
          <View style={{ marginTop: 5 }}>
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
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chartContainer: {
    maxHeight: '50%',
  },
  lineChartTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: '1%',
  },
  lineChartTextTitle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 13,
    margin: 2,
  },
  lineChartText: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  lineChartTextDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default ChartsDetailsScreen;
