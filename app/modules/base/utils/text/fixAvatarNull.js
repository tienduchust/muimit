/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author congtm@bkav.com on 30/05/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

function fixAvatarNull(account) {
    if (!account) return account;

    let _account = '';
    if(account.includes('@')) {
        _account = account.substring(0, account.indexOf('@'));
    } else {
        _account = account;
    }
    return `https://danhba.bkav.com/avatars/${_account}.bmp`;
}

export default fixAvatarNull;
