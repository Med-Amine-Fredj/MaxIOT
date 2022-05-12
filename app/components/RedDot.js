import React from 'react';
import LottieView from 'lottie-react-native';

function RedDot({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require('../assets/animations/redDot.json')}
    />
  );
}

export default RedDot;
