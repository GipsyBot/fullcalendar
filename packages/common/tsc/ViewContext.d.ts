import { CalendarApi } from './CalendarApi';
import { ViewApi } from './ViewApi';
import { Theme } from './theme/Theme';
import { DateEnv } from './datelib/env';
import { PluginHooks } from './plugin-system-struct';
import { Context } from './vdom';
import { ScrollResponder, ScrollRequestHandler } from './ScrollResponder';
import { DateProfileGenerator } from './DateProfileGenerator';
import { ViewSpec } from './structs/view-spec';
import { CalendarData } from './reducers/data-types';
import { Action } from './reducers/Action';
import { Emitter } from './common/Emitter';
import { InteractionSettingsInput } from './interactions/interaction';
import { DateComponent } from './component/DateComponent';
import { CalendarContext } from './CalendarContext';
import { ViewOptionsRefined, CalendarListeners } from './options';
export declare const ViewContextType: Context<any>;
export declare type ResizeHandler = (force: boolean) => void;
export interface ViewContext extends CalendarContext {
    options: ViewOptionsRefined;
    theme: Theme;
    isRtl: boolean;
    dateProfileGenerator: DateProfileGenerator;
    viewSpec: ViewSpec;
    viewApi: ViewApi;
    addResizeHandler: (handler: ResizeHandler) => void;
    removeResizeHandler: (handler: ResizeHandler) => void;
    createScrollResponder: (execFunc: ScrollRequestHandler) => ScrollResponder;
    registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void;
    unregisterInteractiveComponent: (component: DateComponent<any>) => void;
}
export declare function buildViewContext(viewSpec: ViewSpec, viewApi: ViewApi, viewOptions: ViewOptionsRefined, dateProfileGenerator: DateProfileGenerator, dateEnv: DateEnv, theme: Theme, pluginHooks: PluginHooks, dispatch: (action: Action) => void, getCurrentData: () => CalendarData, emitter: Emitter<CalendarListeners>, calendarApi: CalendarApi, registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void, unregisterInteractiveComponent: (component: DateComponent<any>) => void): ViewContext;
//# sourceMappingURL=ViewContext.d.ts.map