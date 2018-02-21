const utils = require ('../tmp/core/array.js');

const testGetBlankArray = assert => {
    
    const {getBlankArray} = utils;
    const nullArray = [null, null, null, null, null];
    const numArray = [12, 12, 12, 12, 12, 12, 12, 12, 12];
    const strArray = ['x', 'x', 'x', 'x', 'x', 'x'];
    const arrArray = [[1], [1], [1], [1]];
    
    assert.plan (5);
    
    assert.equal (typeof getBlankArray, 'function',
        'getBlankArray is a function and...');
    assert.deepEqual (getBlankArray (5), nullArray);
    assert.deepEqual (getBlankArray (9, 12), numArray);
    assert.deepEqual (getBlankArray (6, 'x'), strArray);
    assert.deepEqual (getBlankArray (4, [1]), arrArray);
    
    assert.end();
    
};

module.exports = assert => {
    
    assert.test ('Test that the getBlankArray function works as expected',
        testGetBlankArray);
    
};
