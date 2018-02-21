const test = require ('tape');
const renoir = require ('../dist/index.js');

const runTests = () => {
    
    test ('Final check that the Renoir module is properly exporting.',
        assert => {
            
            assert.plan (11);
            
            assert.equal (typeof renoir, 'object',
                'The Renoir module exports an object and...');
            assert.equal (typeof renoir.isNull, 'function',
                'that object contains an isNull() function and...');
            assert.equal (typeof renoir.isNotNull, 'function',
                'that object contains an isNotNull() function and...');
            assert.equal (typeof renoir.isError, 'function',
                'that object contains an isError() function and...');
            assert.equal (typeof renoir.throwError, 'function',
                'that object contains a throwError() function and...');
            assert.equal (typeof renoir.getBetween, 'function',
                'that object contains a getBetween() function and...');
            assert.equal (typeof renoir.getBlankArray, 'function',
                'that object contains a getBlankArray() function and...');
            assert.equal (typeof renoir.Left, 'function',
                'that object contains a Left() function and...');
            assert.equal (typeof renoir.Right, 'function',
                'that object contains a Right() function and...');
            assert.equal (typeof renoir.trampoline, 'function',
                'that object contains a trampoline() function and...');
            assert.equal (typeof renoir.typeCheck, 'function',
                'that object contains a typeCheck() function.');
            
            assert.end();
            
        }
    );
    
};

try {
    
    runTests();
    
} catch (e) {
    
    console.log ('An error occurred: ', e.message);
    
}
