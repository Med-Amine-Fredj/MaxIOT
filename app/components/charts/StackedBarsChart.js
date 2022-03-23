import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function StackedBarsChart({
  dataArray,
  labelsArray,
  legendArray,
  colorsArray,
  size,
}) {
  const data = {
    labels: labelsArray,
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

    barPercentage: 0.7,
    propsForBackgroundLines: {
      strokeOpacity: size == 'large' ? 0.1 : 0,
      strokeDasharray: [-1000000000000, 1000000000000000],
    },
    decimalPlaces: 0,
    labelColor: () => `black`,
    propsForLabels: {
      fontSize: 10,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  };

  return (
    <View style={styles.container}>
      <StackedBarChart
        style={{
          paddingRight: size == 'large' ? '0%' : '23%',
          padding: 10,
          alignSelf: 'center',
        }}
        data={data}
        width={screenWidth}
        height={screenHeigth * 0.3}
        chartConfig={chartConfig}
        withVerticalLabels={size == 'large' ? true : false}
        withHorizontalLabels={size == 'large' ? true : false}
        hideLegend={size == 'large' ? false : true}
        fromZero={true}
        segments={2}
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
