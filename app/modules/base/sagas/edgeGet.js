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

import {take, fork, put, call, select} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {EDGE_API, edgeApi} from '../apis/edgeApiActions';
import {edgeActions} from '../reducers/edgeReducerActions';

/**
 * GET: Xu ly ket qua tra ve khi GET thanh cong
 */

// REQUEST HANDLE: GET

const fetchGetEdge = fetchEntity.bind(null, edgeApi.get);

const doFetchGetEdge = function* doFetchGetEdge(requestAction) {
    const {selector, api, parentId, id, forceGet = false} = requestAction.condition;
    const body = requestAction.payload;
    if (forceGet) {
        yield call(fetchGetEdge, api.get.bind(api), requestAction, parentId, id, body);
    } else {
        // CuongNT: Kiem tra dam bao chua co _edge trong state thi truy van server, cho roi thi thoi.
        const _edge = yield select(selector.get, id);
        if (!_edge) {
            yield call(fetchGetEdge, api.get.bind(api), requestAction, parentId, id);
        }
    }
};

const watchGetEdge = function* watchGetEdge() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(EDGE_API.GET_UI);
        yield fork(doFetchGetEdge, requestAction);
    }
};

// RESPONSE HANDLE: GET

const doGetEdgeSuccess = function* doGetEdgeSuccess(fetchResult) {
    const {payload, original} = fetchResult;
    const {parentId, statePath, stateKey, mainStateKey, searchKey} = original.condition;
    yield put(edgeActions.updateList(parentId, payload[stateKey], stateKey, statePath, mainStateKey, searchKey));
    // yield call(addPayloadToState, payload, getType, statePath, mainStateKey, searchKey);
    // const statePath = [];// original.condition.statePath;
    // TODO by CuongNT: Bo sung kich ban update newId vao state thay offlineId
    // TODO by CuongNT: Bo sung kich ban add du lieu vao state truoc hoac sau khi post success do giao dien yeu cau
};

const isGetEdgeSuccessAction = function isGetEdgeSuccessAction(action) {
    const actionType = action.type;
    return actionType === EDGE_API.GET.SUCCESS;
};

const watchGetEdgeSuccess = function* watchGetEdgeSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isGetEdgeSuccessAction);
        yield fork(doGetEdgeSuccess, fetchResult);
    }
};

export {
    watchGetEdge,
    watchGetEdgeSuccess,
};
