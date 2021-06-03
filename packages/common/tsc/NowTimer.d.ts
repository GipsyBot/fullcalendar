import { DateMarker } from './datelib/marker';
import { ViewContext } from './ViewContext';
import { ComponentChildren, Component } from './vdom';
import { DateRange } from './datelib/date-range';
export interface NowTimerProps {
    unit: string;
    children: (now: DateMarker, todayRange: DateRange) => ComponentChildren;
}
interface NowTimerState {
    nowDate: DateMarker;
    todayRange: DateRange;
}
export declare class NowTimer extends Component<NowTimerProps, NowTimerState> {
    static contextType: any;
    context: ViewContext;
    initialNowDate: DateMarker;
    initialNowQueriedMs: number;
    timeoutId: any;
    constructor(props: NowTimerProps, context: ViewContext);
    render(): ComponentChildren;
    componentDidMount(): void;
    componentDidUpdate(prevProps: NowTimerProps): void;
    componentWillUnmount(): void;
    private computeTiming;
    private setTimeout;
    private clearTimeout;
}
export {};
//# sourceMappingURL=NowTimer.d.ts.map