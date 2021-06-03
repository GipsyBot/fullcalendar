import { __assign } from "tslib";
export function reduceDynamicOptionOverrides(dynamicOptionOverrides, action) {
    var _a;
    switch (action.type) {
        case 'SET_OPTION':
            return __assign(__assign({}, dynamicOptionOverrides), (_a = {}, _a[action.optionName] = action.rawOptionValue, _a));
        default:
            return dynamicOptionOverrides;
    }
}
//# sourceMappingURL=options.js.map