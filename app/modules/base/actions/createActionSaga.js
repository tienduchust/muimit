/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

import createAction from './createAction';

/**
 * createActionSaga: Tạo một action saga
 * @param {*} types
 */
export default function createActionSaga(types) {
    return {
        request: (...args) => createAction(types.REQUEST, ...args),
        success: (...args) => createAction(types.SUCCESS, ...args),
        failure: (...args) => createAction(types.FAILURE, ...args),
    };
}
