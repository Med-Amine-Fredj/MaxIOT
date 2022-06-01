import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { useSelector, useStore } from 'react-redux';

import Header from '../components/Header';
import ListItemSeparator from '../components/ListItemSeparator';
import ChartDetailsCard from '../components/cards/ChartDetailsCard';
import Icon from '../components/Icon';
import { chartValuesCalculator } from '../../Helpers/Functions/chartsDataCalculator';

function IconsDetailsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };

  const realTime = route.params.realTime;
  const id = route.params.id;

  const [realTim, setReal] = useState(realTime);

  const [item, setItem] = useState({});

  const deviceStyle = useSelector(
    (state) => state?.entities?.devices?.devicesStyle
  );

  const deviceData = useSelector(
    (state) => realTim && state?.entities?.devicesData?.devicesData
  );

  useEffect(() => {
    setItem(deviceStyle?.filter((n) => n?._id === id)[0]);
  }, [item, deviceStyle]);

  return (
    <>
      <Header
        onPress={() => navigation.goBack()}
        title={item?.name}
        realTime={realTim}
        onRealTimePress={() => setReal(!realTim)}
      />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconContainer}>
            <Icon
              iconName={item?.meta?.iconName}
              iconColor={item?.meta?.iconColor}
              iconBackgroundColor={item?.meta?.iconBackgroundColor}
              size="large"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.txt}>
              {chartValuesCalculator(store, item._id)
                ? chartValuesCalculator(store, item._id)[
                    chartValuesCalculator(store, item._id)?.length - 1
                  ]
                : ''}
            </Text>
          </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  iconContainer: {
    marginTop: '3%',
    marginBottom: '7%',
    marginLeft: '10%',
  },
  textContainer: {
    marginTop: '5%',
    paddingHorizontal: '10%',
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default IconsDetailsScreen;
