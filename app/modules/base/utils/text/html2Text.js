/**
 * Copyright 2016-present, Bkav, Cop.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author cuongnt@bkav.com on 24/04/2018.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

/**
 * Convert html to text
 * @param str chuoi can trich suat text
 * @returns {*}
 */
function html2Text(str) {
    if (!str) {return '';}

    // CuongNT: dam bao khong co script trong noi dung
    // CuongNT: Dam bao giu lai duoc xuong dong truoc khi gan vao div de chi lay ra noi dung text, loai bo html
    const div = document.createElement('div');
    div.innerHTML = str.replace(/(<br\/>|<br>|<\/div>|<\/p>)/igm, '\n').replace(/(<div>|<p>)/igm, '');
    // CuongNT: Can dung textContent, khong dung innerText do hieu nang...
    // Xem tai: https://kellegous.com/j/2013/02/27/innertext-vs-textcontent/
    const result = div.textContent || '';
    // CuongNT: Cuoi cung encode de dam bao string luu trong json duoc chuan
    return result.trim();
}

export default html2Text;
