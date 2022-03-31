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

import simpleData from '../mockData/simpleData';
import firstCardData from '../mockData/firstCardData';
import iconsData from '../mockData/iconsData';
import secondCardData from '../mockData/secondCardData';
import bigChartsData from '../mockData/bigChartsData';
import thirdCardData from '../mockData/thirdCardData';

import axios from 'axios';

import { io } from 'socket.io-client';

import { useStore, useSelector } from 'react-redux';

import {
  GET_UISTYLING_REQUEST,
  GET_UISTYLING_SUCCESS,
  GET_UISTYLING_FAIL,
} from '../store/slices/reducers/uiStyling';

function HomeScreen({ navigation }) {
  const scrollable = false;

  const store = useStore();
  const clicked = useSelector(
    (state) => state?.entities?.uiStyling?.uiStylingData
  );
  const clickButton = async () => {
    try {
      store.dispatch({
        type: GET_UISTYLING_REQUEST,
      });

      const { data } = await axios.get(
        'http://192.168.1.77:5000/api/uiStyling/'
      );

      store.dispatch({
        type: GET_UISTYLING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      store.dispatch({
        type: GET_UISTYLING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  useEffect(() => {
    clickButton();
    const socket = io('http://192.168.1.77:5000/');

    socket.on('FromAPI', (data) => {
      // setResponse(data);
      console.log('Operation on collection : ', data);
    });

    socket.on('connect', () => {
      console.log('Connected wih Id : ', socket.id);
    });
    console.log(clicked);
    return () => socket.disconnect();
  }, []);

  return (
    <>
      <Screen>
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
                  <InfoCard number={item.number} message={item.title} />
                )}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={firstCardData}
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
                  numColumns={3}
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
                data={secondCardData}
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
                data={bigChartsData}
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
                data={thirdCardData}
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
