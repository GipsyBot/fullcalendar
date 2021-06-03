import { ViewProps } from '../View';
import { ComponentType, Component } from '../vdom';
import { MountArg } from '../common/render-hook';
import { ViewOptions } from '../options';
import { Duration } from '../datelib/duration';
export declare type ViewComponent = Component<ViewProps>;
export declare type ViewComponentType = ComponentType<ViewProps>;
export declare type ViewConfigInput = ViewComponentType | ViewOptions;
export declare type ViewConfigInputHash = {
    [viewType: string]: ViewConfigInput;
};
export interface ViewConfig {
    superType: string;
    component: ViewComponentType | null;
    rawOptions: ViewOptions;
}
export declare type ViewConfigHash = {
    [viewType: string]: ViewConfig;
};
export declare function parseViewConfigs(inputs: ViewConfigInputHash): ViewConfigHash;
export interface SpecificViewContentArg extends ViewProps {
    nextDayThreshold: Duration;
}
export declare type SpecificViewMountArg = MountArg<SpecificViewContentArg>;
//# sourceMappingURL=view-config.d.ts.map