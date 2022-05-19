import React, { useEffect, useState } from 'react';

import {
  StatusBar,
  ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Screen from '../components/Screen';

import AllUserCard from '../components/cards/AllUserCard';
import DateNow from '../components/dateNow';

import io from 'socket.io-client';

import { useSelector, useStore } from 'react-redux';

import {
  getUiStyling,
  insertUiSyling,
  removeUiStyling,
  updateUiStyling,
} from '../store/actions/uiStylingActions';

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
import {
  getDevicesData,
  updateDevicesData,
} from '../store/actions/devicesDataActions';
import {
  getDevices,
  insertDevice,
  removeDevice,
  updateDevices,
} from '../store/actions/devicesActions';
import ChartsCard from '../components/cards/ChartsCard';
import BarsChartsCard from '../components/cards/BarsChartsCard';
import IconsCard from '../components/cards/IconsCard';
import { chartValuesCalculator } from '../../Helpers/Functions/chartsDataCalculator';
import { stackedNumberCalculator } from '../../Helpers/Functions/StackedNumberForStackedBarChart';
import routes from '../navigation/routes';
import InfoCard from '../components/cards/InfoCard';
import { filterDeviceById } from '../../Helpers/Functions/filterDeviceById';

import { SOCKET_URL } from '../config/dotEnvFile';
import Icon from '../components/Icon';
import { socketConnection } from '../../Helpers/Socket/socketConnection';

const socket = io(SOCKET_URL, { transports: ['websocket'] });

function HomeScreen({ navigation }) {
  const store = useStore();

  const [realTime, setReal] = useState(true);
  const [socketLoader, setSocketLoader] = useState(true);

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
  useEffect(() => {
    if (realTime) {
      login();
      socketConnection(socket, store);
    }

    // return () => socket.disconnect();
  }, [realTime]);

  const deviceData = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <DateNow
            realTime={realTime}
            onPress={() => {
              setReal(!realTime);
            }}
          />
          <AllUserCard usersNumber={1231231231} />
          {uiStylingData?.map((element, index) => (
            <>
              {/* {element.layout === 'ROW' && (
                <View key={index + Math.random().toFixed(2).toString()}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        right: 0,
                        marginTop: '28%',
                        position: 'absolute',
                        zIndex: 1,
                        opacity: 0.5,
                      }}
                    >
                      <TouchableOpacity>
                        <Icon
                          iconName="caretright"
                          iconColor="black"
                          iconBackgroundColor="#E2E2DF"
                          size="new"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        left: 0,
                        marginTop: '28%',
                        position: 'absolute',
                        zIndex: 1,
                        opacity: 0.5,
                      }}
                    >
                      <TouchableOpacity>
                        <Icon
                          iconName="caretleft"
                          iconColor="black"
                          iconBackgroundColor="#E2E2DF"
                          size="new"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )} */}
              <FlatList
                key={index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={element.layout === 'COL' ? false : true}
                numColumns={element.layout === 'COL' && 2}
                data={element.components}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <>
                    <InfoCard
                      number={
                        chartValuesCalculator(
                          store,
                          filterDeviceById(store, item?.deviceId)[0]?._id
                        ) || [0] ||
                        0
                      }
                      message={
                        filterDeviceById(store, item?.deviceId)[0]?.name || ''
                      }
                      chartObject={
                        filterDeviceById(store, item?.deviceId)[0] || {}
                      }
                    />
                    <ChartsCard
                      values={
                        chartValuesCalculator(
                          store,
                          filterDeviceById(store, item?.deviceId)[0]?._id
                        ) || [0]
                      }
                      chartObject={
                        filterDeviceById(store, item?.deviceId)[0] || {}
                      }
                      onPress={() =>
                        navigation.navigate(routes.CHART_DETAILS, {
                          id: filterDeviceById(store, item?.deviceId)[0]?._id,
                        })
                      }
                    />
                    <BarsChartsCard
                      chartObject={
                        filterDeviceById(store, item?.deviceId)[0] || {}
                      }
                      values={
                        chartValuesCalculator(
                          store,
                          filterDeviceById(store, item?.deviceId)[0]?._id
                        ) || [0]
                      }
                      stackedNumber={
                        stackedNumberCalculator(
                          store,
                          filterDeviceById(store, item?.deviceId)[0]?._id
                        ) || 0
                      }
                      onPress={() =>
                        navigation.navigate(routes.CHART_DETAILS, {
                          id: filterDeviceById(store, item?.deviceId)[0]?._id,
                        })
                      }
                    />
                    <IconsCard
                      values={
                        chartValuesCalculator(
                          store,
                          filterDeviceById(store, item?.deviceId)[0]?._id
                        ) || [0]
                      }
                      iconData={
                        filterDeviceById(store, item?.deviceId)[0] || {}
                      }
                      onPress={() =>
                        navigation.navigate(routes.ICONS_DETAILS, {
                          id: filterDeviceById(store, item?.deviceId)[0]?._id,
                        })
                      }
                    />
                  </>
                )}
              />
            </>
          ))}

          {/* <BarChartsFlatlist
                data={barsChartsData || []}
                isScrollable={true}
                navigation={navigation}
              /> */}

          {/* <LineChartFlatlist
                data={lineChartsData || []}
                isScrollable={false}
                navigation={navigation}
              />

              <GaugeFlatlist
                data={gaugeData || []}
                isScrollable={true}
                navigation={navigation}
              /> */}
          {/* <PieChartsFlalist
                data={circleChartData || []}
                isScrollable={true}
                navigation={navigation}
              /> */}
          {/* <IconsFlatlist
                data={iconsData || []}
                isScrollable={true}
                navigation={navigation}
              />*/}
        </ScrollView>
      </Screen>
    </>
  );
}

export default HomeScreen;
