import React from 'react';

import { StyleSheet, FlatList } from 'react-native';

import routes from '../../navigation/routes';

import BarsChartsCard from '../cards/BarsChartsCard';

function BarChartsFlatlist({ data, isScrollable, navigation }) {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        numColumns={!isScrollable && data?.length >= 1 && 1}
        data={data}
        keyExtractor={(item, index) => 'BC' + index.toString()}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BarChartsFlatlist;
