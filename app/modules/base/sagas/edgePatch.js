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
import {edgeActions} from '../reducers/edgeReducerActions';
import {EDGE_API, edgeApi} from '../apis/edgeApiActions';

/**
 * PUT: Xu ly ket qua tra ve khi PUT thanh cong
 */

// REQUEST HANDLE: PUT

const fetchPatchEdge = fetchEntity.bind(null, edgeApi.patch);

const doFetchPatchEdge = function* doFetchPatchEdge(requestAction) {
    const data = requestAction.payload;
    const {api, id, parentId, stateKey, statePath, isPatch, header = {}} = requestAction.condition;
    // TODO: cập nhật edge/dữ liệu cạnh mới vào state nếu chưa thực hiện trước lúc put lên server
    yield put(edgeActions.patch(parentId, id, data, stateKey, statePath, isPatch));
    yield call(fetchPatchEdge, api.patch.bind(api), requestAction, parentId, id, data, header);
};

const watchPatchEdge = function* watchPatchEdge() {
    while(true) {
        const requestAction = yield take(EDGE_API.PATCH_UI);
        yield fork(doFetchPatchEdge, requestAction);
    }
};

// RESPONSE HANDLE: PUT SUCCESS

// eslint-disable-next-line no-unused-vars
const doPatchEdgeSuccess = function* doPatchEdgeSuccess(fetchResult) {
    // TODO: cập nhật edge/dữ liệu cạnh mới vào state nếu chưa thực hiện trước lúc put lên server
    // yield call(addPayloadToState, body, GET_LIST_TYPE.NEWER, requestAction.condition.statePath);
};

const isPatchEdgeSuccessAction = function isPatchEdgeSuccessAction(action) {
    const actionType = action.type;
    return actionType === EDGE_API.PATCH.SUCCESS;
};

const watchPatchEdgeSuccess = function* watchPatchEdgeSuccess() {
    while(true) {
        const fetchResult = yield take(isPatchEdgeSuccessAction);
        yield fork(doPatchEdgeSuccess, fetchResult);
    }
};

export {
    watchPatchEdge,
    watchPatchEdgeSuccess,
};
