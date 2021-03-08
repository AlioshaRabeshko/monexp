import { LineChart, PieChart } from "react-native-chart-kit";
import { View, Text } from '../Themed';
import { TouchableOpacity, StyleSheet } from 'react-native'
import config from '../../utils/configContext';
import state from '../../utils/stateContext';

function Chart() {


  return (
    <View>
      <LineChart />
    </View>
  );

}

export default Chart;