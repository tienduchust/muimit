/* eslint-disable */
/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author hieunvb@bkav.com on 20/12/2017.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

// import * as color from '../../share/utils/styles/color';

// CUONGNT: Config cũ đang thấy dùng ở nhiều nơi nen giu tam lai, bo di sau.
export const DEFAULT_LOCALE = 'vi';
export const RESTART_ON_REMOUNT = '@@sagas-injector/restart-on-remount';
export const DAEMON = '@@sagas-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@sagas-injector/once-till-unmount';
export const DOMAIN_URL = 'https://servicevala.bkav.com';
export const DOMAIN_COOKIE = '.hcdt.vn';
export const DOMAIN_MXH = 'https://reportsocial.hcdt.vn';

export const GET_LIST_TYPE = {
    FIRST: 'FIRST', // get lần đầu => minScore : 0, maxScore : 0;
    NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
    NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
    OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
    MID: 'MID', // get mới hơn và cũ hơn của một objectId = objectId.
};

// webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
export const URI_INFO_DEFAULT = process.env.NODE_ENV === 'production' ? {
    domain: 'servicevala.bkav.com',
    port: '443',
    ssl: true,
} : {
    // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
    domain: 'servicevala.bkav.com',
    port: '443',
    ssl: true,
};

export const MESSENGER_URI_INFO_DEFAULT = {
    domain: 'messengervala.bkav.com',
    port: '443',
    ssl: true,
};

export const NOTE_URI_INFO_DEFAULT = {
    domain: 'servicevala.bkav.com',
    port: '443',
    ssl: true,
};

export const MQTT_URI_INFO_DEFAULT = {
    domain: 'mqttvala.bkav.com',
    port: '443',
    ssl: true,
};


export const PUSH_URI_INFO_DEFAULT = {
    domain: 'servicevala.bkav.com',
    port: '443',
    ssl: true,
};

export const UPLOAD_URI_INFO_DEFAULT = {
    domain: 'cdnvala.bkav.com',
    port: '443',
    ssl: true,
};

export const CHATBOT_DEFAULT = process.env.NODE_ENV === 'production' ? {
    domain: 'servicevala.hcdt.vn',
    port: '443',
    ssl: true,
} : {
    domain: 'servicevala.hcdt.vn',
    port: '443',
    ssl: true,
};

export const UPDATE_BRANCH_TYPE = {
    UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
    UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
    UPDATE_AT_DATA: 'UPDATE_AT_DATA',
};

export const UPDATE_OBJECT_TYPE = {
    OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
    MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
};

export const WrappedInstanceCondition = {
    decorateGetList: ['getOlder', 'getNewer'],
    SortableTree: ['onCreateNode', 'onSubmitCreation'],
    EntryEditor: ['focus'],
};

export default {
    'quochoi.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://quochoi.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.quochoi.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/quochoi',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - Quốc hội',
        PROVINCE_NAME: 'QUỐC HỘI',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },

        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },

    },
    'angiang.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://angiang.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.angiang.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/angiang',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh an giang',
        PROVINCE_NAME: 'AN GIANG',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },

        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },

    },
    'baclieu.gov.vn': {
        // CUONGNT: Config cũ đang thấy dùng ở nhiều nơi nen giu tam lai, bo di sau.
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://baclieu.hcdt.vn',
        DOMAIN_EMAIL: 'http://mail.baclieu.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/baclieu',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh bạc liêu',
        PROVINCE_NAME: 'BẠC LIÊU',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },

    },
    'bacninh.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://bacninh.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.bacninh.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/bacninh',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh bắc ninh',
        PROVINCE_NAME: 'BẮC NINH',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'dongthap.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://dongthap.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.dongthap.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/dongthap',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh đồng tháp',
        PROVINCE_NAME: 'ĐỒNG THÁP',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'hcm.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://hcm.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.tphcm.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/hcm',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - thành phố HCM',
        PROVINCE_NAME: 'UBND Thành Phố HCM',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'quangninh.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.bkav.com',
        DOMAIN_EGOV: 'https://quangninh.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.quangninh.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/quangninh',
        COMPANY_NAME_DEFAULT: 'tinh',
        PROVINCE_NAME: 'QUẢNG NINH',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'soctrang.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.bkav.com',
        DOMAIN_EGOV: 'https://soctrang.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.soctrang.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/soctrang',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tính sóc trăng',
        PROVINCE_NAME: 'SÓC TRĂNG',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'vinhlong.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://vinhlong.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.vinhlong.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/vinhlong',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh vĩnh long',
        PROVINCE_NAME: 'VĨNH LONG',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'yenbai.gov.vn': {
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.hcdt.vn',
        DOMAIN_EGOV: 'https://yenbai.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.yenbai.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn/yenbai',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tỉnh yên bái',
        PROVINCE_NAME: 'YÊN BÁI',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'gmail.com': { // TODO: Fix tam cho tk cuongtrong193@gmail.com
        DEFAULT_LOCALE: 'vi',
        RESTART_ON_REMOUNT: '@@sagas-injector/restart-on-remount',
        DAEMON: '@@sagas-injector/daemon',
        ONCE_TILL_UNMOUNT: '@@sagas-injector/once-till-unmount',
        DOMAIN_URL: 'https://servicevala.hcdt.vn',
        DOMAIN_COOKIE: '.bkav.com',
        DOMAIN_EGOV: 'https://quangninh.hcdt.vn',
        DOMAIN_EMAIL: 'https://mail.quangninh.gov.vn',
        DOMAIN_MXH: 'https://reportsocial.hcdt.vn',
        COMPANY_NAME_DEFAULT: 'hành chính điện tử - tính quảng ninh',
        PROVINCE_NAME: 'QUẢNG NINH',
        fixAvatar: true,

        GET_LIST_TYPE: {
            FIRST: 'FIRST', // get lần đầu:> minScore : 0, maxScore : 0,
            NEWER: 'NEWER', // get mới hơn gần nhất. minScore : maxScore_current.
            NEWEST: 'NEWEST', // get mới hơn MỚI NHẤT : newest : 1.
            OLDER: 'OLDER', // get cũ hơn liền tiếp. maxScore : minScore_current.
            MID: 'MID', // get mới hơn và cũ hơn của một objectId: objectId.
        },

        // Cach viet process.env.NODE_ENV:== 'production':> giúp webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
            // domain: 'servicevala.hcdt.vn',
            // port: '443',
            // ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPLOAD_URI_INFO_DEFAULT: {
            domain: 'cdnvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        CHATBOT_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        } : {
            domain: 'servicevala.hcdt.vn',
            port: '443',
            ssl: true,
        },

        UPDATE_BRANCH_TYPE: {
            UPDATE_AT_STATE_KEY: 'UPDATE_AT_STATE_KEY',
            UPDATE_AT_ID_KEY: 'UPDATE_AT_ID_KEY',
            UPDATE_AT_DATA: 'UPDATE_AT_DATA',
        },

        UPDATE_OBJECT_TYPE: {
            OVERWRITE: 'UPDATE_OBJECT_TYPE_OVERWRITE',
            MERGE_DEEP: 'UPDATE_OBJECT_TYPE_MERGE_DEEP',
        },


        WrappedInstanceCondition: {
            decorateGetList: ['getOlder', 'getNewer'],
            SortableTree: ['onCreateNode', 'onSubmitCreation'],
            EntryEditor: ['focus'],
        },
    },
    'bkav.com': {
        DOMAIN_EMAIL: 'https://bmail.bkav.com',
        COMPANY_NAME_DEFAULT: 'bkav',
        DOMAIN_COOKIE: '.bkav.com',
        showChat: true,

        // webpack xóa bỏ hoàn toàn phần code bên else khởi bản build triển khai 'production'.
        URI_INFO_DEFAULT: process.env.NODE_ENV === 'production' ? {
            domain: 'servicevala.bkav.com',
            port: '443',
            ssl: true,
        } : {
            // CuongNT: Chi sua thong tin ket noi o day, khong sua phia tren de dam bao khi build khong bi sai.
            // domain: '10.2.22.90',
            // port: '8000',
            // ssl: false
            domain: 'servicevala.bkav.com',
            port: '443',
            ssl: true,
        },

        MESSENGER_URI_INFO_DEFAULT: {
            domain: 'messengervala.bkav.com',
            port: '443',
            ssl: true,
        },

        NOTE_URI_INFO_DEFAULT: {
            domain: 'servicevala.bkav.com',
            port: '443',
            ssl: true,
        },

        MQTT_URI_INFO_DEFAULT: {
            domain: 'mqttvala.bkav.com',
            port: '443',
            ssl: true,
        },

        PUSH_URI_INFO_DEFAULT: {
            domain: 'servicevala.bkav.com',
            port: '443',
            ssl: true,
        },
    },
};

// Thiet lap cho quoc hoi
const ctqh_cnqhTtk = [
    'phucnh@quochoi.vn',
];

const ctqh_cnub = [
    'dungpx@quochoi.vn',
];

const ctqh = [ // Chu tich quoc hoi
    'phongtt@quochoi.vn',
    'luuuc@quochoi.vn',
    'tydb@quochoi.vn',
    'hienpq@quochoi.vn',
    'anhnth@quochoi.vn',
    'binhpt@quochoi.vn',
    'chienhn@quochoi.vn',
    'dinhnk@quochoi.vn',
    // 'dungpx@quochoi.vn',
    'giaunv@quochoi.vn',
    'haint@quochoi.vn',
    'haind@quochoi.vn',
    'ngalt@quochoi.vn',
    'thanhvh@quochoi.vn',
    'tuytv@quochoi.vn',
    'vietvt@quochoi.vn',
    // 'phucnh@quochoi.vn'
    'nganntk@quochoi.vn',
];
const cnqhTtk = [ // Chu nhiem quoc hoi va tong thu ky
    // 'phucnh@quochoi.vn',
    'linhlb@quochoi.vn',
];

const cnub = [ // Chu nhiem uy ban
    // 'dungpx@quochoi.vn',
    'tunght@quochoi.vn',
];

const uv = [ // Uy vien
    'anhnt@quochoi.vn',
    'khiemsv@quochoi.vn',
    'thuynp@quochoi.vn',
    'quanld@quochoi.vn',
    'laicv@quochoi.vn',
    'daovm@quochoi.vn',
    'quydn@quochoi.vn',
    'dueph@quochoi.vn',
    'tuanpm@quochoi.vn',
    'nhungttk@quochoi.vn',
    'thanvt@quochoi.vn',
    'hieuhm@quochoi.vn',
    'huongtg@quochoi.vn',
    'hailh@quochoi.vn',
];

const cvqh = [
    'hantk@quochoi.vn',
    'chuyenvien@quochoi.vn',
]
// Ket thuc thiet lap quoc hoi

const bttu = [
    'nhannt@hcm.gov.vn',
    'traptt@yenbai.gov.vn',
    'hoanlm@dongthap.gov.vn',
    'xuanvta@angiang.gov.vn',
    'rontv@vinhlong.gov.vn',
    'saupv@soctrang.gov.vn',
    'duongnq@baclieu.gov.vn',
    'chiennn@bacninh.gov.vn',
    'docnv@quangninh.gov.vn',
];

const cthdndt = [
    'giangnh@bacninh.gov.vn',
    'sautv@vinhlong.gov.vn',
    'kietva@angiang.gov.vn',
    'namlta@baclieu.gov.vn',
    'manlv@soctrang.gov.vn',
];

const ctt = [
    'duydd@yenbai.gov.vn',
    'duongnv@dongthap.gov.vn',
    'binhnt@angiang.gov.vn',
    'quangnv@vinhlong.gov.vn',
    'chuyentv@soctrang.gov.vn',
    'longnd@quangninh.gov.vn',
    'trungdt@baclieu.gov.vn',
    'quynhnt@bacninh.gov.vn',
];

const cvptinh = [
];

const cth = [
    'hoangnt.thuanthanh@bacninh.gov.vn',
    'minhdd.tpyb@yenbai.gov.vn',
    'siengmv.tanhong@dongthap.gov.vn',
    'dungtv.tambinh@vinhlong.gov.vn',
    'nguyenhc.hongdan@baclieu.gov.vn',
    'cuongpv.chauthanh@angiang.gov.vn',
    'sonnv.bache@quangninh.gov.vn',
    'thangtq.chauthanh@soctrang.gov.vn',
];

const cv = [
    'hantk@hcm.gov.vn',
    'hantk@yenbai.gov.vn',
    'hantk@dongthap.gov.vn',
    'hantk@angiang.gov.vn',
    'hantk@vinhlong.gov.vn',
    'hantk@soctrang.gov.vn',
    'hantk@quangninh.gov.vn',
    'hantk@bacninh.gov.vn',
    'hantk@baclieu.gov.vn',
];

const gds = [
    'tuyennv.syt@yenbai.gov.vn',
    'thuannlt.syt@dongthap.gov.vn',
    'tuantq.syt@angiang.gov.vn',
    'uttv.syt@vinhlong.gov.vn',
    'phongth.syt@soctrang.gov.vn',
    'diennt.syt@quangninh.gov.vn',
    'hoattm.syt@bacninh.gov.vn',
    'nambq.syt@baclieu.gov.vn',
];

// Mobile: Đổi header theo chức danh
export const userTypeConfig = {
    ctqh_cnub : {
        type: 'ctqh_cnub',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    ctqh_cnqhTtk: {
        type: 'ctqh_cnqhTtk',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    ctqh: {
        type: 'ctqh',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    cnqhTtk: {
        type: 'cnqhTtk',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    cnub: {
        type: 'cnub',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    uv: {
        type: 'uv',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },
    cvqh:{
        type: 'cvqh',
        name: 'VĂN PHÒNG',
        header: 'header_vang',
    },


    // ket thuc quoc hoi

    bttu: {
        type: 'bttu',
        name: 'TỈNH ỦY',
        header: 'header_do',
        // color: color.vala_black,
    },
    cthdndt: {
        type: 'cthdndt',
        name: 'HĐND TỈNH',
        header: 'header_xanh',
        // color: color.vala_red,
    },
    ctt: {
        type: 'ctt',
        name: 'UBND TỈNH',
        header: 'header_vang',
        // color: color.vala_blue,
    },
    cvptinh: {
        type: 'cvptinh',
        name: 'UBND TỈNH',
        header: 'header_vang',
    },
    cth: {
        type: 'cth',
        name: 'UBND TỈNH',
        header: 'header_vang',
    },
    cv: {
        type: 'cv',
        name: 'UBND TỈNH',
        header: 'header_vang',
    },
    gds: {
        type: 'gds',
        name: 'UBND TỈNH',
        header: 'header_vang',
    },
};

export const userTypeListFake = {
    type: [
        {
            data: ctqh_cnub,
            userType: 'ctqh_cnub',
        },
        {
            data: ctqh_cnqhTtk,
            userType: 'ctqh_cnqhTtk',
        },
        {
            data: ctqh,
            userType: 'ctqh',
        },
        {
            data: cnqhTtk,
            userType: 'cnqhTtk',
        },
        {
            data: cnub,
            userType: 'cnub',
        },
        {
            data: uv,
            userType: 'uv',
        },
        {
            data: cvqh,
            userType: 'cvqh',
        },
        // Ket thuc quoc hoi
        {
            data: bttu,
            userType: 'bttu',
            // color: color.vala_black,
        }, {
            data: cthdndt,
            userType: 'cthdndt',
            // color: color.vala_red,
        }, {
            data: ctt,
            userType: 'ctt',
            // color: color.vala_blue,
        }, {
            data: cvptinh,
            userType: 'cvptinh',
            // color: color.vala_blue,
        }, {
            data: cth,
            userType: 'cth',
            // color: color.vala_blue,
        }, {
            data: cv,
            userType: 'cv',
            // color: color.vala_blue,
        }, {
            data: gds,
            userType: 'gds',
            // color: color.vala_blue,
        }],
};

const dang = [ // header đỏ
    'cuongntg@bkav.com',
    'cuongtrong193@gmail.com',
    'nhannt@hcm.gov.vn',
    'traptt@yenbai.gov.vn',
    'hoanlm@dongthap.gov.vn',
    'xuanvta@angiang.gov.vn',
    'rontv@vinhlong.gov.vn',
    'saupv@soctrang.gov.vn',
    'duongnq@baclieu.gov.vn',
    'chiennn@bacninh.gov.vn',
    'docnv@quangninh.gov.vn',
];

const ubnd = [ // header vàng 1
    'duydd@yenbai.gov.vn',
    'duongnv@dongthap.gov.vn',
    'binhnt@angiang.gov.vn',
    'quangnv@vinhlong.gov.vn',
    'chuyentv@soctrang.gov.vn',
    'longnd@quangninh.gov.vn',
    'trungdt@baclieu.gov.vn',
    'quynhnt@bacninh.gov.vn',
    'minhdd.tpyb@yenbai.gov.vn',
    'siengmv.tanhong@dongthap.gov.vn',
    'duyngtv.tambinh@vinhlong.gov.vn',
    'nguyenhc.hongdan@baclieu.gov.vn',
    'cuongpv.chauthanh@angiang.gov.vn',
    'hantk@hcm.gov.vn',
    'hantk@yenbai.gov.vn',
    'hantk@dongthap.gov.vn',
    'hantk@angiang.gov.vn',
    'hantk@vinhlong.gov.vn',
    'hantk@soctrang.gov.vn',
    'hantk@quangninh.gov.vn',
    'hantk@bacninh.gov.vn',
    'hantk@baclieu.gov.vn',
    'tuyennv.syt@yenbai.gov.vn',
    'thuannlt.syt@dongthap.gov.vn',
    'tuantq.syt@angiang.gov.vn',
    'uttv.syt@vinhlong.gov.vn',
    'phongth.syt@soctrang.gov.vn',
    'diennt.syt@quangninh.gov.vn',
    'hoattm.syt@bacninh.gov.vn',
    'nambq.syt@baclieu.gov.vn',
];

const hdnd = [ // header vàng 2
    'sautv@vinhlong.gov.vn',
    'kienva@angiang.gov.vn',
    'namlta@baclieu.gov.vn',
    'manlv@soctrang.gov.vn',
];

const congdan = [ // header xanh
];

// Mobile: Đổi header theo các 4 list account hiện tại
export const userType = {congdan, dang, hdnd, ubnd};
