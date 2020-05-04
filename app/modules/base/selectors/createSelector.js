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

const _createSelector = (selector, statePath) => (state, ...args) => selector(state.getIn([...statePath]), ...args);

/**
 * createSelector: Tạo selector
 * @param {*} selectors
 * @param {*} stateKey
 * @param {*} statePath
 */
const createSelector = (selectors, statePath = []) => Object.keys(selectors).reduce((final, key) => {
    final[key] = _createSelector(selectors[key], statePath);
    return final;
}, {});

export default createSelector;
