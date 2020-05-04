/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 08/12/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

// API XƯ LÝ 1 OBJECT

import BaseApi from './BaseApi';
import {URI_INFO_DEFAULT} from '../configs/Constants';

/**
 * - url: /v1/{id}
 *
 * Ho tro cac request dang sau:
 * - get: lấy 1 object liên quan tới object có id={id}
 * - put/patch/delete: tạo mới/sửa toàn bộ/sửa từng phần. Thực hiện theo lô hoặc theo từng object được.
 */

class ObjectApi extends BaseApi {
    constructor(headers = {}, uriInfo = {}, objectType, url) {
        // TODO by CuongNT: tham so url khong chuan, can sua lai loai bo hoac them co che cho API kieu nay
        if (!url) {
            const _uriInfo = Object.assign({}, URI_INFO_DEFAULT, uriInfo);
            const uriPattern = objectType
                ? `${_uriInfo.ssl ? 'https' : 'http'}://${_uriInfo.domain}:${_uriInfo.port}/${objectType}/{id}`
                : `${_uriInfo.ssl ? 'https' : 'http'}://${_uriInfo.domain}:${_uriInfo.port}/{id}`;
            // const uriPattern = 'http://10.2.22.117:8080/{id}';
            super(uriPattern, headers);
        } else {
            super(url, headers);
        }
        this.get = this.get.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
    }

    // LUU Y: Hàm này không cần lớp con override lại mà dùng luôn. Chỉ override lại khi cần trả giữ liệu giả lập khi test.
    get(id, body, headers = {}) {
        const uriParams = {id};
        return super.get(uriParams, body, headers);
    }

    post() {
        throw new Error('EdgeApi::post không hỗ trợ phương thức này');
    }

    /**
     * Cập nhâp 1 object
     * @param id vd: groupId, projectId...
     * @param body body = object.data. Tuc body chinh la du lieu cua 1 object nam trong data.
     * @param headers
     */
    put(id, body, headers = {}) {
        const uriParams = {id};
        return super.put(uriParams, body, headers);
    }

    /**
     * Cập nhâp 1 phần 1 object
     * @param id vd: groupId, projectId...
     * @param body body = object.data. Tuc body chinh la du lieu cua 1 object nam trong data.
     * @param headers
     */
    patch(id, body, headers = {}) {
        const uriParams = {id};
        return super.patch(uriParams, body, headers);
    }

    // LUU Y: Hàm này không cần lớp con override lại mà dùng luôn. Chỉ override lại khi cần trả giữ liệu giả lập khi test.
    delete(id, headers = {}) {
        const uriParams = {id};
        return super.delete(uriParams, headers);
    }
}

export default ObjectApi;
