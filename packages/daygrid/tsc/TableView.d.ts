/// <reference types="@fullcalendar/core-preact" />
import { VNode, createElement, ChunkContentCallbackArgs, DateComponent, ViewProps, RefObject, ChunkConfigRowContent, Dictionary } from '@fullcalendar/common';
export declare abstract class TableView<State = Dictionary> extends DateComponent<ViewProps, State> {
    protected headerElRef: RefObject<HTMLTableCellElement>;
    renderSimpleLayout(headerRowContent: ChunkConfigRowContent, bodyContent: (contentArg: ChunkContentCallbackArgs) => VNode): createElement.JSX.Element;
    renderHScrollLayout(headerRowContent: ChunkConfigRowContent, bodyContent: (contentArg: ChunkContentCallbackArgs) => VNode, colCnt: number, dayMinWidth: number): createElement.JSX.Element;
}
//# sourceMappingURL=TableView.d.ts.map