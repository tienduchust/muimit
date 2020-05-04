/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 06/12/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {List} from 'immutable';

/**
 * get: Lấy một object
 * @param {*} state
 * @param {*} id
 */
const get = (state, id) => state.get(id);

const emptyList = List();

/**
 * getList: Lấy tất cả các object theo list các id tương ứng.
 * @param {*} state
 * @param {*} ids
 */
const getList = (state, ids) => {
    if (!ids || ids.size <= 0) return emptyList;
    return state.filter((object) => ids.includes(object.getIn(['data', 'id'])));
};

/**
 * getAll: Lấy tất cả các cục state.
 * @param {*} state
 */
const getAll = (state) => state;

/**
 * getAll: Lấy một giá trị trong một object.
 * @param {*} state
 * @param {*} id
 * @param {*} field
 */
const getField = (state, id, field) => state.getIn([id, 'data', field]);

/**
 * getAll: Lấy thông tin cho một object.
 * @param {*} state
 * @param {*} id
 * @param {*} info
 */
const getInfo = (state, id, info) => state.getIn([id, info]);

export {
    getAll,
    get,
    getList,
    getField,
    getInfo,
};
