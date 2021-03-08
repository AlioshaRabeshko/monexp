import React, {useContext, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Header from '../components/TabOneComponents/Header';
import Chart from '../components/TabOneComponents/Chart';

import stateContext from '../utils/stateContext';

export default function TabOneScreen() {
  const {dateRange} = useContext(stateContext);
  // console.log(dateRange)
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Chart /> 
      </View>
      {/* <Text>{dateRange && dateRange.startF}</Text> */}
      {/* view */}
        {/* chart */}
        {/* categories */}
      {/* footer */}
      {/* <Text style={styles.title}>Tab One</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
