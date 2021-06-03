/// <reference types="@fullcalendar/core-preact" />
import { CalendarData } from './reducers/data-types';
import { createElement, VUIEvent, VNode } from './vdom';
import { InteractionSettingsInput } from './interactions/interaction';
import { DateComponent } from './component/DateComponent';
import { DelayedRunner } from './util/DelayedRunner';
import { PureComponent } from './vdom-util';
export interface CalendarContentProps extends CalendarData {
    forPrint: boolean;
    isHeightAuto: boolean;
}
export declare class CalendarContent extends PureComponent<CalendarContentProps> {
    private buildViewContext;
    private buildViewPropTransformers;
    private buildToolbarProps;
    private handleNavLinkClick;
    private headerRef;
    private footerRef;
    private interactionsStore;
    private calendarInteractions;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CalendarContentProps): void;
    componentWillUnmount(): void;
    _handleNavLinkClick(ev: VUIEvent, anchorEl: HTMLElement): void;
    buildAppendContent(): VNode;
    renderView(props: CalendarContentProps): createElement.JSX.Element;
    registerInteractiveComponent: (component: DateComponent<any>, settingsInput: InteractionSettingsInput) => void;
    unregisterInteractiveComponent: (component: DateComponent<any>) => void;
    resizeRunner: DelayedRunner;
    handleWindowResize: (ev: UIEvent) => void;
}
//# sourceMappingURL=CalendarContent.d.ts.map