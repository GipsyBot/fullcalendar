import { DateEnv } from './datelib/env';
import { CalendarData } from './reducers/data-types';
export declare class ViewApi {
    type: string;
    private getCurrentData;
    private dateEnv;
    constructor(type: string, getCurrentData: () => CalendarData, dateEnv: DateEnv);
    get calendar(): import("./CalendarApi").CalendarApi;
    get title(): string;
    get activeStart(): Date;
    get activeEnd(): Date;
    get currentStart(): Date;
    get currentEnd(): Date;
    getOption(name: string): unknown;
}
//# sourceMappingURL=ViewApi.d.ts.map