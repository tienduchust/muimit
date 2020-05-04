/* eslint-disable no-useless-escape */
/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author dambv@bkav.com on 25/01/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import encodeForHTML from './encodeForHTML';

// TODO by CuongNT: Cam xem lai thu vien nay.
/**
 *
 * @param inputText
 * @param withEncodeForHTML true khi inputText duoc xu ly boi encodeForHTML truoc khi goi toi checkLinkTextMessage
 * @returns {*}
 */
// https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
const checkLinkTextMessage = (inputText, withEncodeForHTML) => {
    if (!inputText) {
        return inputText;
    }
    let replacedText;

    // TamDN: replace ký tự xuống dòng tránh bắt nhầm khi nhiều link trên nhiều dòng
    const encodedForEnter = encodeForHTML('\n');
    const newEncodedForEnter = ' '.concat(encodedForEnter).concat(' ');
    inputText = inputText.replace(new RegExp(encodedForEnter, 'g'), newEncodedForEnter);

    // URLs starting with http://, https://, or ftp://
    let replacePattern1;
    if (withEncodeForHTML) {
        replacePattern1 = new RegExp(`(\\b(https?|ftp)${ encodeForHTML('://') }[-A-Z0-9+${ encodeForHTML('&@#/%?=~_|!:,.;') }]*[-A-Z0-9+${ encodeForHTML('&@#/%=~_|') }])`, 'gim');
        // replacePattern1 = new RegExp(encodeForHTML('(https?|ftp):[^\s/$.?#].[^\s]*'), 'gim');
    } else {
        replacePattern1 = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
        // replacePattern1 = /(https?|ftp):[^\s/$.?#].[^\s]*/gim;
    }

    replacedText = inputText.replace(replacePattern1, "<a href='$1' target='_blank'>$1</a>");
    // const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // replacedText = replacedText.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1">$1</a> ');

    // Change email addresses to mailto:: links.
    const replacePattern3 = /(([a-zA-Z0-9\-_.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
    // const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    replacedText = replacedText.replace(new RegExp(newEncodedForEnter, 'g'), encodedForEnter);

    return replacedText;
};

export default checkLinkTextMessage;

/*
        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses *** here I've changed the expression ***
        var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;

        Check link dang dung @stephenhay (38 chars): https://mathiasbynens.be/demo/url-regex
 */
