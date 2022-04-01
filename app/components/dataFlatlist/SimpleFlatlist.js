import React from 'react';

import { StyleSheet, FlatList } from 'react-native';

import InfoCard from '../cards/InfoCard';

function SimpleFlatlist({ data, isScrollable }) {
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
          <InfoCard
            number={item?.meta?.simpleDataNmuber}
            message={item?.name}
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

export default SimpleFlatlist;
