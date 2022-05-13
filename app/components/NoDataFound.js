import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function NoDataFound({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/NoData2.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: 'white',
    // position: 'absolute',
    // height: '100%',
    // width: '100%',
  },
});
export default NoDataFound;
