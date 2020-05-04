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

// TODO: bo sung dieu kien actionKey la bat buoc de dam bao bat rieng action nay duoc.

const EDGE_API = {
    GET: createFetchTypes('EDGE_GET_API'),
    GET_UI: 'EDGE_GET_UI',
    POST: createFetchTypes('EDGE_POST_API'),
    POST_UI: 'EDGE_POST_UI',
    PUT: createFetchTypes('EDGE_PUT_API'),
    PUT_UI: 'EDGE_PUT_UI',
    PATCH: createFetchTypes('EDGE_PATCH_API'),
    PATCH_UI: 'EDGE_PATCH_UI',
    DELETE: createFetchTypes('EDGE_DELETE_API'),
    DELETE_UI: 'EDGE_DELETE_UI',
    PUT_LIST: createFetchTypes('EDGE_PUT_LIST_API'),
    PUT_LIST_UI: 'EDGE_PUT_LIST_UI',
    POST_LIST: createFetchTypes('EDGE_POST_LIST_API'),
    POST_LIST_UI: 'EDGE_POST_LIST_UI',
};

/**
 * Handle kết quả trả về dữ liệu 1 mối quan hệ theo yêu cầu
 */
const get = {
    request: (original) => createActionNoAppID(EDGE_API.GET.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.GET.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.GET.FAILURE, error, original),
};

const getUi = (payload, condition) => {
    checkPropertiesIsRequired(condition, 'parentId', 'id', 'selector', 'api');
    return createActionNoAppID(EDGE_API.GET_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về sau khi tạo 1 mối quan hệ mới, vd: thêm người dùng vào phòng ban (tạo mối quan hệ người dùng <-> phòng ban)
 */
const post = {
    request: (original) => createActionNoAppID(EDGE_API.POST.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.POST.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.POST.FAILURE, error, original),
};

const postUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.POST_UI, payload, null, condition);
};

// CuongNT: Da xu ly bang cach khac, hien khong con dung.
// const postUiByMe = (payload, condition) => {
//     // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
//     checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api', 'stateKey');
//     // condition.id = '';
//     return createActionNoAppID(EDGE_API.POST_UI, payload, null, condition);
// };

/**
 * Handle kết quả trả về sau khi cập nhật dữ liệu của 1 mối quan hệ, vd: cập nhật vai trò, chức vụ/chức danh của 1 người dùng trong 1 phòng ban
 */
const put = {
    request: (original) => createActionNoAppID(EDGE_API.PUT.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.PUT.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.PUT.FAILURE, error, original),
};

const putUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.PUT_UI, payload, null, condition);
};

// CuongNT: Da xu ly bang cach khac, hien khong con dung.
// const putUiByMe = (payload, condition) => {
//     // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
//     checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api', 'stateKey');
//     condition.id = '';
//     return createActionNoAppID(EDGE_API.PUT_UI, payload, null, condition);
// };

/**
 * Handle kết quả trả về sau khi cập nhật 1 phần dữ liệu của 1 mối quan hệ, vd: cập nhật nickname của thành viên trong nhóm chat (ngoài nickname còn có lastSent, lastRead...)
 */
const patch = {
    request: (original) => createActionNoAppID(EDGE_API.PATCH.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.PATCH.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.PATCH.FAILURE, error, original),
};

const patchUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.PATCH_UI, payload, null, condition);
};

/**
 * Handle kết quả trả về sau khi xóa 1 mối quan hệ, vd: Xóa người dùng khỏi phòng ban (chỉ xóa quan hệ, người dùng không bị xóa).
 */
const remove = {
    request: (original) => createActionNoAppID(EDGE_API.DELETE.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.DELETE.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.DELETE.FAILURE, error, original),
};

const removeUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'id', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.DELETE_UI, payload, null, condition);
};

// PhucNHb: Viet tam ham put list
/**
 * Handle kết quả trả về sau khi cập nhật dữ liệu của 1 mối quan hệ, vd: cập nhật vai trò, chức vụ/chức danh của 1 người dùng trong 1 phòng ban
 */
const putList = {
    request: (original) => createActionNoAppID(EDGE_API.PUT_LIST.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.PUT_LIST.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.PUT_LIST.FAILURE, error, original),
};

const putListUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.PUT_LIST_UI, payload, null, condition);
};

const postList = {
    request: (original) => createActionNoAppID(EDGE_API.POST_LIST.REQUEST, original),
    success: (original, response) => createActionNoAppID(EDGE_API.POST_LIST.SUCCESS, convertToImmutableJs(response), original),
    failure: (original, error) => createActionNoAppID(EDGE_API.POST_LIST.FAILURE, error, original),
};

const postListUi = (payload, condition) => {
    // TODO by CuongNT: can stateKey do action nay chua chi ro ten vung state bi tac dong. Se khong phai truyen khi dung mapHrefToStateKey + thu vien get oType tu objectId
    checkPropertiesIsRequired(condition, 'parentId', 'selector', 'api', 'stateKey');
    return createActionNoAppID(EDGE_API.POST_LIST_UI, payload, null, condition);
};

const edgeApi = {
    get,
    post,
    put,
    patch,
    remove,
    putList,
    postList,
    getUi,
    postUi,
    // postUiByMe,
    putUi,
    // putUiByMe,
    patchUi,
    removeUi,
    putListUi,
    postListUi,
};

export {
    EDGE_API,
    edgeApi,
};
