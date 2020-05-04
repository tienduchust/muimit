/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author phucnhb@bkav.com on 24/12/17.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {take, fork, put, call} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {edgeActions} from '../reducers/edgeReducerActions';
import {EDGE_API, edgeApi} from '../apis/edgeApiActions';

import {
    MODIFY_STATE_AFTER, MODIFY_STATE_BEFORE, MODIFY_STATE_ONLY,
    MODIFY_STATE_TYPE_DEFAULT, MODIFY_STATE_TYPES,
} from '../actions/ActionConstants';

/**
 * PUT: Xu ly ket qua tra ve khi PUT thanh cong
 */

// REQUEST HANDLE: PUT

const fetchPutEdge = fetchEntity.bind(null, edgeApi.putList);

const doFetchPutListEdge = function* doFetchPutListEdge(requestAction) {
    const data = requestAction.payload;
    const {api, parentId, stateKey, header, statePath, mainStateKey, searchKey, modifyStateType = MODIFY_STATE_TYPE_DEFAULT} = requestAction.condition;
    if (modifyStateType === MODIFY_STATE_BEFORE || modifyStateType === MODIFY_STATE_ONLY) {
        // TODO: cập nhật edge/dữ liệu cạnh mới vào state nếu chưa thực hiện trước lúc put lên server
        yield put(edgeActions.updateList(parentId, data[stateKey], stateKey, statePath, mainStateKey, searchKey));
        const {condition} = requestAction;
        const original = {condition};
        yield put({type: 'EDGE_PUT_LIST_API_SUCCESS_UPDATE_STATE', data, original});
    }
    if (modifyStateType !== MODIFY_STATE_ONLY) {
        yield call(fetchPutEdge, api.putList.bind(api), requestAction, parentId, data, header);
    }
};

const watchPutListEdge = function* watchPutListEdge() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(EDGE_API.PUT_LIST_UI);
        yield fork(doFetchPutListEdge, requestAction);
    }
};

// RESPONSE HANDLE: PUT SUCCESS

const doPutListEdgeSuccess = function* doPutListEdgeSuccess(fetchResult) {
    const {original} = fetchResult;
    const data = original.payload;
    const {parentId, stateKey, statePath, modifyStateType = MODIFY_STATE_TYPE_DEFAULT, mainStateKey, searchKey} = original.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'edgePutList::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }
    if (modifyStateType === MODIFY_STATE_AFTER) {
        yield put(edgeActions.updateList(parentId, data[stateKey], stateKey, statePath, mainStateKey, searchKey));
        yield put({type: 'EDGE_PUT_LIST_API_SUCCESS_UPDATE_STATE', data, original});
    }
};

const isPutEdgeSuccessAction = function isPutEdgeSuccessAction(action) {
    const actionType = action.type;
    // return actionType.includes('_SUCCESS') && actionType.includes('_PUT_');
    return actionType === EDGE_API.PUT_LIST.SUCCESS;
};

const watchPutListEdgeSuccess = function* watchPutListEdgeSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isPutEdgeSuccessAction);
        yield fork(doPutListEdgeSuccess, fetchResult);
    }
};

export {
    watchPutListEdge,
    watchPutListEdgeSuccess,
};
