import { createContext } from './vdom';
import { ScrollResponder } from './ScrollResponder';
import { createDuration } from './datelib/duration';
export var ViewContextType = createContext({}); // for Components
export function buildViewContext(viewSpec, viewApi, viewOptions, dateProfileGenerator, dateEnv, theme, pluginHooks, dispatch, getCurrentData, emitter, calendarApi, registerInteractiveComponent, unregisterInteractiveComponent) {
    return {
        dateEnv: dateEnv,
        options: viewOptions,
        pluginHooks: pluginHooks,
        emitter: emitter,
        dispatch: dispatch,
        getCurrentData: getCurrentData,
        calendarApi: calendarApi,
        viewSpec: viewSpec,
        viewApi: viewApi,
        dateProfileGenerator: dateProfileGenerator,
        theme: theme,
        isRtl: viewOptions.direction === 'rtl',
        addResizeHandler: function (handler) {
            emitter.on('_resize', handler);
        },
        removeResizeHandler: function (handler) {
            emitter.off('_resize', handler);
        },
        createScrollResponder: function (execFunc) {
            return new ScrollResponder(execFunc, emitter, createDuration(viewOptions.scrollTime), viewOptions.scrollTimeReset);
        },
        registerInteractiveComponent: registerInteractiveComponent,
        unregisterInteractiveComponent: unregisterInteractiveComponent,
    };
}
//# sourceMappingURL=ViewContext.js.map