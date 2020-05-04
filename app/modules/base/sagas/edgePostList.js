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

import {take, fork, call} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {EDGE_API, edgeApi} from '../apis/edgeApiActions';
import {GET_LIST_TYPE} from '../configs/Constants';
import {addPayloadToState} from './addPayloadToState';
import {MODIFY_STATE_BEFORE, MODIFY_STATE_AFTER, MODIFY_STATE_ONLY, MODIFY_STATE_TYPE_DEFAULT, MODIFY_STATE_TYPES} from '../actions/ActionConstants';

/**
 * PUT: Xu ly ket qua tra ve khi PUT thanh cong
 */

// REQUEST HANDLE: PUT

const fetchPutEdge = fetchEntity.bind(null, edgeApi.postList);

const doFetchPostListEdge = function* doFetchPostListEdge(requestAction) {
    const data = requestAction.payload;
    const {api, parentId, statePath, header, modifyStateType = MODIFY_STATE_TYPE_DEFAULT, mainStateKey, searchKey} = requestAction.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPost::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }

    if (modifyStateType === MODIFY_STATE_BEFORE || modifyStateType === MODIFY_STATE_ONLY) {
        yield call(addPayloadToState, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
    }
    if (modifyStateType !== MODIFY_STATE_ONLY) {
        yield call(fetchPutEdge, api.postList.bind(api), requestAction, parentId, data, header);
    }
};

const watchPostListEdge = function* watchPostListEdge() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(EDGE_API.POST_LIST_UI);
        yield fork(doFetchPostListEdge, requestAction);
    }
};

// RESPONSE HANDLE: PUT SUCCESS

const doPostListEdgeSuccess = function* doPostListEdgeSuccess(fetchResult) {
    const {original} = fetchResult;
    const {modifyStateType = MODIFY_STATE_TYPE_DEFAULT, statePath, mainStateKey, searchKey} = original.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPost::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }
    if (modifyStateType === MODIFY_STATE_AFTER) {
        const data = original.payload;
        yield call(addPayloadToState, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
    }
};

const isPostListEdgeSuccessAction = function isPostListEdgeSuccessAction(action) {
    const actionType = action.type;
    return actionType === EDGE_API.POST_LIST.SUCCESS;
};

const watchPostListEdgeSuccess = function* watchPostListEdgeSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isPostListEdgeSuccessAction);
        yield fork(doPostListEdgeSuccess, fetchResult);
    }
};

export {
    watchPostListEdge,
    watchPostListEdgeSuccess,
};
