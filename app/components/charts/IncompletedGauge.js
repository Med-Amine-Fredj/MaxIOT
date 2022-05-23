import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../config/colors';
import NoDataFound from '../NoDataFound';

let w = Dimensions.get('window').width;
let h = Dimensions.get('window').height;

export default function gouge({ value, size, min, max, warning }) {
  var levelStyle = StyleSheet.flatten([
    styles.txt,
    {
      color:
        value <= min || value >= max
          ? colors.dark_red
          : value == warning
          ? colors.dark_warning
          : colors.light_green,
      fontSize: size == 'large' ? 60 : 30,
    },
  ]);

  var messageStyle = StyleSheet.flatten([
    styles.message,
    {
      color:
        value <= min || value >= max
          ? colors.dark_red
          : value == warning
          ? colors.dark_warning
          : colors.light_green,
    },
  ]);

  return (
    <>
      {value === 0 ? (
        <View style={{ flex: 1 }}>
          <NoDataFound visible={true} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ minHeight: '10%' }}>
            {value === warning && (
              <View style={styles.messageContainer}>
                <AntDesign
                  name="warning"
                  size={size == 'large' ? 30 : 25}
                  color={colors.dark_warning}
                />
                {size == 'large' && <Text style={messageStyle}>Warning</Text>}
              </View>
            )}
            {(value >= max || value <= min) && (
              <View style={styles.messageContainer}>
                <MaterialIcons
                  name="error-outline"
                  size={size == 'large' ? 30 : 25}
                  color={colors.dark_red}
                />
                {size == 'large' && <Text style={messageStyle}>Error</Text>}
              </View>
            )}
          </View>
          <View style={{ alignSelf: 'center' }}>
            <AnimatedCircularProgress
              size={size == 'large' ? h * 0.34 : h * 0.18}
              width={size == 'large' ? w * 0.025 : w * 0.013}
              fill={value}
              backgroundWidth={size == 'large' ? w * 0.018 : w * 0.01}
              tintColor={
                value <= min || value >= max
                  ? colors.dark_red
                  : value == warning
                  ? colors.dark_warning
                  : colors.light_green
              }
              tintTransparency={false}
              backgroundColor={colors.gray}
              arcSweepAngle={240}
              rotation={242}
              lineCap="round"
              duration={0}
            >
              {(fill) => <Text style={levelStyle}>{Math.round(fill)}%</Text>}
            </AnimatedCircularProgress>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  valueContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
  message: {
    fontSize: 14,
    marginTop: 3,
    marginLeft: 3,
  },
  percent: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: '10%',
  },
});
