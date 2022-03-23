import { StyleSheet, Text, View } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function gouge({ value, size }) {
  var levelStyle = StyleSheet.flatten([
    styles.txt,
    {
      color: value < 30 ? '#F60707' : '#00BFBF',
      fontSize: size > 200 ? 60 : 30,
    },
  ]);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={size}
        width={size > 200 ? 10 : 7}
        fill={value}
        backgroundWidth={size > 200 ? 7 : 2}
        tintColor={value < 30 ? '#F60707' : '#00BFBF'}
        tintTransparency={false}
        // onAnimationComplete={() => console.log('Animation Completed')}
        backgroundColor="#E6E6E6"
        arcSweepAngle={240}
        rotation={242}
        lineCap="round"
        tintColorSecondary={value < 30 ? '#F60707' : '#00BFBF'}
        duration={1000}
      >
        {(fill) => <Text style={levelStyle}>{Math.round(fill)}%</Text>}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
