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

import {Map, OrderedSet} from 'immutable';
import isEqual from 'lodash/isEqual';

import {take, fork, call, select, put} from './redux-saga-catch';
import {fetchEntity} from '../apis/fetchEntity';
import {objectApi, OBJECT_API} from '../apis/objectApiActions';
import {edgeActions} from '../reducers/edgeReducerActions';
import {addPayloadToState} from './addPayloadToState';
import {GET_LIST_TYPE} from '../configs/Constants';

const isGetListSuccessAction = function isGetListSuccessAction(action) {
    const actionType = action.type;
    return actionType === OBJECT_API.GET_LIST.SUCCESS;
};

/**
 * workers
 */

const fetchGetList = fetchEntity.bind(null, objectApi.getList);

const getSearchParamsForState = function getSearchParamsForState(params) {
    const _params = Object.assign({}, params);
    delete _params.limit;
    delete _params.minScore;
    delete _params.maxScore;
    delete _params.minscore;
    delete _params.maxscore;
    return _params;
};

const isEqualSearchParams = function isEqualSearchParams(params1, params2) {
    const _params1 = getSearchParamsForState(params1);
    const _params2 = getSearchParamsForState(params2);
    return isEqual(_params1, _params2);
};

const REQUESTING = {};

const isDuplicateRequest = function isDuplicateRequest(requestAction) {
    const {condition, payload} = requestAction;
    // TODO by CuongNT: dang fix tam do cac request auth chua viet theo base nen api khong co
    if (!condition || !condition.api) {
        return false;
    }
    const searchParams = payload || {};
    const {api, parentId} = condition;
    const uri = api.uriCompile({parentId});
    if (
        REQUESTING[uri]
        && REQUESTING[uri].parentId === parentId
        && isEqualSearchParams(searchParams, REQUESTING[uri].searchParams)
    ) {
        return true;
    }
    REQUESTING[uri] = {parentId, searchParams};
    return false;
};

const getListIsFinished = function getListIsFinished(requestAction) {
    const {condition} = requestAction;
    // TODO by CuongNT: dang fix tam do cac request auth chua viet theo base nen api khong co
    if (!condition || !condition.api) {
        return;
    }
    const {api, parentId} = condition;
    const uri = api.uriCompile({parentId});
    delete REQUESTING[uri];
};

const doFetchGetList = function* doFetchGetList(requestAction) {
    // debugger;
    const {condition} = requestAction;
    // TODO by CuongNT: Can chuan hoa lai cach xu ly voi searchKey cho selector truyen theo action
    // CuongNT: neu la get NEWER, OLDER xong state chua co du lieu => chuyen ve FIRST
    const {selector, parentId, searchKey, mainStateKey, statePath, forceGet = false, skip204} = condition;
    const queryId = searchKey || parentId;

    // Xac dinh searchParams cuoi cung khi post len server theo cach:
    const {payload} = requestAction;
    let searchParams = payload || {};
    const _searchParams = yield select(selector.getSearchParams, queryId);
    const _searchParamsJs = _searchParams && _searchParams.size > 0 ? _searchParams.toJS() : {};

    // Fix loi 1 so request khong truyen getType nen lien tuc bi truy van len server. VD: request getUser du truoc do da lay list user roi.
    let {getType = GET_LIST_TYPE.FIRST} = condition;

    const minScore = yield select(selector.getMinScore, queryId) || 0;
    const maxScore = yield select(selector.getMaxScore, queryId) || 0;
    const itemIds = yield select(selector.getItemIds, queryId) || OrderedSet();
    const hasItemIds = minScore > 0 && maxScore > 0 && itemIds.size > 0;

    // La lay lan dau khi: state chua co du lieu hoac searchParam thay doi (vd: tim kiem thi dieu kien thay doi thi coi la lay tu dau)
    // TODO by NamVH : Chỗ này chưa hợp lý => Nếu lần đầu gửi getMid => vẫn nhận là getFirst. => đang fix tạm để các phần khác không bị ảnh hưởng.
    if ((!hasItemIds || !isEqualSearchParams(searchParams, _searchParamsJs)) && (getType !== GET_LIST_TYPE.MID)) {
        getType = GET_LIST_TYPE.FIRST;
        // CuongNT: gan lay getType cho dung ban chat cua request de xu ly o after chuan
        requestAction.condition.getType = GET_LIST_TYPE.FIRST;
    }

    // debugger;

    const older204 = yield select(selector.getInfo, queryId, 'older204');
    if (
        (
            ( // Neu la FIRST - bo qua khi:
                getType === GET_LIST_TYPE.FIRST && (
                    //  Da co du lieu trong state + dieu kien loc khong thay doi
                    (hasItemIds && isEqualSearchParams(searchParams, _searchParamsJs))
                    // Hoac: khong con tin can lay tren server
                    // TODO by NhatPA: Xem xét thêm tham số skip204
                    // Trường hợp request trước không có nội dung thì lần này vẫn được call, dùng trong Mapp App
                    || (older204 === true && !skip204)
                )
            ) ||
            (
                // Neu la OLDER - bo qua khi: khong con tin tren server
                getType === GET_LIST_TYPE.OLDER && older204 === true
            ) ||
            (
                isDuplicateRequest(requestAction)
            )
        )
        && !forceGet
    ) {
        const {fetchIsFinished} = condition;
        if (typeof fetchIsFinished === 'function') {
            fetchIsFinished({rejected: true});
        }
        return;
    }
    if (Object.keys(searchParams).length <= 0) {
        searchParams = _searchParamsJs;
        // CuongNT: gan lai payload cho dung ban chat request de xu ly o after chuan
        requestAction.payload = _searchParamsJs;
    }

    const {api, header = {}} = condition;
    if (requestAction && requestAction.condition) {
        requestAction.condition.getListIsFinished = getListIsFinished;
    }

    // NamVH : Cập nhập lại getType => để tính toán đúng về sau.
    requestAction.condition.getType = getType;
    if (getType === GET_LIST_TYPE.FIRST) {
        if (hasItemIds && !isEqualSearchParams(searchParams, _searchParamsJs)) {
            // Thuc hien xoa list trong state hien tai de lay lai tu du
            yield put(edgeActions.addInfo(queryId, 'maxScore', 0, mainStateKey, statePath));
            yield put(edgeActions.addInfo(queryId, 'minScore', 0, mainStateKey, statePath));
            yield put(edgeActions.removeAll(queryId, mainStateKey, statePath));
        }
        yield call(fetchGetList, api.getList.bind(api), requestAction, parentId, null, getType, searchParams, header);
    } else if (getType === GET_LIST_TYPE.MID) {
        yield call(fetchGetList, api.getList.bind(api), requestAction, parentId, null, getType, searchParams, header);
    } else if (getType === GET_LIST_TYPE.NEWEST) {
        yield call(fetchGetList, api.getList.bind(api), requestAction, parentId, null, getType, searchParams, header);
    } else {
        // nếu không phải là lấy cũ thì là lấy mới gần nhất.
        const currentScore = getType === GET_LIST_TYPE.OLDER ? minScore : maxScore;
        yield call(fetchGetList, api.getList.bind(api), requestAction, parentId, currentScore, getType, searchParams, header);
    }
};

// RESPONSE HANDLE: GET_LIST SUCCESS
// TODO: LinhLTf sửa tạm, thêm searchStateKeys vào mount cho cục HasGroup
const doGetListSuccess = function* doGetListSuccess(fetchResult) {
    const {payload = {}, original} = fetchResult;
    const {condition} = original;
    const {getType, statePath, mainStateKey, searchKey, parentId, searchStateKeys = {}} = condition;
    const queryId = searchKey || parentId;

    // NamVH : nếu là getMid thì xóa searchParams.
    // Cap nhat dieu kien truy van danh sach neu co vao state

    const searchParams = (getType === GET_LIST_TYPE.MID) ? {} : getSearchParamsForState(original.payload); // CuongNT: body cua request get chinh la searchParams
    // CuongNT: searchKey la key danh cho mainStateKey, khong dung cho stateKey
    yield put(edgeActions.updateSearchParams(queryId, Map(searchParams), mainStateKey, statePath));

    // NamVH : Cập nhập trạng thái mid -> khi getMid  (để xử lý thêm một số trường hợp).
    if (getType === GET_LIST_TYPE.MID) {
        yield put(edgeActions.addInfo(queryId, 'mid', true, mainStateKey, statePath));
    }

    // CuongNT: Kiem tra neu la 204, tuc da het du lieu de lay => update state de bo qua cac lan yeu cau sau
    if (payload && payload.status === 204) {
        if (getType === GET_LIST_TYPE.OLDER) {
            // Cap nhat da het du lieu cu hon
            yield put(edgeActions.addInfo(queryId, 'older204', true, mainStateKey, statePath));
        } else if (getType === GET_LIST_TYPE.NEWER) {
            // Cap nhat da het du lieu moi hon
            yield put(edgeActions.addInfo(queryId, 'newer204', true, mainStateKey, statePath));
            // Cập nhập hết trạng thái ở mid.
            yield put(edgeActions.addInfo(queryId, 'mid', false, mainStateKey, statePath));
        } else {
            // Cap nhat da het du lieu co the lay
            yield put(edgeActions.addInfo(queryId, 'older204', true, mainStateKey, statePath));
            yield put(edgeActions.addInfo(queryId, 'newer204', true, mainStateKey, statePath));
        }
        yield put({type: 'OBJECT_GET_LIST_API_SUCCESS_UPDATE_STATE', payload, original});
        return;
    }

    // Tu dong add response vao state.
    yield call(addPayloadToState, payload, getType, statePath, mainStateKey, searchKey, searchStateKeys);
    yield put({type: 'OBJECT_GET_LIST_API_SUCCESS_UPDATE_STATE', payload, original});
};

const watchGetList = function* watchGetList() {
    // eslint-disable-next-line no-constant-condition
    while(true) {
        const requestAction = yield take(OBJECT_API.GET_LIST_UI);
        yield fork(doFetchGetList, requestAction);
    }
};

const watchGetListSuccess = function* watchGetListSuccess() {
    while(true) {
        const fetchResult = yield take(isGetListSuccessAction);
        yield fork(doGetListSuccess, fetchResult);
    }
};

export {
    watchGetList,
    watchGetListSuccess,
    getListIsFinished,
};
