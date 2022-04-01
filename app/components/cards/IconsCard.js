import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
} from 'react-native';
import colors from '../../config/colors';
import Icon from '../Icon';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

function IconsCard({ iconData, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Icon
            iconName={iconData?.meta?.iconName}
            iconColor={iconData?.meta?.iconColor}
            iconBackgroundColor={iconData?.meta?.iconBackgroundColor}
          />
          <View style={styles.textContainer}>
            <Text style={styles.v} numberOfLines={1}>
              {iconData?.meta?.values[iconData?.meta?.values?.length - 1]}
            </Text>
            <Text style={styles.title} numberOfLines={1}>
              {iconData?.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: h * 0.01,
    overflow: 'hidden',
    height: h * 0.17,
    width: (w / 2) * 0.58,
    marginHorizontal: 3,
  },
  container: {
    marginTop: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: '90%',
  },
  textContainer: {
    marginTop: '5%',
  },
  v: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '100',
  },
});

export default IconsCard;
