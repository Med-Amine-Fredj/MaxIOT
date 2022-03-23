import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import IncompletedGauge from '../components/charts/IncompletedGauge';
import ListItemSeparator from '../components/ListItemSeparator';
import ChartDetailsCard from '../components/cards/ChartDetailsCard';
import BezierLineChart from '../components/charts/BezierLineChart';
import colors from '../config/colors';
import CircleGauge from '../components/charts/CircleGauge';
import SimpleLineChart from '../components/charts/SimpleLineChart';
import ProgressRing from '../components/charts/ProgressRing';
import StackedBarsChart from '../components/charts/StackedBarsChart';
import SimplePieCharts from '../components/charts/SimplePieCharts';
import MultiBarChart from '../components/charts/MultiBarChart';

function IncompletedGaugeDetails({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };
  const item = route.params.item;
  const data = [
    {
      id: '1234',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '3414',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
      test: 'test',
    },
    {
      id: '22',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '122',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '12112',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '121112',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '1211a12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '121aza1a12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '1211azaeaz12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '1211azezaa12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
    {
      id: '1211azaeazaa12',
      PO: 'PERF444',
      Description: 'PERF454',
      type: 'STD',
      orderedDate: '11/13/2021 11:56 AM',
    },
  ];
  return (
    <>
      <StatusBar backgroundColor="#6E53A2" />
      <Header onPress={() => navigation.goBack()} title={item.title} />
      <View style={styles.container}>
        <View style={styles.chartContainer}>
          {item.type === 'Incompleted Gauge' && (
            <IncompletedGauge size={250} value={item.value} />
          )}
          {item.type === 'Bezier Line Chart' && (
            <>
              <BezierLineChart dataArray={item.value} size="large" />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {item.value[item.value.length - 1]}
                </Text>
              </View>
            </>
          )}
          {item.type == 'Completed Gauge' && (
            <>
              <CircleGauge
                value={item.value}
                min={item.min}
                max={item.max}
                warning={item.warning}
                size="large"
              />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Min : </Text>
                <Text style={styles.lineChartText}>{item.min}%</Text>
                <Text style={styles.lineChartTextTitle}>Warning : </Text>
                <Text style={styles.lineChartText}>{item.warning}%</Text>
                <Text style={styles.lineChartTextTitle}>Max : </Text>
                <Text style={styles.lineChartText}>{item.max}%</Text>
              </View>
            </>
          )}
          {item.type === 'Simple Line Chart' && (
            <>
              <SimpleLineChart dataArray={item.value} size="large" />
              <View style={styles.lineChartTextContainer}>
                <Text style={styles.lineChartTextTitle}>Last Value : </Text>
                <Text style={styles.lineChartText}>
                  {item.value[item.value.length - 1]}
                </Text>
              </View>
            </>
          )}
          {item.type === 'Progress Ring' && (
            <ProgressRing
              size="large"
              dataArray={item.value}
              dataColors={item.dataColors}
              dataLegend={item.legend}
            />
          )}
          {item.type === 'Stacked Bars' && (
            <View style={{ marginLeft: 50 }}>
              <StackedBarsChart
                size="large"
                dataArray={item.value}
                labelsArray={item.labels}
                legendArray={item.legend}
                colorsArray={item.colors}
              />
            </View>
          )}
          {item.type === 'Pie Chart' && (
            <View style={{ alignSelf: 'center', marginBottom: '10%' }}>
              <SimplePieCharts
                size="large"
                names={item.names}
                values={item.values}
                colors={item.colors}
              />
            </View>
          )}
          {item.type === 'MultiBar Chart' && (
            <View style={{ alignSelf: 'center', marginBottom: '10%' }}>
              <MultiBarChart
                size="large"
                values={item.values}
                color={item.color}
              />
            </View>
          )}
        </View>
        <SafeAreaView style={{ flex: 2, backgroundColor: 'white' }}>
          <ListItemSeparator />
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
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
export default IncompletedGaugeDetails;
