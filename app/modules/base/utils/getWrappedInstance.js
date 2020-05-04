/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 02/03/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import _ from 'lodash';

/**
 * Tra ve instance chinh xac can tim
 * Neu co byPropName: tim duoc thi tra ve, khong thi tra ve null
 * Nguoc lai: luon tra ve ref cuoi cung tim duoc
 * @param element
 * @param byPropName tra ve instance co propname duoc tim
 * @returns {*}
 */
const getWrappedInstance = (element, byPropName) => {
    let found = false;
    let realRef = element;
    // realRef.wrappedInstance => neu la connect() cua Redux
    // realRef.refs.wrappedInstance => neu la injectIntl() của Intl
    // realRef.child => neu la withDragDropContext
    while (realRef && (realRef.child || realRef.wrappedInstance || (realRef.refs && realRef.refs.wrappedInstance))) {
        // realRef = realRef.wrappedInstance ? realRef.wrappedInstance : realRef.refs.wrappedInstance;
        realRef = realRef.child || realRef.wrappedInstance || realRef.refs.wrappedInstance;
        // Tim ref theo propsName hoac danh sach propName
        if (byPropName) {
            // Neu la tim theo 1 danh sach ten cac thuoc tinh. VD: byPropName = ['getOlder', 'getNewer']
            // => Dam bao ref do phai co tat ca cac ten thuoc tinh trong danh sach
            if (_.isArray(byPropName)) {
                let canBreak = true;
                for (let i = 0; i < byPropName.length; i++) {
                    if (!realRef[byPropName[i]]) {
                        canBreak = false;
                        // break for
                        break;
                    }
                }
                if (canBreak) {
                    found = true;
                    // break while
                    break;
                }
            } else if (_.isString(byPropName) && realRef[byPropName]) {
                // Neu la 1 propName. VD: byPropName = 'getOlder'
                found = true;
                // break while
                break;
            }
        }
    }
    // Neu get ref co dieu kien: tim duoc thi tra ve, khong thi tra ve null
    // Neu get ref khong co dieu kien: luon tra ve ref
    // return byPropName ? found ? realRef : null : realRef;
    return !byPropName || found ? realRef : null;
};

export default getWrappedInstance;
