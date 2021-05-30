import React, {useContext, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Header from '../components/TabOneComponents/Header';
import Chart from '../components/TabOneComponents/Chart';
import Categories from '../components/TabOneComponents/Categories';
import TransactionForm from '../components/TabOneComponents/TransactionForm';
import withContextHOC from '../utils/withContextHOC';


function TabOneScreen({category}) {
  return (
    <View style={styles.container}>
      <Header />
      {(category) && (
        <TransactionForm />
      )}
      {(!category) && (
        <React.Fragment>
          <Chart />
          <Categories />
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

export default withContextHOC(['config', 'categoryId', 'category'], TabOneScreen);
