/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

import createActions from './createActions';

/**
 * createApiActions: Tạo một list action có API
 * @param {*} actions
 * @param {*} stateKey
 * @param {*} statePath
 */
const createApiActions = (actions, stateKey, statePath = []) => Object.keys(actions).reduce((final, key) => {
    final[key] = createActions(actions[key], stateKey, statePath);
    return final;
}, {});

export default createApiActions;
