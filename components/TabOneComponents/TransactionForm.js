import React, {useState, useEffect, useMemo} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, TextInput } from '../Themed';
import withContextHOC from '../../utils/withContextHOC';
import useCategories from '../../hooks/useCategories';
import { FontAwesome5 } from '@expo/vector-icons';

function TransactionForm({config, db, category}) {
  const styles = useMemo(() => getStyles(config), []);

  return (
    <View style={styles.transactionForm}>
      <View style={styles.form}>
        <View style={styles.formOption}>
          <Text>
            Amount:
          </Text>
          <TextInput
            placeholder="Amount"
            style={styles.numberInput}
            keyboardType="number-pad"
            placeholderTextColor="#555"
          />
        </View>
        <View style={{...styles.formCategory, backgroundColor: category.color}}>
          <Text style={styles.textCenter}>
            {category.name}
          </Text>
          <Text style={styles.textCenter}>
            <FontAwesome5 name={category.icon} size={98} />
          </Text>
        </View>
        <View style={styles.formOption}>
          <TextInput
            placeholder="Description"
            style={{...styles.numberInput, fontSize: 15}}
            placeholderTextColor="#555"
            multiline
            
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text>
          fdsaffdasfdsafdsa
        </Text>

      </View>
    </View>
  );
}

const getStyles = (config) => StyleSheet.create({
  transactionForm: {
    width: config.width,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  form: {
    // backgroundColor: '#2c2c54',
    width: config.width,
    height: config.height
  },
  formOption: {
    paddingVertical: 20,
    paddingHorizontal: config.width * 0.15,
  },
  formCategory: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: config.width * 0.25,
  },
  footer: {
    zIndex: 999,
    position: 'absolute',
    width: config.width,
    height: config.height * 0.15,
    bottom: 0,
    flex: 1
  },
  numberInput: {
    fontSize: 25,
    borderBottomWidth: 2,
  },
  textCenter: {
    fontSize: 23,
    color: '#222',
    textAlign: 'center'
  }
});

export default withContextHOC(['config', 'db', 'category'], TransactionForm);