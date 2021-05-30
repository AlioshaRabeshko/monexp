import React, {useContext} from 'react'
import configContext from './configContext';
import stateContext from './stateContext';
import {pick} from './utils'

function withContextHOC(names, Component) {
  return function WithContextComponent(props) {
    const config = useContext(configContext);
    const state = useContext(stateContext);
    return <Component {...pick({...config, ...state}, names)} {...props} />
  };
}

export default withContextHOC;