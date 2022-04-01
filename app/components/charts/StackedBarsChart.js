import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';

import { StackedBarChart } from 'react-native-chart-kit';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function StackedBarsChart({
  dataArray,
  legendArray,
  colorsArray,
  size,
}) {
  const data = {
    legend: legendArray,
    data: dataArray,
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
      fontSize: 9,
      fontWeight: 'bold',
    },
  };

  return (
    <View style={styles.container}>
      <StackedBarChart
        style={{
          paddingRight: size == 'large' ? '0%' : '23%',
          padding: 10,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        data={data}
        width={size == 'large' ? screenWidth * 1.15 : screenWidth}
        height={screenHeigth * 0.3}
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
