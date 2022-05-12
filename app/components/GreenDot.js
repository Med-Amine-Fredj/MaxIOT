import React from 'react';
import LottieView from 'lottie-react-native';

function GreenDot({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      autoPlay
      loop
      source={require('../assets/animations/greenDot.json')}
    />
  );
}

export default GreenDot;
