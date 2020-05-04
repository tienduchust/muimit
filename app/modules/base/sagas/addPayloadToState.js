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

import {put} from './redux-saga-catch';
import {objectActions} from '../reducers/objectReducerActions';
import {edgeActions} from '../reducers/edgeReducerActions';

// TODO: LinhLTF xem lại cách dùng  searchKey, searchStateKeys.
// eslint-disable-next-line no-unused-vars
const addPayloadToStateWithoutMainStateKey = function* addPayloadToStateWithoutMainStateKey(payload, getType, statePath = [], mainStateKey, searchKey, searchStateKeys) {
    if (payload.status) {
        throw new Error('addPayloadToState::204 can handle response 204 truoc khi goi ham nay');
    }
    // Tự động phân tích response và thêm mới/cập nhật vào state tương ứng.
    const stateKeys = Object.keys(payload);
    for (let i = 0; i < stateKeys.length; i++) {
        // TODO: Phai thong nhat cach lam voi server de dam bao nguyen tac object duoc add vao state truoc, listid duoc add vao sau va trong do listid cua doi tuong chinh phai add sau cung.
        const key = stateKeys[i];
        const dataKey = payload[key];
        // Todo by cuongnt: fix tam day, sau se bo di
        if (!dataKey || !dataKey.first) continue;
        const isObject = dataKey.first() && dataKey.first().get('data');
        if (isObject) {
            // Du lieu object
            // CuongNT: Khong dong goi original vao action tiep theo.
            yield put(objectActions.addList(dataKey, key, statePath));
        }
    }

    for (let i = 0; i < stateKeys.length; i++) {
        // TODO: Phai thong nhat cach lam voi server de dam bao nguyen tac object duoc add vao state truoc, listid duoc add vao sau va trong do listid cua doi tuong chinh phai add sau cung.
        const key = stateKeys[i];
        const dataKey = payload[key];
        // Todo by cuongnt: fix tam day, sau se bo di
        if (!dataKey || !dataKey.first) continue;
        const isEdge = dataKey.first() && (dataKey.first().get('itemIds') || dataKey.first().get('items'));
        if (isEdge && mainStateKey !== key) {
            // TODO by CuongNT: hien chua co dieu kien de dam bao list id cua entry duoc insert cuoi cung
            // Du lieu canh.
            // CuongNT: Khong dong goi original vao action tiep theo.
            yield put(edgeActions.addList(getType, dataKey, key, statePath, mainStateKey, null, searchStateKeys));
        }
    }
};

// TODO: LinhLTF xoa tạm appendType (co the thua)
const addPayloadMainStateKeyToState = function* addPayloadMainStateKeyToState(payload, getType, statePath = [], mainStateKey, searchKey, searchStateKeys) {
    const stateKeys = Object.keys(payload);
    // DamBV: Chi add du lieu quyet dinh khi cac du lieu phu da hoan thanh.
    // VD: GetThread: userThreadIds  la du lieu quyet dinh.
    for (let i = 0; i < stateKeys.length; i++) {
        // TODO: Phai thong nhat cach lam voi server de dam bao nguyen tac object duoc add vao state truoc, listid duoc add vao sau va trong do listid cua doi tuong chinh phai add sau cung.
        const key = stateKeys[i];
        const dataKey = payload[key];
        // Todo by cuongnt: fix tam day, sau se bo di
        if (!dataKey || !dataKey.first) continue;
        const isEdge = dataKey.first() && (dataKey.first().get('itemIds') || dataKey.first().get('items'));
        if (isEdge && mainStateKey === key) {
            // TODO by CuongNT: hien chua co dieu kien de dam bao list id cua entry duoc insert cuoi cung
            // Du lieu canh.
            // CuongNT: Khong dong goi original vao action tiep theo.
            yield put(edgeActions.addList(getType, dataKey, key, statePath, mainStateKey, searchKey, searchStateKeys));
        }
    }
};
// TODO: LinhLTf them searchStateKeys
const addPayloadToState = function* addPayloadToState(payload, getType, statePath = [], mainStateKey, searchKey, searchStateKeys) {
    yield addPayloadToStateWithoutMainStateKey(payload, getType, statePath, mainStateKey, searchKey, searchStateKeys);
    yield addPayloadMainStateKeyToState(payload, getType, statePath, mainStateKey, searchKey, searchStateKeys);
};

export {
    addPayloadToState,
    addPayloadToStateWithoutMainStateKey,
};
