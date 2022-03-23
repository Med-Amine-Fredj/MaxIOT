import React from 'react';
import { AntDesign } from '@expo/vector-icons';

function Icon({ iconName, iconColor, iconBackgroundColor }) {
  return (
    <>
      <AntDesign
        name={iconName}
        size={28}
        color={iconColor}
        style={{
          backgroundColor: iconBackgroundColor,
          borderRadius: 30,
          padding: iconBackgroundColor ? 11 : 0,
        }}
      />
    </>
  );
}

export default Icon;
