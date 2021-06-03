import { Component, ComponentChildren } from '../vdom';
import { CalendarDataManager } from '../reducers/CalendarDataManager';
import { CalendarApi } from '../CalendarApi';
import { CalendarData } from '../reducers/data-types';
export interface CalendarDataProviderProps {
    optionOverrides: any;
    calendarApi: CalendarApi;
    children?: (data: CalendarData) => ComponentChildren;
}
export declare class CalendarDataProvider extends Component<CalendarDataProviderProps, CalendarData> {
    dataManager: CalendarDataManager;
    constructor(props: CalendarDataProviderProps);
    handleData: (data: CalendarData) => void;
    render(): ComponentChildren;
    componentDidUpdate(prevProps: CalendarDataProviderProps): void;
}
//# sourceMappingURL=CalendarDataProvider.d.ts.map