import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Screen from '../components/Screen';

import AllUserCard from '../components/cards/AllUserCard';
import DateNow from '../components/dateNow';

import { io } from 'socket.io-client';

import { useSelector, useStore } from 'react-redux';

import { getUiStyling } from '../store/actions/uiStylingActions';

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
import {
  getDevicesData,
  removeDeviceData,
  updateDevicesData,
} from '../store/actions/devicesDataActions';
import {
  getDevices,
  insertDevice,
  removeDevice,
  updateDevices,
} from '../store/actions/devicesActions';

function HomeScreen({ navigation }) {
  const socket = io(`http://192.168.1.32:5000/`);

  const store = useStore();

  const login = () => {
    getDevicesData(store);
    getUiStyling(store);
    getDevices(store);
  };

  const uiStylingData = useSelector(
    (state) => state?.entities?.uiStyling?.uiStylingData
  );
  const loadingUiStyling = useSelector(
    (state) => state?.entities?.uiStyling?.loading
  );
  const devices = useSelector(
    (state) => state?.entities?.devices?.devicesStyle
  );

  const loadingDevices = useSelector(
    (state) => state?.entities?.devices?.loading
  );
  const deviceData = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  const [realTime, setReal] = useState(true);

  useEffect(() => {
    login();
    socket.on('connect', () => {
      console.log('Connected wih Id : ', socket.id);
    });

    socket.on('devices-updated', (data) => {
      updateDevices(store, data.id, data.meta);
    });

    socket.on('devices-removed', (data) => {
      removeDevice(store, data);
    });

    socket.on('devices-inserted', (data) => {
      insertDevice(store, data);
      getDevicesData(store);
    });
    socket.on('devices-values-update', (data) => {
      updateDevicesData(store, data.id, data.values);
    });
    return () => socket.disconnect();
  }, []);

  const simpleData = devices?.filter((n) => n?.chartType == SIMPLE_DATA);

  const iconsData = devices?.filter((n) => n?.chartType === ICONS);

  const lineChartsData = devices?.filter(
    (n) => n?.chartType === BEZIER_LINE || n?.chartType === SIMPLE_LINE
  );

  const gaugeData = devices?.filter(
    (n) =>
      n?.chartType === COMPLETED_GAUGE || n?.chartType === INCOMPLETED_GAUGE
  );

  const circleChartData = devices?.filter(
    (n) => n?.chartType === PROGRESS_RING || n?.chartType === PIE
  );

  const barsChartsData = devices?.filter(
    (n) => n?.chartType === STACKED_BARS || n?.chartType === SIMPLE_BAR
  );

  return (
    <>
      <ActivityIndicator visible={loadingDevices || loadingUiStyling} />

      <StatusBar backgroundColor="#6E53A2" />

      <Screen>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <SafeAreaView>
              <DateNow
                realTime={realTime}
                onPress={() => {
                  setReal(!realTime);
                }}
              />
              <AllUserCard usersNumber={1231231231} />
              <SimpleFlatlist data={simpleData} />
              {/* {uiStylingData?.map((element) => (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={element.layout == 'COL' ? false : true}
                  data={element.components}
                  keyExtractor={(item, index) => 'SF' + index.toString()}
                  renderItem={({ item }) => <Text>{item.deviceId}</Text>}
                />
              ))} */}

              <LineChartFlatlist
                data={lineChartsData || []}
                isScrollable={true}
                navigation={navigation}
              />
              <IconsFlatlist
                data={iconsData || []}
                isScrollable={true}
                navigation={navigation}
              />
              <GaugeFlatlist
                data={gaugeData || []}
                isScrollable={true}
                navigation={navigation}
              />
              <PieChartsFlalist
                data={circleChartData || []}
                isScrollable={true}
                navigation={navigation}
              />
              <BarChartsFlatlist
                data={barsChartsData || []}
                isScrollable={true}
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
