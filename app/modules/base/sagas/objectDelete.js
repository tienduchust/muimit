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
import {edgeActions} from '../reducers/edgeReducerActions';

/**
 * DELETE: Xu ly ket qua tra ve khi DELETE thanh cong
 */

// REQUEST HANDLE: DELETE

const fetchDeleteObject = fetchEntity.bind(null, objectApi.remove);

const deleteObject = function* deleteObject(requestAction) {
    const {
        id,
        stateKey,
        parentStateKeys = [],
        childrenStateKeys = [],
        statePath,
        parentId,
    } = requestAction.condition;
    // TODO by CuongNT: Dang de tam phuong an nay, sau xet ki lai sau
    for(let i = 0; i < parentStateKeys.length; i++) {
        yield put(edgeActions.remove(parentId, id, parentStateKeys[i], statePath));
    }
    for(let i = 0; i < childrenStateKeys.length; i++) {
        yield put(edgeActions.remove(parentId, id, childrenStateKeys[i], statePath));
    }
    yield put(objectActions.remove(id, stateKey, statePath));
};

const doFetchDeleteObject = function* doFetchDeleteObject(requestAction) {
    const {api, id, header} = requestAction.condition;
    // TODO by CuongNT: xoa object truoc hay sau khi xoa thanh cong tren server
    // yield call(deleteObject, requestAction);
    yield call(fetchDeleteObject, api.delete.bind(api), requestAction, id, header);
};

const watchDeleteObject = function* watchDeleteObject() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(OBJECT_API.DELETE_UI);
        yield fork(doFetchDeleteObject, requestAction);
    }
};

// RESPONSE HANDLE: DELETE SUCCESS

const doDeleteObjectSuccess = function* doDeleteObjectSuccess(action) {
    // TODO by CuongNT: xoa object truoc hay sau khi xoa thanh cong tren server
    const {original, payload} = action;
    yield call(deleteObject, original);
    yield put({type: 'OBJECT_DELETE_API_SUCCESS_UPDATE_STATE', payload, original});
};

const isDeleteObjectSuccessAction = function isDeleteObjectSuccessAction(action) {
    const actionType = action.type;
    // return actionType.includes('_SUCCESS') && actionType.includes('_DELETE_');
    return actionType === OBJECT_API.DELETE.SUCCESS;
};

const watchDeleteObjectSuccess = function* watchDeleteObjectSuccess() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const fetchResult = yield take(isDeleteObjectSuccessAction);
        yield fork(doDeleteObjectSuccess, fetchResult);
    }
};

export {
    watchDeleteObject,
    watchDeleteObjectSuccess,
};
