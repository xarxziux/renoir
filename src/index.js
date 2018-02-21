import {
    isNull, isNotNull, isError, throwError, getBetween
} from './core/utils.js';
import {getBlankArray, getSequentialArray} from './core/array.js';
import {Left, Right} from './core/either.js';
import {trampoline} from './core/trampoline.js';
import {typeCheck} from './core/type_check.js';
import {filterObject} from './core/objects.js';

export {isNull};
export {isNotNull};
export {isError};
export {throwError};
export {getBetween};
export {getBlankArray};
export {getSequentialArray};
// export {typeTest};
export {Left};
export {Right};
export {trampoline};
export {typeCheck};
export {filterObject};
