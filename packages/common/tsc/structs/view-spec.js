import { __assign } from "tslib";
import { compileViewDefs } from './view-def';
import { createDuration, greatestDurationDenominator } from '../datelib/duration';
import { mapHash } from '../util/object';
import { BASE_OPTION_DEFAULTS } from '../options';
import { parseViewConfigs } from './view-config';
export function buildViewSpecs(defaultInputs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
    var defaultConfigs = parseViewConfigs(defaultInputs);
    var overrideConfigs = parseViewConfigs(optionOverrides.views);
    var viewDefs = compileViewDefs(defaultConfigs, overrideConfigs);
    return mapHash(viewDefs, function (viewDef) { return buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults); });
}
function buildViewSpec(viewDef, overrideConfigs, optionOverrides, dynamicOptionOverrides, localeDefaults) {
    var durationInput = viewDef.overrides.duration ||
        viewDef.defaults.duration ||
        dynamicOptionOverrides.duration ||
        optionOverrides.duration;
    var duration = null;
    var durationUnit = '';
    var singleUnit = '';
    var singleUnitOverrides = {};
    if (durationInput) {
        duration = createDurationCached(durationInput);
        if (duration) { // valid?
            var denom = greatestDurationDenominator(duration);
            durationUnit = denom.unit;
            if (denom.value === 1) {
                singleUnit = durationUnit;
                singleUnitOverrides = overrideConfigs[durationUnit] ? overrideConfigs[durationUnit].rawOptions : {};
            }
        }
    }
    var queryButtonText = function (optionsSubset) {
        var buttonTextMap = optionsSubset.buttonText || {};
        var buttonTextKey = viewDef.defaults.buttonTextKey;
        if (buttonTextKey != null && buttonTextMap[buttonTextKey] != null) {
            return buttonTextMap[buttonTextKey];
        }
        if (buttonTextMap[viewDef.type] != null) {
            return buttonTextMap[viewDef.type];
        }
        if (buttonTextMap[singleUnit] != null) {
            return buttonTextMap[singleUnit];
        }
        return null;
    };
    return {
        type: viewDef.type,
        component: viewDef.component,
        duration: duration,
        durationUnit: durationUnit,
        singleUnit: singleUnit,
        optionDefaults: viewDef.defaults,
        optionOverrides: __assign(__assign({}, singleUnitOverrides), viewDef.overrides),
        buttonTextOverride: queryButtonText(dynamicOptionOverrides) ||
            queryButtonText(optionOverrides) || // constructor-specified buttonText lookup hash takes precedence
            viewDef.overrides.buttonText,
        buttonTextDefault: queryButtonText(localeDefaults) ||
            viewDef.defaults.buttonText ||
            queryButtonText(BASE_OPTION_DEFAULTS) ||
            viewDef.type,
    };
}
// hack to get memoization working
var durationInputMap = {};
function createDurationCached(durationInput) {
    var json = JSON.stringify(durationInput);
    var res = durationInputMap[json];
    if (res === undefined) {
        res = createDuration(durationInput);
        durationInputMap[json] = res;
    }
    return res;
}
//# sourceMappingURL=view-spec.js.map