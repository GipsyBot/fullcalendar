import { SectionConfig, ChunkConfig, ColProps, CssDimValue } from './util';
import { Component, Ref } from '../vdom';
import { ViewContext } from '../ViewContext';
export interface ScrollGridProps {
    colGroups?: ColGroupConfig[];
    sections: ScrollGridSectionConfig[];
    liquid: boolean;
    collapsibleWidth: boolean;
    elRef?: Ref<any>;
}
export interface ScrollGridSectionConfig extends SectionConfig {
    key: string;
    chunks?: ScrollGridChunkConfig[];
}
export interface ScrollGridChunkConfig extends ChunkConfig {
    key: string;
}
export interface ColGroupConfig {
    width?: CssDimValue;
    cols: ColProps[];
}
export declare type ScrollGridImpl = {
    new (props: ScrollGridProps, context: ViewContext): Component<ScrollGridProps>;
};
//# sourceMappingURL=ScrollGridImpl.d.ts.map