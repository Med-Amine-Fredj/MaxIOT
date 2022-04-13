import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import routes from '../../navigation/routes';

import IconsCard from '../cards/IconsCard';

function IconsFlatlist({ data, isScrollable, navigation }) {
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
        numColumns={!isScrollable && 3}
        data={data}
        keyExtractor={(item, index) => 'IC' + index.toString()}
        renderItem={({ item }) => (
          <IconsCard
            values={number(item?._id) || 0}
            iconData={item}
            onPress={() =>
              navigation.navigate(routes.ICONS_DETAILS, {
                id: item.deviceId,
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

export default IconsFlatlist;
