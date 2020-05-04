/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

/**
 * createAction: Tạo một action có API
 * @param {*} APP_ID
 * @param {*} type
 * @param {*} payload
 */
export default function createAction(APP_ID, type, payload = {}) {
    return {APP_ID, type, payload, timestamp: Date.now()};
}
