import React from 'react';
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
import MultiBarChart from '../components/charts/MultiBarChart';

function HomeScreen({ navigation }) {
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
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <InfoCard number={item.number} message={item.title} />
                )}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={firstCardData}
                keyExtractor={(item) => item._id}
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
                data={iconsData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <IconsCard iconData={item} />}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={secondCardData}
                keyExtractor={(item) => item._id}
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
                keyExtractor={(item) => item._id}
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
                keyExtractor={(item) => item._id}
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
