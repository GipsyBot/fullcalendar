/// <reference types="@fullcalendar/core-preact" />
import { VNode, createElement } from '../vdom';
import { BaseComponent } from '../vdom-util';
import { Scroller } from './Scroller';
import { RefMap } from '../util/RefMap';
import { ColProps, SectionConfig, renderMicroColGroup, ChunkConfig, CssDimValue } from './util';
export interface SimpleScrollGridProps {
    cols: ColProps[];
    sections: SimpleScrollGridSection[];
    liquid: boolean;
    collapsibleWidth: boolean;
    height?: CssDimValue;
}
export interface SimpleScrollGridSection extends SectionConfig {
    key: string;
    chunk?: ChunkConfig;
}
interface SimpleScrollGridState {
    shrinkWidth: number | null;
    forceYScrollbars: boolean;
    scrollerClientWidths: {
        [key: string]: number;
    };
    scrollerClientHeights: {
        [key: string]: number;
    };
}
export declare class SimpleScrollGrid extends BaseComponent<SimpleScrollGridProps, SimpleScrollGridState> {
    processCols: (a: any) => any;
    renderMicroColGroup: typeof renderMicroColGroup;
    scrollerRefs: RefMap<Scroller>;
    scrollerElRefs: RefMap<HTMLElement>;
    state: SimpleScrollGridState;
    render(): VNode;
    renderSection(sectionConfig: SimpleScrollGridSection, microColGroupNode: VNode): createElement.JSX.Element;
    renderChunkTd(sectionConfig: SimpleScrollGridSection, microColGroupNode: VNode, chunkConfig: ChunkConfig): createElement.JSX.Element;
    _handleScrollerEl(scrollerEl: HTMLElement | null, key: string): void;
    handleSizing: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    computeShrinkWidth(): number;
    computeScrollerDims(): {
        forceYScrollbars: boolean;
        scrollerClientWidths: {
            [index: string]: number;
        };
        scrollerClientHeights: {
            [index: string]: number;
        };
    };
}
export {};
//# sourceMappingURL=SimpleScrollGrid.d.ts.map