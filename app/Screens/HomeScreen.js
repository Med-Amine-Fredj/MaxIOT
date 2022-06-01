import React, { useEffect, useState } from 'react';

import { StatusBar, ScrollView, FlatList, View, Button } from 'react-native';

import Screen from '../components/Screen';

import AllUserCard from '../components/cards/AllUserCard';
import DateNow from '../components/dateNow';

import io from 'socket.io-client';

import { useSelector, useStore } from 'react-redux';

import { getUiStyling } from '../store/actions/uiStylingActions';

import ActivityIndicator from '../components/ActivityIndicator';

import { getDevicesData } from '../store/actions/devicesDataActions';
import { getDevices } from '../store/actions/devicesActions';
import ChartsCard from '../components/cards/ChartsCard';
import BarsChartsCard from '../components/cards/BarsChartsCard';
import IconsCard from '../components/cards/IconsCard';
import { chartValuesCalculator } from '../../Helpers/Functions/chartsDataCalculator';
import { stackedNumberCalculator } from '../../Helpers/Functions/StackedNumberForStackedBarChart';
import routes from '../navigation/routes';
import InfoCard from '../components/cards/InfoCard';
import { filterDeviceById } from '../../Helpers/Functions/filterDeviceById';

import { SOCKET_URL } from '../config/dotEnvFile';
import { socketConnection } from '../../Helpers/Socket/socketConnection';

const socket = io(SOCKET_URL, { transports: ['websocket'] });

function HomeScreen({ navigation }) {
  const store = useStore();

  const [realTime, setReal] = useState(true);

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
    (state) => realTime && state?.entities?.devicesData?.devicesData
  );

  useEffect(() => {
    socketConnection(socket, store);
    login();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#6E53A2" />
      {loadingDevices || loadingUiStyling ? (
        <>
          <ActivityIndicator visible={loadingDevices || loadingUiStyling} />
        </>
      ) : (
        <>
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
                <View key={index}>
                  <FlatList
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
                            filterDeviceById(store, item?.deviceId)[0]?.name ||
                            ''
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
                              id: filterDeviceById(store, item?.deviceId)[0]
                                ?._id,
                              realTime: realTime,
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
                              id: filterDeviceById(store, item?.deviceId)[0]
                                ?._id,
                              realTime: realTime,
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
                              id: filterDeviceById(store, item?.deviceId)[0]
                                ?._id,
                              realTime: realTime,
                            })
                          }
                        />
                      </>
                    )}
                  />
                </View>
              ))}
            </ScrollView>
          </Screen>
        </>
      )}
    </>
  );
}

export default HomeScreen;
