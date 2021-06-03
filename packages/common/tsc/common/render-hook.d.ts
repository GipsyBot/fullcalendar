import { Ref, ComponentChildren, createElement, RefObject, Context } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { ClassNamesInput } from '../util/html';
export declare type MountArg<ContentArg> = ContentArg & {
    el: HTMLElement;
};
export declare type DidMountHandler<TheMountArg extends {
    el: HTMLElement;
}> = (mountArg: TheMountArg) => void;
export declare type WillUnmountHandler<TheMountArg extends {
    el: HTMLElement;
}> = (mountArg: TheMountArg) => void;
export interface RenderHookProps<ContentArg> {
    hookProps: ContentArg;
    classNames: ClassNamesGenerator<ContentArg>;
    content: CustomContentGenerator<ContentArg>;
    defaultContent?: DefaultContentGenerator<ContentArg>;
    didMount: DidMountHandler<MountArg<ContentArg>>;
    willUnmount: WillUnmountHandler<MountArg<ContentArg>>;
    children: RenderHookPropsChildren;
    elRef?: Ref<any>;
}
export declare type RenderHookPropsChildren = (rootElRef: Ref<any>, classNames: string[], innerElRef: Ref<any>, innerContent: ComponentChildren) => ComponentChildren;
export interface ContentTypeHandlers {
    [contentKey: string]: () => ({
        render: (el: HTMLElement, contentVal: any) => void;
        destroy?: () => void;
    });
}
export declare class RenderHook<HookProps> extends BaseComponent<RenderHookProps<HookProps>> {
    private rootElRef;
    render(): createElement.JSX.Element;
    handleRootEl: (el: HTMLElement | null) => void;
}
export interface ObjCustomContent {
    html: string;
    domNodes: any[];
    [custom: string]: any;
}
export declare type CustomContent = ComponentChildren | ObjCustomContent;
export declare type CustomContentGenerator<HookProps> = CustomContent | ((hookProps: HookProps) => CustomContent);
export declare type DefaultContentGenerator<HookProps> = (hookProps: HookProps) => ComponentChildren;
export declare const CustomContentRenderContext: Context<number>;
export interface ContentHookProps<HookProps> {
    hookProps: HookProps;
    content: CustomContentGenerator<HookProps>;
    defaultContent?: DefaultContentGenerator<HookProps>;
    children: (innerElRef: Ref<any>, innerContent: ComponentChildren) => ComponentChildren;
    backupElRef?: RefObject<any>;
}
export declare function ContentHook<HookProps>(props: ContentHookProps<HookProps>): createElement.JSX.Element;
export interface MountHookProps<ContentArg> {
    hookProps: ContentArg;
    didMount: DidMountHandler<MountArg<ContentArg>>;
    willUnmount: WillUnmountHandler<MountArg<ContentArg>>;
    children: (rootElRef: Ref<any>) => ComponentChildren;
    elRef?: Ref<any>;
}
export declare class MountHook<ContentArg> extends BaseComponent<MountHookProps<ContentArg>> {
    rootEl: HTMLElement;
    render(): ComponentChildren;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleRootEl;
}
export declare function buildClassNameNormalizer<HookProps>(): (generator: ClassNamesGenerator<HookProps>, hookProps: HookProps) => string[];
export declare type ClassNamesGenerator<HookProps> = ClassNamesInput | ((hookProps: HookProps) => ClassNamesInput);
//# sourceMappingURL=render-hook.d.ts.map