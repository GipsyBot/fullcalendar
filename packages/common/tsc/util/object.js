var hasOwnProperty = Object.prototype.hasOwnProperty;
// Merges an array of objects into a single object.
// The second argument allows for an array of property names who's object values will be merged together.
export function mergeProps(propObjs, complexPropsMap) {
    var dest = {};
    if (complexPropsMap) {
        for (var name_1 in complexPropsMap) {
            var complexObjs = [];
            // collect the trailing object values, stopping when a non-object is discovered
            for (var i = propObjs.length - 1; i >= 0; i -= 1) {
                var val = propObjs[i][name_1];
                if (typeof val === 'object' && val) { // non-null object
                    complexObjs.unshift(val);
                }
                else if (val !== undefined) {
                    dest[name_1] = val; // if there were no objects, this value will be used
                    break;
                }
            }
            // if the trailing values were objects, use the merged value
            if (complexObjs.length) {
                dest[name_1] = mergeProps(complexObjs);
            }
        }
    }
    // copy values into the destination, going from last to first
    for (var i = propObjs.length - 1; i >= 0; i -= 1) {
        var props = propObjs[i];
        for (var name_2 in props) {
            if (!(name_2 in dest)) { // if already assigned by previous props or complex props, don't reassign
                dest[name_2] = props[name_2];
            }
        }
    }
    return dest;
}
export function filterHash(hash, func) {
    var filtered = {};
    for (var key in hash) {
        if (func(hash[key], key)) {
            filtered[key] = hash[key];
        }
    }
    return filtered;
}
export function mapHash(hash, func) {
    var newHash = {};
    for (var key in hash) {
        newHash[key] = func(hash[key], key);
    }
    return newHash;
}
export function arrayToHash(a) {
    var hash = {};
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var item = a_1[_i];
        hash[item] = true;
    }
    return hash;
}
export function buildHashFromArray(a, func) {
    var hash = {};
    for (var i = 0; i < a.length; i += 1) {
        var tuple = func(a[i], i);
        hash[tuple[0]] = tuple[1];
    }
    return hash;
}
export function hashValuesToArray(obj) {
    var a = [];
    for (var key in obj) {
        a.push(obj[key]);
    }
    return a;
}
export function isPropsEqual(obj0, obj1) {
    if (obj0 === obj1) {
        return true;
    }
    for (var key in obj0) {
        if (hasOwnProperty.call(obj0, key)) {
            if (!(key in obj1)) {
                return false;
            }
        }
    }
    for (var key in obj1) {
        if (hasOwnProperty.call(obj1, key)) {
            if (obj0[key] !== obj1[key]) {
                return false;
            }
        }
    }
    return true;
}
export function getUnequalProps(obj0, obj1) {
    var keys = [];
    for (var key in obj0) {
        if (hasOwnProperty.call(obj0, key)) {
            if (!(key in obj1)) {
                keys.push(key);
            }
        }
    }
    for (var key in obj1) {
        if (hasOwnProperty.call(obj1, key)) {
            if (obj0[key] !== obj1[key]) {
                keys.push(key);
            }
        }
    }
    return keys;
}
export function compareObjs(oldProps, newProps, equalityFuncs) {
    if (equalityFuncs === void 0) { equalityFuncs = {}; }
    if (oldProps === newProps) {
        return true;
    }
    for (var key in newProps) {
        if (key in oldProps && isObjValsEqual(oldProps[key], newProps[key], equalityFuncs[key])) {
            // equal
        }
        else {
            return false;
        }
    }
    // check for props that were omitted in the new
    for (var key in oldProps) {
        if (!(key in newProps)) {
            return false;
        }
    }
    return true;
}
/*
assumed "true" equality for handler names like "onReceiveSomething"
*/
function isObjValsEqual(val0, val1, comparator) {
    if (val0 === val1 || comparator === true) {
        return true;
    }
    if (comparator) {
        return comparator(val0, val1);
    }
    return false;
}
export function collectFromHash(hash, startIndex, endIndex, step) {
    if (startIndex === void 0) { startIndex = 0; }
    if (step === void 0) { step = 1; }
    var res = [];
    if (endIndex == null) {
        endIndex = Object.keys(hash).length;
    }
    for (var i = startIndex; i < endIndex; i += step) {
        var val = hash[i];
        if (val !== undefined) { // will disregard undefined for sparse arrays
            res.push(val);
        }
    }
    return res;
}
//# sourceMappingURL=object.js.map