/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author congtm@bkav.com on 25/10/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {fromJS, Map} from 'immutable';
import createReducer from './createReducer';
import {OBJECT_ACTIONS} from './objectReducerActions';
import {UPDATE_OBJECT_TYPE, UPDATE_BRANCH_TYPE} from '../configs/Constants';

/**
 * Goi khi server tra ve danh sach tin
 * objects: {objectId1: {}, objectId2: {}...};
 */
const addList = (state, action) => {
    const {objects} = action.payload;
    // TODO by CuongNT: merge khi put, mergeDeep khi patch. Tam thoi dung het mergeDeep.
    return state.mergeDeep(objects);
};

const update = (state, action) => {
    const {id, data} = action.payload;
    const {updateBranchType, updateObjectType} = action.condition;
    // TODO by CuongNT: doan code duoi can sua chuan lai theo cach dung fixedKeys thay cho updateBranchType. fixedKeys=['permission', 'role', ''infomation, 'config', ...]. Moi key nay dong cap voi 'data' va se sua base de co thuat toan update cac phan nay sau.
    if (updateBranchType === UPDATE_BRANCH_TYPE.UPDATE_AT_STATE_KEY) {
        const dataTmp = data[Object.keys(data)[0]];
        return state.update(id, (_data) => _data ? _data.mergeDeep(dataTmp) : dataTmp);

        // const allStateKeys = Object.keys(data);
        // return state.withMutations(st =>
        //     allStateKeys.forEach(stateKey => {
        //         const dataTmp = data[stateKey];
        //         st.update(id, _data => _data ? _data.mergeDeep(dataTmp) : dataTmp);
        //     })
        // );
    }
    // Trường hợp cần update full object
    if (updateBranchType === UPDATE_BRANCH_TYPE.UPDATE_AT_ID_KEY) {
        if (updateObjectType === UPDATE_OBJECT_TYPE.OVERWRITE) {
            return state.set(id, data);
        }
        return state.update(id, (_data) => _data ? _data.mergeDeep(data) : data);
    }
    // Trường hợp chỉ cần update vào trong nhánh data của object
    return state.updateIn([id, 'data'], (_data) => _data ? _data.mergeDeep(data) : data);
};

const patch = (state, action) => {
    const {id, data} = action.payload;
    return state.updateIn([id, 'data'], (_data) => _data ? _data.mergeDeep(data) : data);
};

const remove = (state, action) => {
    const {id} = action.payload;
    return state.delete(id);
};

const removeList = (state, action) => {
    const {objectIds} = action.payload;
    return state.withMutations((stateTmp) => {
        objectIds.forEach((id) => stateTmp.delete(id));
    });
};

const updateNewId = (state, action) => {
    const {id, offlineId, createdDate, timestamp} = action.payload;
    // TODO by CuongNT: de tam ca 2 createDate, timestamp. Sau server thong nhat thi bo di sau.
    // Thay thế cả obj có key là offlineId = obj có key là id
    const newObject = state.get(offlineId)
    // .deleteIn(['data', 'offlineId'])
        .setIn(['data', 'id'], id)
        .updateIn(['data', 'createdDate'], (_createdDate) => createdDate ? createdDate : timestamp ? timestamp : _createdDate)
        .updateIn(['data', 'timestamp'], (_timestamp) => createdDate ? createdDate : timestamp ? timestamp : _timestamp);
    return state.set(id, newObject);
    // // Chỉ thay trường id ở trong obj về id mới
    // const newObject = state.get(offlineId)
    //     .setIn(['data', 'id'], id)
    //     .updateIn(['data', 'createdDate'], (_createdDate) => createdDate ? createdDate : timestamp ? timestamp : _createdDate)
    //     .updateIn(['data', 'timestamp'], (_timestamp) => createdDate ? createdDate : timestamp ? timestamp : _timestamp);
    // return state.set(offlineId, newObject);
};

const add = (state, action) => {
    const {object} = action.payload;
    return state.set(object.getIn(['data', 'id']), object);
};

// CuongNT: Các hàm dưới chưa dùng tới.

const updateFields = (state, action) => {
    const {id, fields} = action.payload;
    return state.updateIn([id, 'data'], (data) => data.merge(fields));
};

const clear = () => new Map();

// TODO by CuongNT: Can bo sung co che khai bao reducer de chu dong hanlde cac cuc du lieu rieng (VD: itemIds cua threadMessageIds), thay vi phai tao file saga nay nhu hien tai.
const createObjectReducer = (defaultState = {}) => createReducer(fromJS(defaultState), {
    [OBJECT_ACTIONS.ADD]: add,
    [OBJECT_ACTIONS.ADD_LIST]: addList,
    [OBJECT_ACTIONS.REMOVE]: remove,
    [OBJECT_ACTIONS.REMOVE_LIST]: removeList,
    [OBJECT_ACTIONS.UPDATE]: update,
    [OBJECT_ACTIONS.PATCH]: patch,
    [OBJECT_ACTIONS.UPDATE_FIELDS]: updateFields,
    [OBJECT_ACTIONS.UPDATE_NEW_ID]: updateNewId,
    [OBJECT_ACTIONS.CLEAR]: clear,
});

const objectReducer = createObjectReducer();

export default objectReducer;
