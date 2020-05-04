/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

import axios from 'axios';
import _ from 'lodash';
// import storageBase from '../utils/storage';
import cookies from '../utils/cookies';

// const Code2xx = [204, 205];
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    const {status} = response;
    // 204 No Content: The server successfully processed the request and is not returning any content.[14]
    // 205 Reset Content: The server successfully processed the request, but is not returning any content. Unlike a 204 response, this response requires that the requester reset the document view.[15]
    if (_.toString(status) === "204" || _.toString(status) === "205") {
        return {status};
    }
    return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

const querys = ['token'];

const callApi = function callApi(url, options) {
    return cookies.getList(querys).then((results) => {
        const {token} = results;
        if (options.headers) {
            if (!options.headers.Authorization) {
                Object.assign(options.headers, {'Authorization': token});
            }
        } else {
            options.headers = {'Authorization': token};
        }
        if (!options.mode) {
            options.mode = 'cors';
        }
        // const request = new Request(url, options);
        options.url = url;
        return axios(options)
            .then(checkStatus)
            .then(parseJSON)
            .then(
                (response) => ({response}),
                (error) => ({error})
            );
    });
};

export {
    callApi,
};
