import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import color from '../../config/colors';

let h = Dimensions.get('window').height;

function AllUserCard({ usersNumber }) {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text numberOfLines={1} style={styles.number}>
          {usersNumber}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.txt}>Connected</Text>
        <Text style={styles.txt}>users</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    height: h * 0.1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: h * 0.05,
  },
  numberContainer: {
    width: '73%',
    marginLeft: '1%',
  },
  number: {
    color: color.primary,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-thin',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: '2%',
    marginRight: '2%',
  },
  txt: {
    fontSize: 15,
    fontWeight: '700',
  },
});

export default AllUserCard;
