/** @format */

'use strict';

import test from 'tape';

import testEither from './either.test.mjs';
import testTrampoline from './trampoline.test.mjs';
import testTypeCheck from './type_check.test.mjs';
import testUtils from './utils.test.mjs';
import testFilterObject from './objects.test.mjs';
import testArray from './array.test.mjs';

const testImports = assert => {

    assert.plan(6);
    assert.equal(typeof testEither, 'function');
    assert.equal(typeof testTrampoline, 'function');
    assert.equal(typeof testTypeCheck, 'function');
    assert.equal(typeof testUtils, 'function');
    assert.equal(typeof testFilterObject, 'function');
    assert.equal(typeof testArray, 'function');
    assert.end();

};

const runTests = t => {

    t.test('Test require statements', testImports);
    t.test('Test Either module', testEither);
    t.test('Test trampoline module', testTrampoline);
    t.test('Test type-check module', testTypeCheck);
    t.test('Test utils module', testUtils);
    t.test('Test object module', testFilterObject);
    t.test('Test array module', testArray);

};

try {

    runTests(test);

} catch (e) {

    console.log('An error occurred: ' + e.message);

}
