

/**
 * Ultity functions
 * -----------------------------------------------
 *      * get the base path of given url 
 * ! Important , get the base URL
 */
export function GetPath(path) {
    var len = path.split('/');

    if (len.length > 3)
        return '/' + len[1] + '/' + len[2];

    return path;
};

export function getPascalCase(text, splitRegex = ' ') {
    var re = new RegExp(splitRegex);
    var inputTextArray = text.split(re);

    var result = [];

    inputTextArray.forEach(element => {
        result.push(element.charAt(0).toUpperCase() + element.slice(1).trim());
    });

    var pascalText = result.join(" ");
    return pascalText;
}


export function isValidJSON(text) {
    try {
        JSON.parse(text);
    } catch (e) {
        return false;
    }
    return true;
}

export function sortObject(o) {
    return Object.keys(o)
        .sort()
        .reduce((r, k) => {
            r[k] = o[k];
            return r
        }, {});
}

/**
 * Return the list of Active User Permissions
 * ---------------------------------------------
 * 
 * @param {*} user 
 */
export function getPermissions(user) {
    return user['permissions'].split(",");
}