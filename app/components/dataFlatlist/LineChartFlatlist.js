import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import routes from '../../navigation/routes';

import ChartsCard from '../cards/ChartsCard';

function LineChartFlatlist({ data, isScrollable, navigation }) {
  const dataC = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  const number = (id) => {
    let arr = [];
    dataC
      ?.filter((n) => n?.deviceId === id)[0]
      ?.values.forEach((element) => {
        arr = [...arr, element.value];
      });
    return arr;
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        data={data}
        keyExtractor={(item, index) => 'LC' + index.toString()}
        renderItem={({ item }) => (
          <ChartsCard
            values={number(item?._id) || [0]}
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

export default LineChartFlatlist;
