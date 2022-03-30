import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import ListItemSeparator from '../components/ListItemSeparator';
import ChartDetailsCard from '../components/cards/ChartDetailsCard';
import dataDetails from '../mockData/dataDetails';
import Icon from '../components/Icon';

function IconsDetailsScreen({ navigation, route }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 3000);
  };

  const item = route.params.item;

  return (
    <>
      <StatusBar backgroundColor="#6E53A2" />
      <Header onPress={() => navigation.goBack()} title={item.title} />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconContainer}>
            <Icon
              iconName={item.iconName}
              iconColor={item.iconColor}
              iconBackgroundColor={item.iconBackgroundColor}
              size="large"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.txt}> {item.value}</Text>
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
      <StatusBar backgroundColor="#6E53A2" />
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
