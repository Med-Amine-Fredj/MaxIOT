import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';

function ChartDetailsCard({ item }) {
  const keys = Object.getOwnPropertyNames(item);

  return (
    <View style={styles.container}>
      {keys.slice(1).map((k, index) => (
        <View key={index} style={styles.textContainer}>
          <Text style={styles.title}>{k} :</Text>
          <Text style={styles.description}>
            {Object.getOwnPropertyDescriptor(item, k).value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
    marginBottom: '2%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '10%',
  },
  title: {
    flex: 2,
    fontSize: 15,
    color: colors.primary,
  },
  description: {
    fontSize: 15,
    flex: 3,
    fontWeight: '600',
  },
});

export default ChartDetailsCard;
