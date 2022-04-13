import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import colors from '../../config/colors';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

export default function BezierLineChart({ dataArray, size }) {
  const data = {
    datasets: [
      {
        data:
          size == 'large' ? dataArray : dataArray?.slice(dataArray?.length - 5),
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    fillShadowGradientFrom: colors.light_green,
    fillShadowGradientToOpacity: 0.1,
    fillShadowGradientTo: 'white',
    strokeWidth: 4,
    decimalPlaces: 2,
    color: () => colors.light_green,
    labelColor: () => colors.dark_green,
    propsForDots: {
      r: '2',
      strokeWidth: '2',
      stroke: colors.dark_green,
    },
    propsForBackgroundLines: {
      stroke: 'gray',
      screenWidth: '0',
      strokeOpacity: 0.2,
      strokeDasharray: [-1000000000000, 10000000000000000],
    },
  };

  return (
    <View style={styles.container}>
      {size == 'small' && (
        <Text style={styles.txt}>
          {data.datasets[0].data[data.datasets[0].data.length - 1]}
        </Text>
      )}
      <LineChart
        data={data}
        width={size == 'large' ? w : w * 0.69}
        height={size == 'large' ? h * 0.3 : h * 0.17}
        withOuterLines={size == 'large' ? true : false}
        withInnerLines={size == 'large' ? true : false}
        withVerticalLines={size == 'large' ? true : false}
        withVerticalLabels={size == 'large' ? true : false}
        withHorizontalLabels={size == 'large' ? true : false}
        chartConfig={chartConfig}
        fromZero={true}
        withDots={size == 'large' ? true : false}
        segments={4}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.light_green,
  },
});
