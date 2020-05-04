import {Map} from 'immutable';
import _ from 'lodash';

export const initialState = Map({});
const appReducer = (state = initialState, action) => {
  let nextState = state;
  const {payload} = action;
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;