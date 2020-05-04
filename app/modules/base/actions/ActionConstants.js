/**
 * Copyright 2020-present, TIENDUC.
 * All rights reserved.
 * @author ductt.it.hust@gmail.com on 15/04/2020.
 */

'use strict';

export const MODIFY_STATE_BEFORE = 'MODIFY_STATE_BEFORE';
export const MODIFY_STATE_AFTER = 'MODIFY_STATE_AFTER';
export const MODIFY_STATE_ONLY = 'MODIFY_STATE_ONLY';
export const FETCH_SERVER_ONLY = 'FETCH_SERVER_ONLY';
export const MODIFY_STATE_TYPE_DEFAULT = MODIFY_STATE_AFTER;
export const MODIFY_STATE_TYPES = [MODIFY_STATE_BEFORE, MODIFY_STATE_AFTER, MODIFY_STATE_ONLY, FETCH_SERVER_ONLY];
