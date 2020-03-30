
/**
 * 
 * Verify that Given list is not empty or null 
 * 
 * @param {} lst 
 */
export function isNonEmptyList(lst) {
    return (lst !== null && typeof(lst) == "object" && lst !== "" && lst !== [] && lst.length)
}

/**
 * 
 * Verify that given String is not empty or null
 * 
 * @param {*} __str 
 */
export function isNonNullEmptyString(__str) {
    return (__str !== "" && __str !== null)
}


function validObject(__obj) {
    return (__obj !== null, typeof(__obj) == "object");
}

// check that either given Dictionary is a valid dictionary
export function isValidDict(__dict) {
    return validObject(__dict)
}

/**
 * Function that will check that either dictionary is valid 
 * dictionary object or not, then check either it is empty 
 * or not
 * 
 * @param {*} __dict  - containing user information
 */
export function isNonEmptyDict(__dict) {
    if (validObject) {
        if (Object.keys(__dict).length) {
            return true
        }
    }
    return false
}