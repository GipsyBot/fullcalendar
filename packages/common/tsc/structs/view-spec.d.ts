import { Duration } from '../datelib/duration';
import { ViewOptions, CalendarOptions } from '../options';
import { ViewConfigInputHash, ViewComponentType } from './view-config';
export interface ViewSpec {
    type: string;
    component: ViewComponentType;
    duration: Duration;
    durationUnit: string;
    singleUnit: string;
    optionDefaults: ViewOptions;
    optionOverrides: ViewOptions;
    buttonTextOverride: string;
    buttonTextDefault: string;
}
export declare type ViewSpecHash = {
    [viewType: string]: ViewSpec;
};
export declare function buildViewSpecs(defaultInputs: ViewConfigInputHash, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions, localeDefaults: any): ViewSpecHash;
//# sourceMappingURL=view-spec.d.ts.map