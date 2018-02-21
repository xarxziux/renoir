'use strict';

const test = require ('tape');

const testEither = require ('./either.test.js');
const testTrampoline = require ('./trampoline.test.js');
const testTypeCheck = require ('./type_check.test.js');
const testUtils = require ('./utils.test.js');
const testFilterObject = require ('./objects.test.js');
const testArray = require ('./array.test.js');

const testImports = assert => {
    
    assert.plan (6);
    assert.equal (typeof testEither, 'function');
    assert.equal (typeof testTrampoline, 'function');
    assert.equal (typeof testTypeCheck, 'function');
    assert.equal (typeof testUtils, 'function');
    assert.equal (typeof testFilterObject, 'function');
    assert.equal (typeof testArray, 'function');
    assert.end();
    
};

const log = console.log;

const runTests = t => {
    
    t.test ('Test require statements', testImports);
    t.test ('Test Either module', testEither);
    t.test ('Test trampoline module', testTrampoline);
    t.test ('Test type-check module', testTypeCheck);
    t.test ('Test utils module', testUtils);
    t.test ('Test object module', testFilterObject);
    t.test ('Test array module', testArray);
    
};

try {
    
    runTests (test);
    
} catch (e) {
    
    log ('An error occurred: ' + e.message);
    
}
