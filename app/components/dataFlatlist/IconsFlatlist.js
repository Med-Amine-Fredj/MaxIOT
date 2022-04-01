import React from 'react';

import { StyleSheet, FlatList } from 'react-native';
import routes from '../../navigation/routes';

import IconsCard from '../cards/IconsCard';

function IconsFlatlist({ data, isScrollable, navigation }) {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={isScrollable}
        numColumns={!isScrollable && data?.length >= 3 && 3}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <IconsCard
            iconData={item}
            onPress={() =>
              navigation.navigate(routes.ICONS_DETAILS, {
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

export default IconsFlatlist;
