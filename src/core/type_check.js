import {numberDetect as typeOf} from 'number-detect';
import {Left} from './either.js';

export const typeCheck = checksEnabled => targetType => eth => {
    
    if (!checksEnabled || eth.isLeft())
        return eth;
    
    const ethType = typeOf (eth.right());
    
    if (ethType === targetType)
        return eth;
    
    return Left ('Type check failed: ' + targetType +
            ' expected but ' + ethType + ' detected.');
    
};
