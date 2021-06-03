import { ViewSpec } from '../structs/view-spec';
import { MountArg } from './render-hook';
import { ComponentChildren, createElement, Ref } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { ViewApi } from '../ViewApi';
export interface ViewRootProps {
    viewSpec: ViewSpec;
    children: (rootElRef: Ref<any>, classNames: string[]) => ComponentChildren;
    elRef?: Ref<any>;
}
export interface ViewContentArg {
    view: ViewApi;
}
export declare type ViewMountArg = MountArg<ViewContentArg>;
export declare class ViewRoot extends BaseComponent<ViewRootProps> {
    normalizeClassNames: (generator: import("./render-hook").ClassNamesGenerator<ViewContentArg>, hookProps: ViewContentArg) => string[];
    render(): createElement.JSX.Element;
}
//# sourceMappingURL=ViewRoot.d.ts.map