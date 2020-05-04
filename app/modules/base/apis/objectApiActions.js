/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 06/12/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {createActionNoAppID, createFetchTypes} from '../actions';
import checkPropertiesIsRequired from '../utils/checkPropertiesIsRequired';
import convertToImmutableJs from '../utils/convertToImmutableJs';

const OBJECT_API = {
    GET: createFetchTypes('OBJECT_GET_API'),
    GET_UI: 'OBJECT_GET_UI',
    GET_LIST: createFetchTypes('OBJECT_GET_LIST_API'),
    GET_LIST_UI: 'OBJECT_GET_LIST_UI',
    POST: createFetchTypes('OBJECT_POST_API'),
    POST_UI: 'OBJECT_POST_UI',
    PUT: createFetchTypes('OBJECT_PUT_API'),
    PUT_UI: 'OBJECT_PUT_UI',
    PATCH: createFetchTypes('OBJECT_PATCH_API'),
    PATCH_UI: 'OBJECT_PATCH_UI',
    DELETE: createFetchTypes('OBJECT_DELETE_API'),
    DELETE_UI: 'OBJECT_DELETE_UI',
};

/**
 * Handle kết quả trả về của yêu cầu lấy dữ liệu của 1 đối tượng, vd: lấy thông tin chi tiết 1 bài viết.
 */
const get = {
    request: (original) => createActionNoAppID(OBJECT_API.GET.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.GET.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.GET.FAILURE, error, original),
};

const getUi = (payload, condition) => {
    checkPropertiesIsRequired(condition, 'id', 'selector', 'api');
    return createActionNoAppID(OBJECT_API.GET_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về của yêu cầu lấy danh sách object, vd: lấy danh sách tin trong 1 group, lấy danh sách comment...
 */
const getList = {
    request: (original) => createActionNoAppID(OBJECT_API.GET_LIST.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.GET_LIST.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.GET_LIST.FAILURE, error, original),
};

const getListUi = (searchParams, condition) => {
    checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api', 'mainStateKey'); // 'getType'
    const _searchParams = Object.assign({}, searchParams); // CuongNT: body cua request get chinh la searchParams
    delete _searchParams.limit;
    delete _searchParams.minScore;
    delete _searchParams.maxScore;
    delete _searchParams.minscore;
    delete _searchParams.maxscore;
    const hasSearchParams = _searchParams && Object.keys(_searchParams).length > 0;
    if (condition.searchKey && (!condition.mainStateKey || !hasSearchParams)
        || hasSearchParams && (!condition.mainStateKey || !condition.searchKey)) {
        // CuongNT: Kiem soat dam bao dung logic
        throw new Error('searchKey, mainStateKey, searchParams bat buoc di kem voi nhau');
    }
    return createActionNoAppID(OBJECT_API.GET_LIST_UI, searchParams, null, condition);
};

/**
 * Handle kết quả trả về của yêu cầu tạo mới 1 đối tượng, vd: gửi 1 bài viết trong group, gửi 1 comment...
 */
const post = {
    request: (original) => createActionNoAppID(OBJECT_API.POST.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.POST.SUCCESS, response, original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.POST.FAILURE, error, original),
};

const postUi = (payload, condition) => {
    // debugger;
    checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api');
    return createActionNoAppID(OBJECT_API.POST_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về của yêu cầu cập nhật dữ liệu của 1 đối tượng, vd: Sửa bài viết trong group, sửa comment...
 */
const put = {
    request: (original) => createActionNoAppID(OBJECT_API.PUT.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.PUT.SUCCESS, response, original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.PUT.FAILURE, error, original),
};

const putUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(OBJECT_API.PUT_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về của yêu cầu cập nhật 1 PHẦN dữ liệu của 1 đối tượng, vd: Thay đổi 1 config trong bảng các điều kiện config nhóm.
 */
const patch = {
    request: (original) => createActionNoAppID(OBJECT_API.PATCH.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.PATCH.SUCCESS, response, original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.PATCH.FAILURE, error, original),
};

const patchUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(OBJECT_API.PATCH_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về của yêu cầu xóa bỏ 1 đối tượng, vd: xóa bài viết, xóa comment...
 */
const remove = {
    request: (original) => createActionNoAppID(OBJECT_API.DELETE.REQUEST, original),
    success: (original, response) => createActionNoAppID(OBJECT_API.DELETE.SUCCESS, response, original),
    failure: (original, error) => createActionNoAppID(OBJECT_API.DELETE.FAILURE, error, original),
};

const removeUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(OBJECT_API.DELETE_UI, payload, null, condition);
};

const objectApi = {
    get,
    getList,
    post,
    put,
    patch,
    remove,
    getUi,
    getListUi,
    postUi,
    putUi,
    patchUi,
    removeUi,
};

export {
    OBJECT_API,
    objectApi,
};
