import { ViewConfigHash, ViewComponentType } from './view-config';
import { ViewOptions } from '../options';
export interface ViewDef {
    type: string;
    component: ViewComponentType;
    overrides: ViewOptions;
    defaults: ViewOptions;
}
export declare type ViewDefHash = {
    [viewType: string]: ViewDef;
};
export declare function compileViewDefs(defaultConfigs: ViewConfigHash, overrideConfigs: ViewConfigHash): ViewDefHash;
//# sourceMappingURL=view-def.d.ts.map