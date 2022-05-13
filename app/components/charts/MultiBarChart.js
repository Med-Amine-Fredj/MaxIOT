import { StyleSheet } from 'react-native';
import { Dimensions, View } from 'react-native';
import NoDataFound from '../NoDataFound';

import { BarChart } from 'react-native-chart-kit';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

import colors from '../../config/colors';

export default function MultiBarChart({ size, values, color }) {
  const dataSliced = values.slice(1);
  const finalData =
    dataSliced.length > 12 && size === 'large'
      ? dataSliced.slice(dataSliced.length - 12)
      : dataSliced.length > 10 && size !== 'large'
      ? dataSliced.slice(dataSliced.length - 10)
      : dataSliced;
  const data = {
    datasets: [
      {
        data: finalData,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: () => colors.primary,
    barPercentage: size === 'large' ? 0.7 : 0.8,
    propsForBackgroundLines: {
      strokeOpacity: size === 'large' ? 0.1 : 0,
      strokeDasharray: [-1000000000000, 1000000000000000],
    },
    decimalPlaces: 0,
    labelColor: () => `black`,
    propsForLabels: {
      fontSize: size == 'large' ? 9 : 0,
      fontWeight: 'bold',
    },
  };
  return values[0] === 0 && values.length === 1 ? (
    <View
      style={{
        flex: 1,
      }}
    >
      <NoDataFound visible={true} />
    </View>
  ) : (
    <View style={styles.container}>
      <BarChart
        style={{
          padding: size === 'large' ? 10 : 9,
          alignSelf: 'flex-end',
          justifyContent: 'center',
        }}
        data={data}
        width={size === 'large' ? screenWidth * 1.15 : screenWidth * 1.05}
        height={size === 'large' ? screenHeigth * 0.3 : screenHeigth * 0.25}
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
