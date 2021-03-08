import React, {useState} from 'react';
import {getDateRange} from './utils';

const StateContext = React.createContext({})
const defaultState = {
  dateRange: getDateRange()
};

export function StateProvider(props) {
  const [state, set] = useState(defaultState);

  function setState(obj) {
    set(state => ({...state, ...obj}));
  }

  return (
    <StateContext.Provider value={{...state, setState}}>
      {props.children}
    </StateContext.Provider>
  );
}

export default StateContext;
