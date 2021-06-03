import { createElement } from '../vdom';
import { Seg } from '../component/DateComponent';
export declare function renderFill(fillType: string): createElement.JSX.Element;
export interface BgEventProps {
    seg: Seg;
    isPast: boolean;
    isFuture: boolean;
    isToday: boolean;
}
export declare const BgEvent: (props: BgEventProps) => createElement.JSX.Element;
//# sourceMappingURL=bg-fill.d.ts.map