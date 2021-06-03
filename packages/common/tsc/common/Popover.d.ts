import { Dictionary } from '../options';
import { ComponentChildren, Ref } from '../vdom';
import { BaseComponent } from '../vdom-util';
export interface PopoverProps {
    elRef?: Ref<HTMLElement>;
    title: string;
    extraClassNames?: string[];
    extraAttrs?: Dictionary;
    parentEl: HTMLElement;
    alignmentEl: HTMLElement;
    alignGridTop?: boolean;
    children?: ComponentChildren;
    onClose?: () => void;
}
export declare class Popover extends BaseComponent<PopoverProps> {
    private rootEl;
    render(): import("preact").VNode<any>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleRootEl: (el: HTMLElement | null) => void;
    handleDocumentMousedown: (ev: any) => void;
    handleCloseClick: () => void;
    private updateSize;
}
//# sourceMappingURL=Popover.d.ts.map