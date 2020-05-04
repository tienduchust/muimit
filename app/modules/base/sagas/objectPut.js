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

import {take, fork, call, put} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {objectApi, OBJECT_API} from '../apis/objectApiActions';
import {objectActions} from '../reducers/objectReducerActions';
import {addPayloadToStateWithoutMainStateKey} from './addPayloadToState';
import isPayloadWithStateKey from '../utils/isPayloadWithStateKey';
import {GET_LIST_TYPE} from '../configs/Constants';
import {
    MODIFY_STATE_AFTER,
    MODIFY_STATE_BEFORE, MODIFY_STATE_ONLY, MODIFY_STATE_TYPE_DEFAULT,
    MODIFY_STATE_TYPES,
} from '../actions/ActionConstants';

/**
 * PUT: Xu ly ket qua tra ve khi PUT thanh cong
 */
// REQUEST HANDLE: PUT
const fetchPutObject = fetchEntity.bind(null, objectApi.put);

const doFetchPutObject = function* doFetchPutObject(requestAction) {
    const data = requestAction.payload;
    const {api, id, stateKey, statePath, modifyStateType = MODIFY_STATE_TYPE_DEFAULT, updateBranchType, updateObjectType, header = {}, mainStateKey, searchKey} = requestAction.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPut::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }
    if (modifyStateType === MODIFY_STATE_BEFORE || modifyStateType === MODIFY_STATE_ONLY) {
        // TODO: thêm object mới vào state trước lúc post lên server
        if (isPayloadWithStateKey(data)) {
            // yield call(addPayloadToState, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
            yield call(addPayloadToStateWithoutMainStateKey, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
        } else {
            yield put(objectActions.update(id, data, stateKey, statePath, updateBranchType, updateObjectType));
        }
    }
    if (modifyStateType !== MODIFY_STATE_ONLY) {
        yield call(fetchPutObject, api.put.bind(api), requestAction, id, data, header);
    }
};

const watchPutObject = function* watchPutObject() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(OBJECT_API.PUT_UI);
        yield fork(doFetchPutObject, requestAction);
    }
};

// RESPONSE HANDLE: PUT SUCCESS
const doPutObjectSuccess = function* doPutObjectSuccess(fetchResult) {
    const {original} = fetchResult;
    const data = original.payload;
    const {id, stateKey, statePath, modifyStateType = MODIFY_STATE_TYPE_DEFAULT, updateBranchType, updateObjectType, mainStateKey, searchKey} = original.condition;
    if (!MODIFY_STATE_TYPES.includes(modifyStateType)) {
        throw 'objectPut::modifyStateType su dung cac gia tri import from base/ActionConstants.js';
    }
    // TODO by CuongNT: Doan code duoi lap code cac vong for => Can toi uu lai khi co thoi gian.
    if (modifyStateType === MODIFY_STATE_AFTER) {
        if (isPayloadWithStateKey(data)) {
            // yield call(addPayloadToState, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
            yield call(addPayloadToStateWithoutMainStateKey, data, GET_LIST_TYPE.NEWER, statePath, mainStateKey, searchKey);
        } else {
            yield put(objectActions.update(id, data, stateKey, statePath, updateBranchType, updateObjectType));
        }
    }
};

const isPutObjectSuccessAction = function isPutObjectSuccessAction(action) {
    const actionType = action.type;
    return actionType === OBJECT_API.PUT.SUCCESS;
};

const watchPutObjectSuccess = function* watchPutObjectSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isPutObjectSuccessAction);
        yield fork(doPutObjectSuccess, fetchResult);
    }
};

export {
    watchPutObject,
    watchPutObjectSuccess,
};
