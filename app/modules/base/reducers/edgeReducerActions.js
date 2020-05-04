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

import createActionNoAppID from '../actions/createActionNoAppID';

const EDGE_ACTIONS = {
    ADD_LIST: 'EDGE_ADD_LIST',
    ADD: 'EDGE_ADD',
    REMOVE: 'EDGE_REMOVE',
    REMOVE_ALL: 'EDGE_REMOVE_ALL',
    UPDATE: 'EDGE_UPDATE',
    PATCH: 'EDGE_PATCH',
    CLEAR: 'EDGE_CLEAR',
    UPDATE_LIST: 'EDGE_UPDATE_LIST',
    UPDATE_NEW_ID: 'EDGE_UPDATE_NEW_ID',
    UPDATE_SEARCH_PARAMS: 'EDGE_UPDATE_SEARCH_PARAMS',
    ADD_SEARCH_PARAMS: 'EDGE_ADD_SEARCH_PARAMS',
    UPDATE_INFO: 'EDGE_UPDATE_INFO',
    ADD_INFO: 'EDGE_ADD_INFO',
};

// TODO: LinhLTF thêm searchStateKeys.
// TODO NAMVH : remove(), add() không truyền mainStateKey, searchKey, searchStateKey nhưng bên trong reducer bắt action này lại lấy ra để sử dụng. => chưa xem lại các action ở bên dưới.
const addList = (getType, objectIds, stateKey, statePath = [], mainStateKey, searchKey, searchStateKeys) => createActionNoAppID(EDGE_ACTIONS.ADD_LIST, {getType, objectIds}, null, {statePath, stateKey, mainStateKey, searchKey, searchStateKeys});

const add = (parentId, id, data, stateKey, statePath = [], mainStateKey, searchKey, searchStateKey) => createActionNoAppID(EDGE_ACTIONS.ADD, {parentId, id, data}, null, {statePath, stateKey, mainStateKey, searchKey, searchStateKey});

const remove = (parentId, id, stateKey, statePath = [], mainStateKey, searchKey, searchStateKey) => createActionNoAppID(EDGE_ACTIONS.REMOVE, {parentId, id}, null, {statePath, stateKey, mainStateKey, searchKey, searchStateKey});

const removeAll = (parentId, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.REMOVE_ALL, {parentId}, null, {stateKey, statePath});

// CuongNT: Các hàm dưới chưa dùng tới.

const update = (parentId, id, data, stateKey, statePath = [], isPatch = false) => createActionNoAppID(EDGE_ACTIONS.UPDATE, {parentId, id, data}, null, {statePath, stateKey, isPatch});

// NamVH rà soát : => có sử dụng hàm này nhưng truyền thông số không tương ứng với các reducer đang handle.
const patch = (parentId, id, data, stateKey, statePath = [], isPatch = false) => createActionNoAppID(EDGE_ACTIONS.PATCH, {parentId, id, data}, null, {statePath, stateKey, isPatch});

const clear = (stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.CLEAR, null, null, {statePath, stateKey});

const updateList = (parentId, data, stateKey, statePath = [], mainStateKey, searchKey) => createActionNoAppID(EDGE_ACTIONS.UPDATE_LIST, {parentId, data}, null, {statePath, stateKey, mainStateKey, searchKey});

const updateNewId = (parentId, offlineId, id, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.UPDATE_NEW_ID, {parentId, id, offlineId}, null, {statePath, stateKey});

// CuongNT - 07/20/2018: cap nhat searchParams cua request getList
const updateSearchParams = (parentId, searchParams, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.UPDATE_SEARCH_PARAMS, {parentId, searchParams}, null, {statePath, stateKey});

const addSearchParams = (parentId, searchParams, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.ADD_SEARCH_PARAMS, {parentId, searchParams}, null, {statePath, stateKey});

const updateInfo = (parentId, infoKey, infoData, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.UPDATE_INFO, {parentId, infoKey, infoData}, null, {statePath, stateKey});

const addInfo = (parentId, infoKey, infoData, stateKey, statePath = []) => createActionNoAppID(EDGE_ACTIONS.ADD_INFO, {parentId, infoKey, infoData}, null, {statePath, stateKey});

const edgeActions = {
    addList,
    add,
    remove,
    removeAll,
    update,
    patch,
    clear,
    updateList,
    updateNewId,
    updateSearchParams,
    addSearchParams,
    updateInfo,
    addInfo,
};

export {
    EDGE_ACTIONS,
    edgeActions,
};
