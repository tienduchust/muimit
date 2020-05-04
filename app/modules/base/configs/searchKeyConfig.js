/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author namvh@bkav.com on 11/03/2019.
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import groupIdsSelector from 'snw-annc-group/lib/selectors/groupIdsSelector';

const searchKeyConfig = {
    HasNotify: {
        mainStateKey: 'HasGroup',
        selector: groupIdsSelector,
    },
};

export default searchKeyConfig;
