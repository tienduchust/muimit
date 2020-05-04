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

/**
 * Patch: Xu ly ket qua tra ve khi Patch thanh cong
 */
// REQUEST HANDLE: Patch
const fetchPatchObject = fetchEntity.bind(null, objectApi.patch);

const doFetchPatchObject = function* doFetchPatchObject(requestAction) {
    const {data} = requestAction.payload;
    const {api, id, stateKey, statePath} = requestAction.condition;
    // TODO: thêm object mới vào state trước lúc post lên server
    yield put(objectActions.update(id, data, stateKey, statePath));
    yield call(fetchPatchObject, api.patch.bind(api), requestAction, id, data);
};

const watchPatchObject = function* watchPatchObject() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(OBJECT_API.PATCH_UI);
        yield fork(doFetchPatchObject, requestAction);
    }
};

// RESPONSE HANDLE: Patch SUCCESS
// eslint-disable-next-line no-unused-vars
const doPatchObjectSuccess = function* doPatchObjectSuccess(fetchResult) {
    // TODO: cập nhật object/dữ liệu cạnh mới vào state nếu chưa thực hiện trước lúc Patch lên server
    // yield call(addPayloadToState, body, GET_LIST_TYPE.NEWER, requestAction.condition.statePath);
};

const isPatchObjectSuccessAction = function isPatchObjectSuccessAction(action) {
    const actionType = action.type;
    // return actionType.includes('_SUCCESS') && actionType.includes('_PUT_');
    return actionType === OBJECT_API.PATCH.SUCCESS;
};

const watchPatchObjectSuccess = function* watchPatchObjectSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isPatchObjectSuccessAction);
        yield fork(doPatchObjectSuccess, fetchResult);
    }
};

export {
    watchPatchObject,
    watchPatchObjectSuccess,
};
