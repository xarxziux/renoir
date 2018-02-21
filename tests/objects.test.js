const {filterObject} = require ('../tmp/core/objects.js');

const testFilterObject = assert => {
    
    const base = {a: 10, b: 100, c: 'a string'};
    const filter = filterObject (base);
    
    assert.plan (4);
    
    assert.equal (typeof filterObject, 'function',
        'The object module exports a function and...');
    
    const obj1 = filter ({x: 0, y: 'hello', z: [1, 2, 3]});
    const obj2 = filter ({b: 'Bob', c: 'Smith', d: 'Junior'});
    const obj3 = filter ({a: 'b', b: 'c', c: 'd', d: 'e', e: 'f'});
    
    assert.deepEqual (obj1, base);
    assert.deepEqual (obj2, {a: 10, b: 'Bob', c: 'Smith'});
    assert.deepEqual (obj3, {a: 'b', b: 'c', c: 'd'});
    
    assert.end();
    
};

module.exports = assert => {
    
    assert.test ('Test that the objects module export a filterObject' +
        ' function.', testFilterObject);
    
};
