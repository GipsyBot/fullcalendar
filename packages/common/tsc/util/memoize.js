import { isArraysEqual } from './array';
import { isPropsEqual } from './object';
export function memoize(workerFunc, resEquality, teardownFunc) {
    var currentArgs;
    var currentRes;
    return function () {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (!currentArgs) {
            currentRes = workerFunc.apply(this, newArgs);
        }
        else if (!isArraysEqual(currentArgs, newArgs)) {
            if (teardownFunc) {
                teardownFunc(currentRes);
            }
            var res = workerFunc.apply(this, newArgs);
            if (!resEquality || !resEquality(res, currentRes)) {
                currentRes = res;
            }
        }
        currentArgs = newArgs;
        return currentRes;
    };
}
export function memoizeObjArg(workerFunc, resEquality, teardownFunc) {
    var _this = this;
    var currentArg;
    var currentRes;
    return function (newArg) {
        if (!currentArg) {
            currentRes = workerFunc.call(_this, newArg);
        }
        else if (!isPropsEqual(currentArg, newArg)) {
            if (teardownFunc) {
                teardownFunc(currentRes);
            }
            var res = workerFunc.call(_this, newArg);
            if (!resEquality || !resEquality(res, currentRes)) {
                currentRes = res;
            }
        }
        currentArg = newArg;
        return currentRes;
    };
}
export function memoizeArraylike(// used at all?
workerFunc, resEquality, teardownFunc) {
    var _this = this;
    var currentArgSets = [];
    var currentResults = [];
    return function (newArgSets) {
        var currentLen = currentArgSets.length;
        var newLen = newArgSets.length;
        var i = 0;
        for (; i < currentLen; i += 1) {
            if (!newArgSets[i]) { // one of the old sets no longer exists
                if (teardownFunc) {
                    teardownFunc(currentResults[i]);
                }
            }
            else if (!isArraysEqual(currentArgSets[i], newArgSets[i])) {
                if (teardownFunc) {
                    teardownFunc(currentResults[i]);
                }
                var res = workerFunc.apply(_this, newArgSets[i]);
                if (!resEquality || !resEquality(res, currentResults[i])) {
                    currentResults[i] = res;
                }
            }
        }
        for (; i < newLen; i += 1) {
            currentResults[i] = workerFunc.apply(_this, newArgSets[i]);
        }
        currentArgSets = newArgSets;
        currentResults.splice(newLen); // remove excess
        return currentResults;
    };
}
export function memoizeHashlike(// used?
workerFunc, resEquality, teardownFunc) {
    var _this = this;
    var currentArgHash = {};
    var currentResHash = {};
    return function (newArgHash) {
        var newResHash = {};
        for (var key in newArgHash) {
            if (!currentResHash[key]) {
                newResHash[key] = workerFunc.apply(_this, newArgHash[key]);
            }
            else if (!isArraysEqual(currentArgHash[key], newArgHash[key])) {
                if (teardownFunc) {
                    teardownFunc(currentResHash[key]);
                }
                var res = workerFunc.apply(_this, newArgHash[key]);
                newResHash[key] = (resEquality && resEquality(res, currentResHash[key]))
                    ? currentResHash[key]
                    : res;
            }
            else {
                newResHash[key] = currentResHash[key];
            }
        }
        currentArgHash = newArgHash;
        currentResHash = newResHash;
        return newResHash;
    };
}
//# sourceMappingURL=memoize.js.map