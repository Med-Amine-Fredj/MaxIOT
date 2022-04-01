import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/lf30_editor_tciumy7a.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
    width: '100%',
    opacity: 0.9,
    zIndex: 1,
  },
});

export default ActivityIndicator;
