import { StyleSheet, View, Dimensions, Text } from 'react-native';

import { StackedBarChart } from 'react-native-chart-kit';
import colors from '../../config/colors';
import NoDataFound from '../NoDataFound';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function StackedBarsChart({
  dataArray,
  stackedNumber,
  legendArray,
  colorsArray,
  size,
}) {
  const dataArraySliced = dataArray?.slice(1);
  let dataFinal = [];
  let [...arr] = dataArraySliced;
  while (arr.length) {
    dataFinal.push(arr.splice(0, stackedNumber));
  }

  const data = {
    legend: legendArray,
    data:
      dataFinal.length > 12 && size === 'large'
        ? dataFinal.slice(dataFinal.length - 12)
        : dataFinal.length > 10 && size !== 'large'
        ? dataFinal.slice(dataFinal.length - 10)
        : dataFinal,
    barColors: colorsArray,
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: () => 'gray',
    useShadowColorFromDataset: false,
    labelColor: () => 'black',

    barPercentage: size == 'large' ? 0.55 : 0.7,
    propsForBackgroundLines: {
      strokeOpacity: size == 'large' ? 0.1 : 0,
      strokeDasharray: [-1000000000000, 1000000000000000],
    },
    decimalPlaces: 0,
    labelColor: () => `black`,
    propsForLabels: {
      fontSize: 7,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  };

  return dataArray[0] === 0 && dataArray.length === 1 ? (
    <View
      style={{
        flex: 1,
      }}
    >
      <NoDataFound visible={true} />
    </View>
  ) : (
    <View style={styles.container}>
      <StackedBarChart
        style={{
          paddingRight: size === 'large' ? '1%' : '23%',
          padding: size === 'large' ? 1 : 15,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        data={data}
        width={size == 'large' ? screenWidth * 1.15 : screenWidth}
        height={size == 'large' ? screenHeigth * 0.3 : screenHeigth * 0.25}
        chartConfig={chartConfig}
        withVerticalLabels={size == 'large' ? false : false}
        withHorizontalLabels={size == 'large' ? true : false}
        hideLegend={size == 'large' ? false : true}
        fromZero={true}
        segments={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});
