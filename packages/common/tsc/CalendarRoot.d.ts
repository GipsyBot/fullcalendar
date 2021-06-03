import { ComponentChildren } from './vdom';
import { BaseComponent } from './vdom-util';
import { CssDimValue } from './scrollgrid/util';
import { CalendarOptions, CalendarListeners } from './options';
import { Theme } from './theme/Theme';
import { Emitter } from './common/Emitter';
export interface CalendarRootProps {
    options: CalendarOptions;
    theme: Theme;
    emitter: Emitter<CalendarListeners>;
    children: (classNames: string[], height: CssDimValue, isHeightAuto: boolean, forPrint: boolean) => ComponentChildren;
}
interface CalendarRootState {
    forPrint: boolean;
}
export declare class CalendarRoot extends BaseComponent<CalendarRootProps, CalendarRootState> {
    state: {
        forPrint: boolean;
    };
    render(): ComponentChildren;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleBeforePrint: () => void;
    handleAfterPrint: () => void;
}
export {};
//# sourceMappingURL=CalendarRoot.d.ts.map