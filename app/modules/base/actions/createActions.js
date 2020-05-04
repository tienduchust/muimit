/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

const _createAction = (action, stateKey, statePath) => (...args) => action(...args, stateKey, statePath);

/**
 * createActions: Tạo một list action có API
 * @param {*} actions
 * @param {*} stateKey
 * @param {*} statePath
 */
const createActions = (actions, stateKey, statePath = []) => Object.keys(actions).reduce((final, key) => {
    final[key] = _createAction(actions[key], stateKey, statePath);
    return final;
}, {});

export default createActions;
