/** @format */

'use strict';

/* eslint-disable no-eq-null */
export const isNull = x => x == null;
export const isNotNull = x => x != null;
/* eslint-enable no-eq-null */

export const isError = x =>
    Object.prototype.toString.call(x) === '[object Error]';

export const throwError = message => () => {

    throw new Error(message);

};

const innerGetBetween = (min, max, x) =>
    Number.isNaN(min) || Number.isNaN(max) || Number.isNaN(x)
        ? throwError('getBetween: invalid parameters.')
        : Math.max(min, Math.min(max, x));

export const getBetween = (min, max) => x =>
    innerGetBetween(min - 0, max - 0, x - 0);
