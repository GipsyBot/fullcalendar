import { DateMarker } from '../datelib/marker';
import { RenderHookPropsChildren, MountArg } from './render-hook';
import { createElement } from '../vdom';
import { DateFormatter } from '../datelib/DateFormatter';
export interface WeekNumberRootProps {
    date: DateMarker;
    defaultFormat: DateFormatter;
    children: RenderHookPropsChildren;
}
export interface WeekNumberContentArg {
    num: number;
    text: string;
    date: Date;
}
export declare type WeekNumberMountArg = MountArg<WeekNumberContentArg>;
export declare const WeekNumberRoot: (props: WeekNumberRootProps) => createElement.JSX.Element;
//# sourceMappingURL=WeekNumberRoot.d.ts.map