import React from 'react';

import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import InfoCard from '../cards/InfoCard';

function SimpleFlatlist({ data }) {
  const devicesData = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  const number = (id) => {
    return devicesData
      ?.filter((n) => n?.deviceId == id)[0]
      ?.values?.slice(-1)[0]?.value;
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
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
