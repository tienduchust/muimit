/* eslint-disable consistent-return,no-cond-assign,one-var,prefer-const,no-shadow */
/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author phucnhb@bkav.com on 03/10/18.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

/*
 *  local storage(web/react native) wrapper
 *  sunnylqm 2017-04-20
 *  version 0.2.0
 */

// PhucNHb_31.10.2018: Toi ưu lai storage
export default class Storage {
    constructor(options = {}) {
        this._SIZE = options.size || 1000; // maximum capacity
        this.defaultExpires = options.defaultExpires !== undefined ?
            options.defaultExpires : new Date().getTime() + 24 * 60 * 60 * 1000;
        this._s = null;
        this.module = null;
    }

    getNameModule() {
        return this.module;
    }

    // Set StorageBackend
    setStorageBackend(module, storageBackend) {
        this._s = storageBackend;
        this.module = module;
    }

    // Set expires
    setExpires(expires) {
        this.defaultExpires = expires;
    }

    getExpires() {
        return this.defaultExpires;
    }

    // Get Cookie
    getCookie(cname) {
        const name = `${cname }=`;
        const decodedCookie = decodeURIComponent(this._s.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    // Set Cookie
    setCookie(cname, cvalue, withoutSub) {
        const d = new Date();
        d.setTime(this.defaultExpires);
        const expires = `expires=${ d.toUTCString()}`;
        const _domain = withoutSub ? `Domain=${document.domain}` : '';
        this._s.cookie = `${cname }=${ cvalue };${ expires }; ${_domain}; path=/`;
    }

    // Delete Cookie
    deleteCookie(name) {
        this._s.cookie = name.concat('=;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
    }

    // Clear all cookies
    clearAllCookies(domain) {
        const cookies = this._s.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            this._s.cookie = name + '=;'.concat(
                'expires=Thu, 01-Jan-1970 00:00:01 GMT;').concat(
                'path=').concat('/;').concat('secure=;');
        }

        // TamDN - Xoa not cookie BkavSSO va bkavAuthen
        this._s.cookie = 'BkavSSO=;'.concat(
            'expires=Thu, 01-Jan-1970 00:00:01 GMT;').concat(
            'path=').concat('/;').concat(
            'domain=').concat(domain).concat(';secure=;');
        this._s.cookie = 'bkavAuthen=;'.concat(
            'expires=Thu, 01-Jan-1970 00:00:01 GMT;').concat(
            'path=').concat('/;').concat(
            'domain=').concat(domain).concat(';secure=;');
    }

    getCookieByKey(key) {
        const value = this.getCookie(key);
        return value !== '' ? [key, value] : [];
    }

    // Get tất cả các giá trị được lưu trong cookies theo list key.
    getListDataCookiesForKeys(keys) {
        return Promise.all(keys.map((key) => this.getCookieByKey(key)));
    }

    getQuerys(results) {
        let headerFields = {};
        results && results.forEach((result) => {
            headerFields = Object.assign({[result[0]]: result[1]}, headerFields);
        });
        return Promise.resolve(headerFields);
    }

    getItem(key) {
        return this.module === 'Cookie'
            ? this.getCookie(key)
            : Promise.resolve(this._s.getItem(key));
    }

    setItem(key, value, withoutSub) {
        return this.module === 'Cookie'
            ? this.setCookie(key, value, withoutSub)
            : Promise.resolve(this._s.setItem(key, value));
    }

    removeItem(key) {
        return this.module === 'Cookie'
            ? this.deleteCookie(key)
            : this._s.removeItem(key);
    }

    /**
     * getListItems: Get một object.
     * @param {*} keys: Data truyen vao phai la dang mang
     */
    getListItems(keys) {
        return this.module === 'Cookie'
            ? this.getListDataCookiesForKeys(keys).then((results) => this.getQuerys(results))
            : Promise.resolve(this._s.multiGet(keys)).then((results) => this.getQuerys(results));
    }

    clearAll(domain) {
        this.module === 'Cookie'
            ? this.clearAllCookies(domain)
            : this._s.clear();
    }
}

