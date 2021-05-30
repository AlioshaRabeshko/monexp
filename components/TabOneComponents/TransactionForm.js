import React, {useState, useMemo, useRef} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, TextInput } from '../Themed';
import withContextHOC from '../../utils/withContextHOC';
import useCategories from '../../hooks/useCategories';
import { FontAwesome5 } from '@expo/vector-icons';
import TransactionsDAO from '../../modules/TransactionsDAO';
import moment from 'moment';

function TransactionForm({config, db, category, setState}) {
  const styles = useMemo(() => getStyles(config), []);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(null);
  const transactionsDAO = useMemo(() => new TransactionsDAO(db), [db])

  function createRecord() {
    transactionsDAO.create([{amount: Number(amount), description, categoryId: category.id}])
      .then(setState({category: null}))
      .catch(console.warn)
  }

  return (
    <View style={styles.transactionForm}>
      <View style={styles.form}>
        <View style={styles.formOption}>
          <Text>
            Amount:
          </Text>
          <TextInput
            autoFocus
            placeholder="Amount"
            value={`${amount}`}
            onChangeText={setAmount}
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
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={(() => setState({category: null}))}>
          <Text style={styles.textCenter}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={createRecord}>
          <Text style={styles.textCenter}>Apply</Text>
        </TouchableOpacity>
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
    height: config.height * 0.08,
    bottom: config.height * 0.08,
    display: 'flex',
    backgroundColor: '#473b80',
    flexDirection: 'row'
  },
  footerButton: {
    justifyContent: 'center',
    width: config.width * 0.5,
    height: config.height * 0.08,
    borderColor: '#555',
    borderWidth: 1
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

export default withContextHOC(['config', 'db', 'category', 'setState'], TransactionForm);