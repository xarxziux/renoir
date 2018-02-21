export const filterObject = base => obj => {
    
    const filtered = {};
    
    for (const prop in base)
        if (base.hasOwnProperty (prop))
            filtered [prop] = obj [prop] || base [prop];
    
    return filtered;
    
};
