import { Ref, ComponentChildren, createElement } from '../vdom';
import { DateMarker } from '../datelib/marker';
import { DateRange } from '../datelib/date-range';
import { DateMeta } from '../component/date-rendering';
import { ViewApi } from '../ViewApi';
import { BaseComponent } from '../vdom-util';
import { DateProfile } from '../DateProfileGenerator';
import { Dictionary } from '../options';
import { DateEnv } from '../datelib/env';
export interface DayCellContentProps {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    showDayNumber?: boolean;
    extraHookProps?: Dictionary;
    defaultContent?: (hookProps: DayCellContentArg) => ComponentChildren;
    children: (innerElRef: Ref<any>, innerContent: ComponentChildren) => ComponentChildren;
}
export interface DayCellContentArg extends DateMeta {
    date: DateMarker;
    view: ViewApi;
    dayNumberText: string;
    [extraProp: string]: any;
}
export interface DayCellHookPropsInput {
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    dateEnv: DateEnv;
    viewApi: ViewApi;
    showDayNumber?: boolean;
    extraProps?: Dictionary;
}
export declare class DayCellContent extends BaseComponent<DayCellContentProps> {
    render(): createElement.JSX.Element;
}
export declare function refineDayCellHookProps(raw: DayCellHookPropsInput): DayCellContentArg;
//# sourceMappingURL=DayCellContent.d.ts.map