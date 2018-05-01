/** @format */

'use strict';

import {isNotNull} from './utils.mjs';

export const trampoline = fn => input => {

    if (typeof input !== 'object') return null;

    let {accum, current} = input;

    while (isNotNull(current)) ({accum, current} = fn({accum, current}));

    return accum;
    
};
