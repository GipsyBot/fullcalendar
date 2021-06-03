import { Identity, ClassNamesGenerator, CustomContentGenerator, DidMountHandler, WillUnmountHandler, FormatterInput } from '@fullcalendar/common';
import { NoEventsContentArg } from './api-type-deps';
export declare const OPTION_REFINERS: {
    listDayFormat: typeof createFalsableFormatter;
    listDaySideFormat: typeof createFalsableFormatter;
    noEventsClassNames: Identity<ClassNamesGenerator<NoEventsContentArg>>;
    noEventsContent: Identity<CustomContentGenerator<NoEventsContentArg>>;
    noEventsDidMount: Identity<DidMountHandler<import("@fullcalendar/common").MountArg<NoEventsContentArg>>>;
    noEventsWillUnmount: Identity<WillUnmountHandler<import("@fullcalendar/common").MountArg<NoEventsContentArg>>>;
};
declare function createFalsableFormatter(input: FormatterInput | false): import("@fullcalendar/common").DateFormatter;
export {};
//# sourceMappingURL=options.d.ts.map