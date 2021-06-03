import { createElement } from './vdom';
import { BaseComponent } from './vdom-util';
import { ToolbarModel, ToolbarWidget } from './toolbar-struct';
import { ToolbarContent } from './ToolbarSection';
export interface ToolbarProps extends ToolbarContent {
    extraClassName: string;
    model: ToolbarModel;
}
export declare class Toolbar extends BaseComponent<ToolbarProps> {
    render(): createElement.JSX.Element;
    renderSection(key: string, widgetGroups: ToolbarWidget[][]): createElement.JSX.Element;
}
//# sourceMappingURL=Toolbar.d.ts.map