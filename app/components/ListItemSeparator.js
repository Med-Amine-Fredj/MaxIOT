import React from 'react';
import { StyleSheet, View } from 'react-native';

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'gray',
    opacity: 0.5,
  },
});

export default ListItemSeparator;
