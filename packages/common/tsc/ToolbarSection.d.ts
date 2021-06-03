import { BaseComponent } from './vdom-util';
import { ToolbarWidget } from './toolbar-struct';
export interface ToolbarContent {
    title: string;
    activeButton: string;
    isTodayEnabled: boolean;
    isPrevEnabled: boolean;
    isNextEnabled: boolean;
}
export interface ToolbarSectionProps extends ToolbarContent {
    widgetGroups: ToolbarWidget[][];
}
export declare class ToolbarSection extends BaseComponent<ToolbarSectionProps> {
    render(): import("preact").VNode<any>;
    renderWidgetGroup(widgetGroup: ToolbarWidget[]): import("preact").VNode<any>;
}
//# sourceMappingURL=ToolbarSection.d.ts.map