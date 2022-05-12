import { StyleSheet } from 'react-native';

import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
import { Dimensions } from 'react-native';

let d = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

export default function MultiBarChart({ size, values, color }) {
  const data1 = values.slice(1).map((value) => ({
    value,
  }));

  const barData = [
    {
      data: data1,
      svg: {
        fill: color,
      },
    },
    // {
    //   data: data2,
    //   svg: {
    //     fill: '#7659FB',
    //   },
    // },
  ];
  return (
    barData && (
      <>
        <BarChart
          style={{
            height: size == 'large' ? h * 0.25 : h * 0.15,
            backgroundColor: 'white',
            width: size == 'large' ? d * 0.9 : d * 0.8,
            marginTop: '5%',
          }}
          data={barData}
          numberOfTicks={5}
          spacingInner={0.2}
          spacingOuter={0.1}
          gridMin={0}
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => item.date}
          animate={true}
          animationDuration={1000}
          svg={{
            fill: color,
          }}
        >
          {size == 'large' && <Grid direction="HORIZONTAL" />}
        </BarChart>
        {size == 'large' && (
          <XAxis
            style={{
              marginTop: 3,
              height: size == 'large' ? h * 0.03 : h * 0.15,
            }}
            data={data1}
            formatLabel={(value, index) => value}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        )}
      </>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00BFBF',
  },
});
