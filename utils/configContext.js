import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import getConfigs from './getConfigs';
import TransactionsDAO from '../modules/TransactionsDAO';
import getSQLiteConnection from './getSQLiteConnection';
import { Text, View } from '../components/Themed';
import {getDateRange} from './utils';
import PropTypes from "prop-types";

const ConfigContext = React.createContext({})
const defaultConfig = {
  config: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    chartHeight: 250,
    currency: '$'
  },
  l: {},
  account: {},
  isLoading: true
};

export function ConfigProvider(props) {
  const [config, setConfig] = useState({...defaultConfig});
  useEffect(() => {
    getSQLiteConnection().then(db => setConfig({...config, db, isLoading: false}))
  }, [props.config]);

  if(config.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ConfigContext.Provider value={config}>
      {props.children}
    </ConfigContext.Provider>
  );
}

export default ConfigContext;
