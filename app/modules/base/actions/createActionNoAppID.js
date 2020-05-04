/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

/**
 * createActionNoAppID: Tạo một action không có API
 * @param {*} type
 * @param {*} payload
 * @param {*} original
 * @param {*} condition
 */
export default function createActionNoAppID(type, payload = {}, original = {}, condition = {}) {
    // TODO by CuongNT: Can convert toan bo payload thanh immutablejs tai day neu dau vao chua la immutalblejs ?? Hoac khong phai immutalbejs thi nem exception ??
    return {type, payload, original, condition, timestamp: Date.now()};
}
