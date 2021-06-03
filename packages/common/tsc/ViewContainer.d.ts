/// <reference types="@fullcalendar/core-preact" />
import { BaseComponent } from './vdom-util';
import { ComponentChildren, Ref, createElement, VUIEvent } from './vdom';
import { CssDimValue } from './scrollgrid/util';
export interface ViewContainerProps {
    liquid?: boolean;
    height?: CssDimValue;
    aspectRatio?: number;
    onClick?: (ev: VUIEvent) => void;
    elRef?: Ref<HTMLDivElement>;
    children?: ComponentChildren;
}
interface ViewContainerState {
    availableWidth: number | null;
}
export declare class ViewContainer extends BaseComponent<ViewContainerProps, ViewContainerState> {
    el: HTMLElement;
    state: ViewContainerState;
    render(): createElement.JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleEl: (el: HTMLElement | null) => void;
    handleResize: () => void;
    updateAvailableWidth(): void;
}
export {};
//# sourceMappingURL=ViewContainer.d.ts.map