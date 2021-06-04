import { Identity, Dictionary, PluginDef } from '@fullcalendar/common';

declare const OPTION_REFINERS: {
    googleCalendarApiKey: StringConstructor;
};


declare type ExtraOptionRefiners = typeof OPTION_REFINERS;
declare module '@fullcalendar/common' {
    interface BaseOptionRefiners extends ExtraOptionRefiners {
    }
}

declare const EVENT_SOURCE_REFINERS: {
    googleCalendarApiKey: StringConstructor;
    googleCalendarId: StringConstructor;
    googleCalendarApiBase: StringConstructor;
    extraParams: Identity<Record<string, any> | (() => Dictionary)>;
};


declare type ExtraEventSourceRefiners = typeof EVENT_SOURCE_REFINERS;
declare module '@fullcalendar/common' {
    interface EventSourceRefiners extends ExtraEventSourceRefiners {
    }
}

declare const _default: PluginDef;

export default _default;
