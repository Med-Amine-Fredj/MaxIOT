import { StyleSheet, View, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

let screenWidth = Dimensions.get('window').width;
let screenHeigth = Dimensions.get('window').height;

export default function ProgressRing({
  dataLegend,
  dataColors,
  dataArray,
  size,
}) {
  const dataArraySliced = dataArray.slice(1);
  const data = {
    labels: dataLegend,
    data:
      dataArraySliced?.length == dataColors?.length
        ? dataArraySliced
        : dataArraySliced?.length > dataColors?.length
        ? dataArraySliced?.slice(-dataColors?.length)
        : dataArraySliced,
    colors: dataColors,
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientToOpacity: 1,
    decimalPlaces: 2,
    color: (opacity = 1) => `#F4F4F6`,
    labelColor: () => `black`,
  };

  return (
    <View style={styles.container}>
      {data && (
        <ProgressChart
          data={data}
          width={size === 'large' ? screenWidth : screenWidth * 0.5}
          height={size === 'large' ? screenHeigth * 0.4 : screenHeigth * 0.3}
          strokeWidth={size === 'large' ? 10 : 5}
          radius={size === 'large' ? 10 : 1}
          chartConfig={chartConfig}
          withCustomBarColorFromData={true}
          hideLegend={size === 'large' ? false : true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: '1%',
  },
});
