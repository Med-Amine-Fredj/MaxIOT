import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { LineChart, PieChart } from 'react-native-chart-kit';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function SimplePieCharts({ names, values, colors, size }) {
  let data = [];
  for (let i = 0; i < names.length; i++) {
    data.push({
      name: names[i],
      population: values[i],
      color: colors[i],
      legendFontColor: 'black',
      legendFontSize: 15,
    });
  }

  // const data = [
  //   {
  //     name: 'Seoul',
  //     population: 21500000,
  //     color: '#F4F1DE',
  //     legendFontColor: 'black',
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Toronto',
  //     population: 2800000,
  //     color: '#E07A5F',
  //     legendFontColor: 'black',
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Beijing',
  //     population: 527612,
  //     color: '#3D405B',
  //     legendFontColor: 'black',
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'New York',
  //     population: 8538000,
  //     color: '#81B29A',
  //     legendFontColor: 'black',
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: 'Moscow',
  //     population: 11920000,
  //     color: '#F2CC8F',
  //     legendFontColor: 'black',
  //     legendFontSize: 15,
  //   },
  // ];
  const chartConfig = {
    color: () => '#00BFBF',
  };

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={size == 'small' ? screenWidth * 0.5 : screenWidth}
        height={size == 'small' ? screenHeigth * 0.2 : screenHeigth * 0.3}
        chartConfig={chartConfig}
        accessor={'population'}
        // backgroundColor={'transparent'}
        paddingLeft={size == 'small' ? '50' : '20'}
        // center={[10, 50]}
        absolute={false}
        hasLegend={size == 'small' ? false : true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
