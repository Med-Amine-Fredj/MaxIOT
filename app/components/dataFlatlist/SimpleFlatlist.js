import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import InfoCard from '../cards/InfoCard';

function SimpleFlatlist({ data, isScrollable }) {
  const deviesData = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  const number = (id) => {
    return deviesData?.filter((n) => n?.deviceId === id)[0]?.values[0];
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        numColumns={!isScrollable && 2}
        data={data}
        keyExtractor={(item, index) => 'SD' + index.toString()}
        renderItem={({ item }) => (
          <InfoCard number={number(item?._id) || 0} message={item?.name} />
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
