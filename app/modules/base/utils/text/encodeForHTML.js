/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 25/01/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import ESAPI from 'node-esapi';

const encoder = ESAPI.encoder();

/**
 * Tra ve text an toan. Loai bo toan bo HTML trong noi dung
 * Dung khi xu ly string truoc khi hien thi len giao dien.
 * @param str chuoi can trich suat text
 * @returns {*}
 */
function encodeForHTML(str) {
    return encoder.encodeForHTML(str);
}

export default encodeForHTML;
