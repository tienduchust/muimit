/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 11/12/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {take, fork, put, call} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {EDGE_API, edgeApi} from '../apis/edgeApiActions';
import {edgeActions} from '../reducers/edgeReducerActions';
import {MODIFY_STATE_BEFORE, MODIFY_STATE_AFTER, MODIFY_STATE_ONLY, MODIFY_STATE_TYPE_DEFAULT, MODIFY_STATE_TYPES} from '../actions/ActionConstants';

/**
 * DELETE: Xu ly ket qua tra ve khi DELETE thanh cong
 */

// REQUEST HANDLE: DELETE

const fetchDeleteEdge = fetchEntity.bind(null, edgeApi.remove);

const doFetchDeleteEdge = function* doFetchDeleteEdge(requestAction) {
    const {api, parentId, id, statePath, stateKey, header, modifyStateType = MODIFY_STATE_TYPE_DEFAULT, mainStateKey, searchKey, searchStateKey} = requestAction.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPost::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }

    if (modifyStateType === MODIFY_STATE_BEFORE || modifyStateType === MODIFY_STATE_ONLY) {
        yield put(edgeActions.remove(parentId, id, stateKey, statePath, mainStateKey, searchKey, searchStateKey));
    }
    if (modifyStateType !== MODIFY_STATE_ONLY) {
        yield call(fetchDeleteEdge, api.delete.bind(api), requestAction, parentId, id, header);
    }
};

const watchDeleteEdge = function* watchDeleteEdge() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(EDGE_API.DELETE_UI);
        yield fork(doFetchDeleteEdge, requestAction);
    }
};

// RESPONSE HANDLE: DELETE SUCCESS

const doDeleteEdgeSuccess = function* doDeleteEdgeSuccess(fetchResult) {
    const {original} = fetchResult;
    const {modifyStateType = MODIFY_STATE_TYPE_DEFAULT, stateKey, statePath, parentId, id, mainStateKey, searchKey, searchStateKey} = original.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPost::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }
    if (modifyStateType === MODIFY_STATE_AFTER) {
        yield put(edgeActions.remove(parentId, id, stateKey, statePath, mainStateKey, searchKey, searchStateKey));
    }
};

const isDeleteEdgeSuccessAction = function isDeleteEdgeSuccessAction(action) {
    const actionType = action.type;
    return actionType === EDGE_API.DELETE.SUCCESS;
};

const watchDeleteEdgeSuccess = function* watchDeleteEdgeSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isDeleteEdgeSuccessAction);
        yield fork(doDeleteEdgeSuccess, fetchResult);
    }
};

export {
    watchDeleteEdge,
    watchDeleteEdgeSuccess,
};
