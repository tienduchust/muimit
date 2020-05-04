/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author phucnhb@bkav.com on 15/05/19.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */
'use strict';

import {AsyncStorage} from 'react-native';

class Cookie {
    constructor() {}

    get(name) {
        return Promise.resolve(AsyncStorage.getItem(name));
    }

    set(name, value, options) {
        AsyncStorage.setItem(name, value);
    }

    remove(name, options) {
        AsyncStorage.removeItem(name);
    }

    getQuerys(results) {
        let headerFields = {};
        results && results.forEach((result) => {
            headerFields = Object.assign({[result[0]]: result[1]}, headerFields);
        });
        return Promise.resolve(headerFields);
    }

    getList(keys) {
        return Promise.resolve(AsyncStorage.multiGet(keys)).then(result => this.getQuerys(result));
    }
}

const cookie = new Cookie();

export default cookie;
