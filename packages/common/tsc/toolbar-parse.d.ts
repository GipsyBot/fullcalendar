import { ViewSpecHash } from './structs/view-spec';
import { Theme } from './theme/Theme';
import { CalendarApi } from './CalendarApi';
import { CalendarOptionsRefined, CalendarOptions } from './options';
import { ToolbarModel } from './toolbar-struct';
export declare function parseToolbars(calendarOptions: CalendarOptionsRefined, calendarOptionOverrides: CalendarOptions, theme: Theme, viewSpecs: ViewSpecHash, calendarApi: CalendarApi): {
    headerToolbar: ToolbarModel;
    footerToolbar: ToolbarModel;
    viewsWithButtons: string[];
};
//# sourceMappingURL=toolbar-parse.d.ts.map