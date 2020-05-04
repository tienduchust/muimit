/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author phucnhb@bkav.com on 01/10/18.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import Storage from './storage';

class StorageBase extends Storage {
    constructor() {
        super();
        this.setStorageBackend = this.setStorageBackend.bind(this);
        this.getNameModule = this.getNameModule.bind(this);
        this.getItem = this.getItem.bind(this);
        this.setItem = this.setItem.bind(this);
        this.getListItems = this.getListItems.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.setExpires = this.setExpires.bind(this);
        this.getExpires = this.getExpires.bind(this);
    }

    setStorageBackend(nameModule, storageBackend) {
        if (typeof nameModule !== 'string') {
            throw new Error('nameModule:: nameModule bắt buộc truyền vào phải là dạng string.');
        } else {
            if (nameModule !== 'Cookie' && nameModule !== 'AsyncStorage') {
                throw new Error('nameModule:: nameModule bắt buộc truyền vào phải có tên là "Cookie" hoặc "AsyncStorage"');
            }
        }
        super.setStorageBackend(nameModule, storageBackend);
    }

    getNameModule() {
        return super.getNameModule();
    }

    getItem(key) {
        if (typeof key !== 'string') {
            throw new Error('key:: key bắt buộc truyền vào phải là dạng string');
        }
        return super.getItem(key);
    }

    setItem(key, value, withoutSub) {
        if (typeof key !== 'string') {
            throw new Error('key:: key bắt buộc truyền vào phải là dạng string');
        }
        if (typeof value !== 'string') {
            throw new Error('value:: value bắt buộc truyền vào phải là dạng string');
        }
        super.setItem(key, value, withoutSub);
    }

    removeItem(key) {
        if (typeof key !== 'string') {
            throw new Error('key:: key bắt buộc truyền vào phải là dạng string');
        }
        super.removeItem(key);
    }

    getListItems(keys) {
        if (!Array.isArray(keys)) {
            throw new Error('keys:: keys bắt buộc truyền vào phải là dạng array');
        }
        return super.getListItems(keys);
    }

    clearAll(domain) {
        if (typeof domain !== 'string') {
            throw new Error('domain:: domain bắt buộc truyền vào phải là dạng string');
        }
        super.clearAll(domain);
    }

    setExpires(expires) {
        super.setExpires(expires);
    }

    getExpires() {
        return super.getExpires();
    }
}

const storageBase = new StorageBase();

export default storageBase;
