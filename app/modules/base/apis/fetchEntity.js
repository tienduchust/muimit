/**
 * Copyright 2016-present, Bkav Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author congtm@bkav.com on 21/07/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import { delay } from 'redux-saga';
import {put, call, cancelled} from '../sagas/redux-saga-catch';
import cookies from '../utils/cookies';
// import {getListIsFinished} from '../sagas/objectGetList';
// import {getIsFinished} from '../sagas/objectGet';

const retryApi = function* retryApi(retry = 1, apiFn, ...args) {
    let _apiResponse;
    for(let i = 0; i < retry; i++) {
        const apiResponse = yield call(apiFn, ...args);
        _apiResponse = apiResponse;
        if (apiResponse.response) {
            return apiResponse;
        }
        if (apiResponse.error) {
            if(i < 4) {
                yield call(delay, 4000);
            }
        }
    }
    // attempts failed after 5 attempts
    return _apiResponse;
};

/**
 * Hàm mẫu chứa kịch bản truy vấn tới server chung
 *
 * @param {object} entity Action callback when doing fetching
 * @param {function} apiFn Ham goi Api cua server
 * @param {object} original Action goc yeu cau fetch len server
 * @param {string} args Du lieu can gui len server
 * @return {boolean} Whether something occurred.
 */
const fetchEntity = function* fetchEntity(entity, apiFn, original, ...args) {
    try {
        // TODO by CuongNT: chuyen ...args thanh request => Dam bao yeu cau goc duoc dong goi trong thuoc tinh request
        // TODO by CuongNT: fix tam phuong an nay do van con code cu gui request len server khong theo chuan, lam exception cho nay
        if (!entity || !entity.request || !entity.success || !entity.failure) {
            return null;
        }
        yield put(entity.request(original));
        // TODO by CuongNT: Retrying XMR calls: https://redux-saga.js.org/docs/recipes/
        // const {response, error} = yield call(apiFn, ...args);
        // fetchRetry: so lan gui thu lai len server khi co loi. Mac dinh chi gui 1 lan.
        const fetchRetry = original && original.condition && original.condition.fetchRetry ? original.condition.fetchRetry : 1;
        const {response, error} = yield call(retryApi, fetchRetry, apiFn, ...args);

        // console.log('apiFn', apiFn, 'original', original);
        if (original && original.condition && original.condition.fetchIsFinished && typeof original.condition.fetchIsFinished === 'function') {
            yield original.condition.fetchIsFinished();
        }
        if (original && original.condition && typeof original.condition.getIsFinished === 'function') {
            original.condition.getIsFinished(original);
        }
        if (original && original.condition && typeof original.condition.getListIsFinished === 'function') {
            original.condition.getListIsFinished(original);
        }

        // success
        if (response) {
            if (original && original.condition && original.condition.fetchIsSuccess && typeof original.condition.fetchIsSuccess === 'function') {
                yield original.condition.fetchIsSuccess(original, response);
            }
            yield put(entity.success(original, response));
            return response;
        }
        // failure
        yield put(entity.failure(original, error));
        if (original && original.condition && original.condition.fetchIsError && typeof original.condition.fetchIsError === 'function') {
            yield original.condition.fetchIsError(original, error);
        }
        const token = yield call(cookies.get, 'token');
        const companyId = yield call(cookies.get, 'companyId');
        // CuongNT - 27/12/2017: Kiem tra, neu la 401 Unauthorized thi chuyen logout
        if (companyId && token && error && error.response && error.response.status === 401) {
            // console.log('fetchEntity', companyId, token);
            const href = window.location.href;
            const url = new URL(href);
            const backUrl = url.searchParams.get('return_to') || href;
            // TODO by CuongNT: sau chuan lai ve 1 action logout thoi. Hien dang nhieu noi xu ly changrouter kieu nay, kho kiem soat.
            yield put({type: 'DO_LOGOUT_401', backUrl, original});
            // yield put(push(`/logout?return_to=${encodeURIComponent(backUrl)}`));
        }
        return error;
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
};

export {
    fetchEntity,
};

export default fetchEntity;
