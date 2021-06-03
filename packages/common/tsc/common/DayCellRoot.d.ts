import { Ref, ComponentChildren, createElement } from '../vdom';
import { DateMarker } from '../datelib/marker';
import { DateRange } from '../datelib/date-range';
import { DateMeta } from '../component/date-rendering';
import { MountArg } from './render-hook';
import { ViewApi } from '../ViewApi';
import { BaseComponent } from '../vdom-util';
import { DateProfile } from '../DateProfileGenerator';
import { Dictionary } from '../options';
export interface DayCellContentArg extends DateMeta {
    date: DateMarker;
    view: ViewApi;
    dayNumberText: string;
    [extraProp: string]: any;
}
export declare type DayCellMountArg = MountArg<DayCellContentArg>;
export interface DayCellRootProps {
    elRef?: Ref<any>;
    date: DateMarker;
    dateProfile: DateProfile;
    todayRange: DateRange;
    showDayNumber?: boolean;
    extraHookProps?: Dictionary;
    children: (rootElRef: Ref<any>, classNames: string[], rootDataAttrs: any, isDisabled: boolean) => ComponentChildren;
}
export declare class DayCellRoot extends BaseComponent<DayCellRootProps> {
    refineHookProps: (arg: import("./DayCellContent").DayCellHookPropsInput) => import("./DayCellContent").DayCellContentArg;
    normalizeClassNames: (generator: import("./render-hook").ClassNamesGenerator<DayCellContentArg>, hookProps: DayCellContentArg) => string[];
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=DayCellRoot.d.ts.map