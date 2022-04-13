import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import ListItemSeparator from '../components/ListItemSeparator';
import ChartDetailsCard from '../components/cards/ChartDetailsCard';
import Icon from '../components/Icon';

function IconsDetailsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };

  const id = route.params.id;

  const [item, setItem] = useState({});
  const [values, setValues] = useState(null);

  const deviceStyle = useSelector(
    (state) => state?.entities?.devices?.devicesStyle
  );

  const deviceData = useSelector(
    (state) => state?.entities?.devicesData?.devicesData
  );

  useEffect(() => {
    setItem(deviceStyle?.filter((n) => n?._id === id)[0]);
    setValues(deviceData?.filter((n) => n?.deviceId === id)[0]?.values);
  }, [item, values, deviceData, deviceStyle]);

  return (
    <>
      <Header onPress={() => navigation.goBack()} title={item?.name} />
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
              {values ? values[values?.length - 1] : ''}
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
