import React, { useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  FlatList,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Screen from '../components/Screen';

import routes from '../navigation/routes';

import AllUserCard from '../components/cards/AllUserCard';
import DateNow from '../components/dateNow';
import InfoCard from '../components/cards/InfoCard';
import ChartsCard from '../components/cards/ChartsCard';
import IconsCard from '../components/cards/IconsCard';
import BarsChartsCard from '../components/cards/BarsChartsCard';

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

function HomeScreen({ navigation }) {
  const scrollable = true;

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

  useEffect(() => {
    getUiStyling(store);
    getDevicesData(store);
    const socket = io('http://192.168.1.77:5000/');

    socket.on('FromAPI', (data) => {
      // setResponse(data);
      console.log('Operation on collection : ', data);
    });

    socket.on('connect', () => {
      console.log('Connected wih Id : ', socket.id);
    });
    // console.log('Devices data from store HomeScreen ========', deviceData);
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
      <Screen>
        <ActivityIndicator visible={loadingDeviceData || loadingUiStyling} />
        <StatusBar backgroundColor="#6E53A2" />
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <SafeAreaView>
              <DateNow />

              <AllUserCard usersNumber={1231231231} />

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={simpleData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <InfoCard
                    number={item?.meta?.simpleDataNmuber}
                    message={item?.name}
                  />
                )}
              />

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={lineChartsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ChartsCard
                    chartObject={item}
                    onPress={() =>
                      navigation.navigate(routes.CHART_DETAILS, {
                        item,
                      })
                    }
                  />
                )}
              />
              {scrollable ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={iconsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <IconsCard
                      iconData={item}
                      onPress={() =>
                        navigation.navigate(routes.ICONS_DETAILS, {
                          item,
                        })
                      }
                    />
                  )}
                />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal={false}
                  numColumns={iconsData.length > 3 && 3}
                  data={iconsData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <IconsCard
                      iconData={item}
                      onPress={() =>
                        navigation.navigate(routes.ICONS_DETAILS, {
                          item,
                        })
                      }
                    />
                  )}
                />
              )}

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={gaugeData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ChartsCard
                    chartObject={item}
                    onPress={() =>
                      navigation.navigate(routes.CHART_DETAILS, {
                        item,
                      })
                    }
                  />
                )}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={barsChartsData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <BarsChartsCard
                    chartObject={item}
                    onPress={() =>
                      navigation.navigate(routes.CHART_DETAILS, {
                        item,
                      })
                    }
                  />
                )}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={circleChartData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ChartsCard
                    chartObject={item}
                    onPress={() =>
                      navigation.navigate(routes.CHART_DETAILS, {
                        item,
                      })
                    }
                  />
                )}
              />
            </SafeAreaView>
            <StatusBar backgroundColor="#6E53A2" />
          </ScrollView>
        </View>
        <StatusBar backgroundColor="#6E53A2" />
      </Screen>
      <StatusBar backgroundColor="#6E53A2" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
