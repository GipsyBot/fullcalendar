import { RawLocaleInfo } from '../datelib/locale';
import { Action } from './Action';
import { PluginHooks } from '../plugin-system-struct';
import { CalendarApi } from '../CalendarApi';
import { ViewSpec } from '../structs/view-spec';
import { Emitter } from '../common/Emitter';
import { CalendarOptionsRefined, CalendarOptions, ViewOptions, ViewOptionsRefined, Dictionary } from '../options';
import { CalendarContext } from '../CalendarContext';
import { CalendarDataManagerState, CalendarOptionsData, CalendarCurrentViewData, CalendarData } from './data-types';
export interface CalendarDataManagerProps {
    optionOverrides: CalendarOptions;
    calendarApi: CalendarApi;
    onAction?: (action: Action) => void;
    onData?: (data: CalendarData) => void;
}
export declare type ReducerFunc = (// TODO: rename to CalendarDataInjector. move view-props-manip hook here as well?
currentState: Dictionary | null, action: Action | null, context: CalendarContext & CalendarDataManagerState) => Dictionary;
export declare class CalendarDataManager {
    private computeOptionsData;
    private computeCurrentViewData;
    private organizeRawLocales;
    private buildLocale;
    private buildPluginHooks;
    private buildDateEnv;
    private buildTheme;
    private parseToolbars;
    private buildViewSpecs;
    private buildDateProfileGenerator;
    private buildViewApi;
    private buildViewUiProps;
    private buildEventUiBySource;
    private buildEventUiBases;
    private parseContextBusinessHours;
    private buildTitle;
    emitter: Emitter<Required<import("../options").RefinedOptionsFromRefiners<Required<import("../options").CalendarListenerRefiners>>>>;
    private actionRunner;
    private props;
    private state;
    private data;
    currentCalendarOptionsInput: CalendarOptions;
    private currentCalendarOptionsRefined;
    private currentViewOptionsInput;
    private currentViewOptionsRefined;
    currentCalendarOptionsRefiners: any;
    constructor(props: CalendarDataManagerProps);
    getCurrentData: () => CalendarData;
    dispatch: (action: Action) => void;
    resetOptions(optionOverrides: CalendarOptions, append?: boolean): void;
    _handleAction(action: Action): void;
    updateData(): void;
    _computeOptionsData(optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions, calendarApi: CalendarApi): CalendarOptionsData;
    processRawCalendarOptions(optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): {
        rawOptions: CalendarOptions;
        refinedOptions: CalendarOptionsRefined;
        pluginHooks: PluginHooks;
        availableLocaleData: RawLocaleInfo;
        localeDefaults: CalendarOptionsRefined;
        extra: {};
    };
    _computeCurrentViewData(viewType: string, optionsData: CalendarOptionsData, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): CalendarCurrentViewData;
    processRawViewOptions(viewSpec: ViewSpec, pluginHooks: PluginHooks, localeDefaults: CalendarOptions, optionOverrides: CalendarOptions, dynamicOptionOverrides: CalendarOptions): {
        rawOptions: ViewOptions;
        refinedOptions: ViewOptionsRefined;
        extra: {};
    };
}
//# sourceMappingURL=CalendarDataManager.d.ts.map