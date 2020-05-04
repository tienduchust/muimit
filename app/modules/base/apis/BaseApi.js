/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

import compile from 'string-template/compile';
import {callApi} from './callApi';

class BaseApi {
    constructor(uriPattern, headers = {}) {
        this.headers = headers;
        this.uriCompile = compile(uriPattern);
        this.fetch = this.fetch.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
        this.delete = this.delete.bind(this);
    }

    fetch(METHOD, uriParams, body, headers = {}) {
        const _headers = Object.assign({'Content-Type': 'application/json'}, headers);
        const options = {
            method: METHOD,
            headers: _headers,
            mode: 'cors',
        };
        let paramsUrl = '';
        if (METHOD === 'GET' || METHOD === 'DELETE') {
            if (body) {
                Object.keys(body).forEach((key) => {
                    if (paramsUrl === '') {
                        paramsUrl = '?';
                    } else {
                        paramsUrl += '&';
                    }
                    paramsUrl += `${key}=${body[key]}`;
                });
            }
        } else {
            if (body) {
                options.data = JSON.stringify(body);
            }
        }
        const url = this.uriCompile(uriParams) + paramsUrl;
        return callApi(url, options);
    }

    get(uriParams, body, headers = {}) {
        return this.fetch('GET', uriParams, body, headers);
    }

    post(uriParams, body, headers = {}) {
        return this.fetch('POST', uriParams, body, headers);
    }

    put(uriParams, body, headers = {}) {
        return this.fetch('PUT', uriParams, body, headers);
    }

    patch(uriParams, body, headers = {}) {
        return this.fetch('PATCH', uriParams, body, headers);
    }

    delete(uriParams, headers = {}) {
        return this.fetch('DELETE', uriParams, null, headers);
    }
}

export default BaseApi;
