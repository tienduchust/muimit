/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 02/01/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import {fromJS, isKeyed, Map} from 'immutable';
import isPayloadWithStateKey from './isPayloadWithStateKey';

const convertToImmutableJs = (payload, objKey = [], includeRoot = false) => {
    // Neu la payload bao: 204... thi bo qua
    if (payload.status) {
        return payload;
    }

    let result = includeRoot ? Map() : {};
    // Neu la full goi tin, gom ca stateKey
    if (isPayloadWithStateKey(payload)) {
        // Todo by phucnhb: Fix tam loi khong convert duoc dang toOrderedSet khi khong dung dinh dang la itemIds.
        Object.keys(payload).forEach((stateKey) => {
            const resultStateKey = fromJS(payload[stateKey], (key, value) => isKeyed(value) ? value.toMap() : key === 'itemIds' || key === 'groupConfigs' || objKey.includes(stateKey) ? value.toOrderedSet() : value.toList());
            if (includeRoot) {
                result = result.set(stateKey, resultStateKey);
            } else {
                result[stateKey] = resultStateKey;
            }
        });
    } else {
        result = fromJS(payload, (key, value) => isKeyed(value) ? value.toMap() : key === 'itemIds' || key === 'groupConfigs' ? value.toOrderedSet() : value.toList());
    }
    return result;
};

export default convertToImmutableJs;


