import React, { useEffect } from 'react';

import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';

import Screen from '../components/Screen';

import AllUserCard from '../components/cards/AllUserCard';
import DateNow from '../components/dateNow';

import { io } from 'socket.io-client';

import { useSelector, useStore } from 'react-redux';

import { getUiStyling } from '../store/actions/uiStylingActions';
import { getDevicesData } from '../store/actions/devicesActions';
import {
  BEZIER_LINE,
  COMPLETED_GAUGE,
  ICONS,
  INCOMPLETED_GAUGE,
  PIE,
  PROGRESS_RING,
  SIMPLE_BAR,
  SIMPLE_DATA,
  SIMPLE_LINE,
  STACKED_BARS,
} from '../components/charts/AllChartsTypesConstants';

import ActivityIndicator from '../components/ActivityIndicator';
import LineChartFlatlist from '../components/dataFlatlist/LineChartFlatlist';
import IconsFlatlist from '../components/dataFlatlist/IconsFlatlist';
import GaugeFlatlist from '../components/dataFlatlist/GaugeFlatlist';
import BarChartsFlatlist from '../components/dataFlatlist/BarChartsFlatlist';
import PieChartsFlalist from '../components/dataFlatlist/PieChartsFlalist';
import SimpleFlatlist from '../components/dataFlatlist/SimpleFlatlist';

import { SOCKET_URL } from '@env';

function HomeScreen({ navigation }) {
  const uiStylingData = useSelector(
    (state) => state?.entities?.uiStyling?.uiStylingData
  );
  const loadingUiStyling = useSelector(
    (state) => state?.entities?.uiStyling?.loading
  );
  const deviceData = useSelector(
    (state) => state?.entities?.devices?.devicesData
  );

  const loadingDeviceData = useSelector(
    (state) => state?.entities?.devices?.loading
  );

  const store = useStore();

  const socket = io(`http://192.168.1.93:5000/`);

  useEffect(() => {
    getUiStyling(store);
    getDevicesData(store);

    socket.on('FromAPI', (data) => {
      getUiStyling(store);
      getDevicesData(store);
      console.log('Operation on collection : ', data);
    });

    socket.on('connect', () => {
      console.log('Connected wih Id : ', socket.id);
    });

    return () => socket.disconnect();
  }, []);

  const simpleData = deviceData?.filter((n) => n?.chartType === SIMPLE_DATA);

  const iconsData = deviceData?.filter((n) => n?.chartType === ICONS);

  const lineChartsData = deviceData?.filter(
    (n) => n?.chartType === BEZIER_LINE || n?.chartType === SIMPLE_LINE
  );

  const gaugeData = deviceData?.filter(
    (n) =>
      n?.chartType === COMPLETED_GAUGE || n?.chartType === INCOMPLETED_GAUGE
  );

  const circleChartData = deviceData?.filter(
    (n) => n?.chartType === PROGRESS_RING || n?.chartType === PIE
  );

  const barsChartsData = deviceData?.filter(
    (n) => n?.chartType === STACKED_BARS || n?.chartType === SIMPLE_BAR
  );

  return (
    <>
      <ActivityIndicator visible={loadingDeviceData || loadingUiStyling} />

      <StatusBar backgroundColor="#6E53A2" />

      <Screen>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <SafeAreaView>
              <DateNow />
              <AllUserCard usersNumber={1231231231} />

              <SimpleFlatlist
                data={simpleData}
                isScrollable={uiStylingData?.simpleData?.scrollable}
              />
              <LineChartFlatlist
                data={lineChartsData}
                isScrollable={uiStylingData?.lineCharts?.scrollable}
                navigation={navigation}
              />
              <IconsFlatlist
                data={iconsData}
                isScrollable={uiStylingData?.icons?.scrollable}
                navigation={navigation}
              />
              <GaugeFlatlist
                data={gaugeData}
                isScrollable={uiStylingData?.gaugeCharts?.scrollable}
                navigation={navigation}
              />
              <BarChartsFlatlist
                data={barsChartsData}
                isScrollable={uiStylingData?.barCharts?.scrollable}
                navigation={navigation}
              />
              <PieChartsFlalist
                data={circleChartData}
                isScrollable={uiStylingData?.pieCharts?.scrollable}
                navigation={navigation}
              />
            </SafeAreaView>
          </ScrollView>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
