/// <reference types="@fullcalendar/core-preact" />
import { VNode, createElement, Ref } from '../vdom';
import { ViewContext } from '../ViewContext';
import { BaseOptionsRefined } from '../options';
export declare type CssDimValue = string | number;
export interface ColProps {
    width?: CssDimValue;
    minWidth?: CssDimValue;
    span?: number;
}
export interface SectionConfig {
    outerContent?: VNode;
    type: 'body' | 'header' | 'footer';
    className?: string;
    maxHeight?: number;
    liquid?: boolean;
    expandRows?: boolean;
    syncRowHeights?: boolean;
    isSticky?: boolean;
}
export declare type ChunkConfigContent = (contentProps: ChunkContentCallbackArgs) => VNode;
export declare type ChunkConfigRowContent = VNode | ChunkConfigContent;
export interface ChunkConfig {
    outerContent?: VNode;
    content?: ChunkConfigContent;
    rowContent?: ChunkConfigRowContent;
    scrollerElRef?: Ref<HTMLDivElement>;
    elRef?: Ref<HTMLTableCellElement>;
    tableClassName?: string;
}
export interface ChunkContentCallbackArgs {
    tableColGroupNode: VNode;
    tableMinWidth: CssDimValue;
    clientWidth: number | null;
    clientHeight: number | null;
    expandRows: boolean;
    syncRowHeights: boolean;
    rowSyncHeights: number[];
    reportRowHeightChange: (rowEl: HTMLElement, isStable: boolean) => void;
}
export declare function computeShrinkWidth(chunkEls: HTMLElement[]): number;
export interface ScrollerLike {
    needsYScrolling(): boolean;
    needsXScrolling(): boolean;
}
export declare function getSectionHasLiquidHeight(props: {
    liquid: boolean;
}, sectionConfig: SectionConfig): boolean;
export declare function getAllowYScrolling(props: {
    liquid: boolean;
}, sectionConfig: SectionConfig): boolean;
export declare function renderChunkContent(sectionConfig: SectionConfig, chunkConfig: ChunkConfig, arg: ChunkContentCallbackArgs): VNode;
export declare function isColPropsEqual(cols0: ColProps[], cols1: ColProps[]): boolean;
export declare function renderMicroColGroup(cols: ColProps[], shrinkWidth?: number): VNode;
export declare function sanitizeShrinkWidth(shrinkWidth?: number): number;
export declare function hasShrinkWidth(cols: ColProps[]): boolean;
export declare function getScrollGridClassNames(liquid: boolean, context: ViewContext): any[];
export declare function getSectionClassNames(sectionConfig: SectionConfig, wholeTableVGrow: boolean): string[];
export declare function renderScrollShim(arg: ChunkContentCallbackArgs): createElement.JSX.Element;
export declare function getStickyHeaderDates(options: BaseOptionsRefined): boolean;
export declare function getStickyFooterScrollbar(options: BaseOptionsRefined): boolean;
//# sourceMappingURL=util.d.ts.map