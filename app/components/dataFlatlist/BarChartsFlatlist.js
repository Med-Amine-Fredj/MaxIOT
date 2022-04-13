import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import routes from '../../navigation/routes';

import BarsChartsCard from '../cards/BarsChartsCard';

function BarChartsFlatlist({ data, isScrollable, navigation }) {
  const dataC = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  const number = (id) => {
    return dataC?.filter((n) => n?.deviceId === id)[0]?.values;
  };
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        numColumns={!isScrollable && 1}
        data={data}
        keyExtractor={(item, index) => 'BC' + index.toString()}
        renderItem={({ item }) => (
          <BarsChartsCard
            values={number(item?._id) || 0}
            chartObject={item}
            onPress={() =>
              navigation.navigate(routes.CHART_DETAILS, {
                id: item._id,
              })
            }
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BarChartsFlatlist;
