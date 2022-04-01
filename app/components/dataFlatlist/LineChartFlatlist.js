import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import routes from '../../navigation/routes';

import ChartsCard from '../cards/ChartsCard';

function LineChartFlatlist({ data, isScrollable, navigation }) {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        numColumns={!isScrollable && data?.length >= 2 && 2}
        data={data}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LineChartFlatlist;
