import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import NoDataFound from '../NoDataFound';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function SimpleLineChart({ dataArray, size }) {
  const data = {
    datasets: [
      {
        data:
          size === 'large'
            ? dataArray
            : size === 'small' && dataArray?.length > 6
            ? dataArray.slice(-6)
            : size === 'small' && dataArray?.length <= 6 && dataArray,
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    fillShadowGradientFrom: '#00BFBF',
    fillShadowGradientToOpacity: 0.1,
    fillShadowGradientTo: 'white',
    strokeWidth: 4,
    decimalPlaces: 2,
    color: () => '#00BFBF',
    labelColor: () => '#018E8E',
    propsForDots: {
      r: '2',
      strokeWidth: '2',
      stroke: '#018E8E',
    },
    propsForBackgroundLines: {
      stroke: 'gray',
      screenWidth: '0',
      strokeOpacity: 0.2,
      strokeDasharray: [-1000000000000, 10000000000000000],
    },
  };
  return dataArray[0] === 0 && dataArray?.length === 1 ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <NoDataFound visible={true} />
    </View>
  ) : (
    <>
      <View style={styles.container}>
        {size == 'small' && (
          <Text style={styles.txt}>
            {data?.datasets[0]?.data[data?.datasets[0]?.data?.length - 1]}
          </Text>
        )}
        <LineChart
          data={data}
          width={size == 'large' ? screenWidth : screenWidth * 0.78}
          height={size == 'large' ? screenHeigth * 0.3 : screenHeigth * 0.18}
          withOuterLines={size == 'large' ? true : false}
          withInnerLines={size == 'large' ? true : false}
          withVerticalLines={size == 'large' ? true : false}
          withVerticalLabels={size == 'large' ? true : false}
          withHorizontalLabels={size == 'large' ? true : false}
          chartConfig={chartConfig}
          fromZero={true}
          withDots={size == 'large' ? true : false}
          segments={4}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00BFBF',
  },
});
