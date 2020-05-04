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

import {buffers, delay} from 'redux-saga';
import {take, fork, call, select, put, cancel, actionChannel} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {objectApi, OBJECT_API} from '../apis/objectApiActions';
import {add} from '../reducers/objectReducerActions';
import {addPayloadToState} from './addPayloadToState';
import isPayloadWithStateKey from '../utils/isPayloadWithStateKey';
import {GET_LIST_TYPE} from '../configs/Constants';
import cookies from '../utils/cookies';
import * as windowUserSelector from '../selectors/windowSelector';
import {doAddObjectData, doUpdateCountObjectRender} from './windowSaga';

/**
 * GET: Xu ly ket qua tra ve khi GET thanh cong
 */

const REQUESTING = {};
const BUFFER_COUNT = 100;
let objectMountIds = [];
let objectUnMountIds = [];

/**
 *  FUNCTION
 */

const isGetObjectSuccessAction = function isGetObjectSuccessAction(action) {
    const actionType = action.type;
    return actionType === OBJECT_API.GET.SUCCESS;
};

const isGetObjectDidMount = function isGetObjectDidMount(action) {
    return action.type === 'DECORATE_GET_OBJECT';
};

const isDuplicateRequest = function isDuplicateRequest(requestAction) {
    const {condition} = requestAction;
    // TODO by CuongNT: dang fix tam do cac request auth chua viet theo base nen api khong co
    if (!condition || !condition.api) {
        return false;
    }
    const {api, id} = condition;
    const uri = api.uriCompile({id});
    if (REQUESTING[uri] === id) {
        return true;
    }
    REQUESTING[uri] = id;
    return false;
};

const getIsFinished = function getIsFinished(requestAction) {
    const {condition} = requestAction;
    // TODO by CuongNT: dang fix tam do cac request auth chua viet theo base nen api khong co
    if (!condition || !condition.api) {
        return;
    }
    const {api, id} = condition;
    const uri = api.uriCompile({id});
    delete REQUESTING[uri];
};

const _fetchIsFinished = () => {};

const fetchGetObject = fetchEntity.bind(null, objectApi.get);

const doFetchGetObject = function* doFetchGetObject(requestAction) {
    const {condition} = requestAction;
    const {payload} = requestAction;
    if (isDuplicateRequest(requestAction)) {
        const {fetchIsFinished = _fetchIsFinished} = condition;
        fetchIsFinished({rejected: true});
        return;
    }
    const {selector, api, id, forceGet = false, header = {}} = condition;
    if (requestAction && requestAction.condition) {
        requestAction.condition.getIsFinished = getIsFinished;
    }
    // HieuNVb: trường hợp ép lấy mới hoặc thêm thông tin
    if (forceGet) {
        yield call(fetchGetObject, api.get.bind(api), requestAction, id, payload, header);
    } else {
        // CuongNT: Kiem tra dam bao chua co _object trong state thi truy van server, cho roi thi thoi.
        const _object = yield select(selector.get, id);
        if(!_object) {
            yield call(fetchGetObject, api.get.bind(api), requestAction, id, payload, header);
        }
    }
};

const doGetObjectSuccess = function* doGetObjectSuccess(fetchResult) {
    const {payload, original} = fetchResult;
    if (payload.status !== 204) {
        // CuongNT: voi get 1 object, co 2 cach server co the tra ve, theo quy uoc:
        // - C1: tra ve full stateKey nhu getList. Phuc vu truc tiep nhu cau lay 1 object cu the cho 1 list nao do. VD: lay thread chat de chat.
        // - C2: tra ve du lieu trong data cua 1 object. Chi dung khi can lay object de xem chi tiet. VD: edit 1 object bat ki.
        if (isPayloadWithStateKey(payload)) {
            const {statePath, mainStateKey, searchKey, getType = GET_LIST_TYPE.OLDER} = original.condition;
            yield call(addPayloadToState, payload, getType, statePath, mainStateKey, searchKey);
        } else {
            yield call(add, payload);
        }
    }
    yield put({type: 'OBJECT_GET_API_SUCCESS_UPDATE_STATE', payload, original});
};

const doAfterGetObjectSuccess = function doAfterGetObjectSuccess(fetchResult) {
    const {id} = fetchResult.original.condition;
    objectMountIds = objectMountIds.filter((item) => item.objectId !== id);
};

const doUpdateCountObjectDisplay = function* doUpdateCountObjectDisplay(payload) {
    const {objectId, status} = payload;
    const meId = call(cookies.get, 'meId');
    if(objectId !== meId) {
        const dataCount = yield select(windowUserSelector.getCount, objectId);
        if(status === 'mount') {
            if(dataCount) {
                doUpdateCountObjectRender(objectId, dataCount + 1);
            } else {
                doAddObjectData(objectId);
            }
        }
        if(status === 'unmount') {
            if(dataCount && dataCount > 0) {
                doUpdateCountObjectRender(objectId, (dataCount - 1));
            }
        }
    }
};

const doGetObjectDisplay = function* doGetObjectDisplay() {
    if(objectMountIds.length > 0) {
        yield* objectMountIds.map(function* getUser(item) {
            yield put(item.getAction(item.objectId, item.condition));
        });
    }
};

const doDeleteObjectUnMount = function* doDeleteObjectUnMount() {
    // function xu ly khi so luong UnMount cua mot user ve O.
    // yield put(usersAction.user.removeList(objectUnMountIds));
    // yield put((windowUserAction.userSubscribe.deleteData(objectUnMountIds)));
};

const doHandleGetObjectDisplay = function* doHandleGetObjectDisplay(payload) {
    const {objectId, getAction, status, condition} = payload;
    const dataCount = yield select(windowUserSelector.getCount, objectId);
    if(status === 'mount' && !dataCount) {
        // Xu ly push cac Id can duoc gui request vao mang cua cac id gui len server
        const meId = call(cookies.get, 'meId');
        if(objectId !== meId) {
            objectMountIds.push({objectId, getAction, condition});
            const indexUnSub = objectUnMountIds.filter((item) => item.objectId === objectId);
            if(indexUnSub.length > 0) {
                objectUnMountIds = objectUnMountIds.filter((item) => item.objectId !== objectId);
            }
        }
    } else if(status === 'unmount' && dataCount === 1) {
        // Xu ly push cac Id can duoc xu lu=y khi count = 0 vao mang cua cac id
        objectUnMountIds.push({objectId, getAction, condition});
    }
    // Chờ 0,1s nếu khong có user nào được mount/unmount trên giao diện sẽ thực hiện get List user về.
    yield call(delay, 100);
    yield fork(doGetObjectDisplay);
    yield fork(doDeleteObjectUnMount);
};


/**
 *  WATCHER
 */
const watchGetObject = function* watchGetObject() {
    while(true) {
        const requestAction = yield take(OBJECT_API.GET_UI);
        yield fork(doFetchGetObject, requestAction);
    }
};

// RESPONSE HANDLE: GET
const watchGetObjectSuccess = function* watchGetObjectSuccess() {
    while(true) {
        const fetchResult = yield take(isGetObjectSuccessAction);
        yield fork(doGetObjectSuccess, fetchResult);
        yield fork(doAfterGetObjectSuccess, fetchResult);
    }
};

const watchObjectDisplay = function* watchObjectDisplay() {
    let task;
    // CongTM: tao bo nho dem de luu tru nhung action vao sau ma action truoc chua thuc hien xong
    const requestChanUser = yield actionChannel((action) => isGetObjectDidMount(action), buffers.sliding(BUFFER_COUNT));
    while(true) {
        const fetchResult = yield take(requestChanUser);
        if (task) {
            yield cancel(task);
        }
        task = yield fork(doHandleGetObjectDisplay, fetchResult.payload);
        yield call(doUpdateCountObjectDisplay, fetchResult.payload);
    }
};

export {
    watchGetObject,
    watchGetObjectSuccess,
    getIsFinished,
    // CongTM: getUpjectDidMount,
    watchObjectDisplay,
};

