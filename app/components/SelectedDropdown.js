import React, { useEffect, useState } from 'react';

import colors from '../config/colors';

import SelectDropdown from 'react-native-select-dropdown';
import Icon from './Icon';
import {
  BEZIER_LINE,
  COMPLETED_GAUGE,
  INCOMPLETED_GAUGE,
  PIE,
  PROGRESS_RING,
  SIMPLE_BAR,
  SIMPLE_LINE,
  STACKED_BARS,
} from './charts/AllChartsTypesConstants';

function SelectedDropdown({ realTime, onSelect, data }) {
  const [countries, setCountires] = useState([]);

  useEffect(() => {
    data === INCOMPLETED_GAUGE ||
    data === COMPLETED_GAUGE ||
    data === PIE ||
    data === PROGRESS_RING
      ? setCountires([
          '3 Days Ago',
          '1 Week Ago',
          '2 weeks Ago',
          '3 Weeks Ago',
          '1 Month Ago',
        ])
      : data === SIMPLE_LINE || data === BEZIER_LINE
      ? setCountires([
          'Recent 24 Values',
          'Set Of 24 Oldest Values',
          'Set Of 24 Oldest Values',
          'Set Of 24 Oldest Values',
          'Oldest 24 Oldest Values',
        ])
      : data === SIMPLE_BAR || data === STACKED_BARS
      ? setCountires([
          'Recent 12 Values',
          'Set Of 12 Oldest Values',
          'Set Of 12 Oldest Values',
          'Set Of 12 Oldest Values',
          'Oldest 12 Oldest Values',
        ])
      : setCountires(['Waiting Data ...']);

    // return () => {
    //   second
    // }
    // console.log(data);
    // console.log(countries);
  }, []);

  return (
    <SelectDropdown
      disabled={realTime}
      data={countries}
      dropdownIconPosition="right"
      renderDropdownIcon={() => (
        <Icon iconName="down" iconColor="black" iconSize={20} />
      )}
      buttonTextStyle={{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
      }}
      buttonStyle={{
        backgroundColor: !realTime ? 'white' : colors.gray,
        borderWidth: 0.6,
        borderColor: colors.gray,
        borderRadius: 14,
        maxHeight: '76%',
        maxWidth: '60%',
      }}
      dropdownStyle={{
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: colors.gray,
        borderRadius: 14,
      }}
      rowTextStyle={{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
      }}
      defaultButtonText={
        realTime ? 'Disabled in Sync Mode' : 'Filter data by...'
      }
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem);
      }}
    />
  );
}

export default SelectedDropdown;
