import React from 'react';
import { AntDesign } from '@expo/vector-icons';

function Icon({ iconName, iconColor, iconBackgroundColor, size, iconSize }) {
  return (
    <>
      <AntDesign
        name={iconName}
        size={
          iconSize ? iconSize : size === 'large' ? 35 : size == 'new' ? 13 : 28
        }
        color={iconColor}
        style={{
          backgroundColor: iconBackgroundColor,
          borderRadius: size == 'large' ? 50 : size == 'new' ? 20 : 30,
          padding: iconBackgroundColor ? 11 : 0,
        }}
      />
    </>
  );
}

export default Icon;
