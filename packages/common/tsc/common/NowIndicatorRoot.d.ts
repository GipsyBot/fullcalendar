import { RenderHookPropsChildren, MountArg } from './render-hook';
import { DateMarker } from '../datelib/marker';
import { createElement } from '../vdom';
import { ViewApi } from '../ViewApi';
export interface NowIndicatorRootProps {
    isAxis: boolean;
    date: DateMarker;
    children: RenderHookPropsChildren;
}
export interface NowIndicatorContentArg {
    isAxis: boolean;
    date: Date;
    view: ViewApi;
}
export declare type NowIndicatorMountArg = MountArg<NowIndicatorContentArg>;
export declare const NowIndicatorRoot: (props: NowIndicatorRootProps) => createElement.JSX.Element;
//# sourceMappingURL=NowIndicatorRoot.d.ts.map