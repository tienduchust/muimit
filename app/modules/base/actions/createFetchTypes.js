/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

const SERVER = 'SERVER';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

/**
 * createFetchTypes
 * @param {*} base
 */
export default function createFetchTypes(base) {
    return [SERVER, REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}
