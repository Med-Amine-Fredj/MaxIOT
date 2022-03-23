import React from 'react';
import { AntDesign } from '@expo/vector-icons';

function Icon({ iconName, iconColor, iconBackgroundColor, size }) {
  return (
    <>
      <AntDesign
        name={iconName}
        size={size == 'large' ? 35 : 28}
        color={iconColor}
        style={{
          backgroundColor: iconBackgroundColor,
          borderRadius: size == 'large' ? 50 : 30,
          padding: iconBackgroundColor ? 11 : 0,
        }}
      />
    </>
  );
}

export default Icon;
