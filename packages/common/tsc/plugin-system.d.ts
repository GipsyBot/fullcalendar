import { PluginDefInput, PluginDef, PluginHooks } from './plugin-system-struct';
export declare function createPlugin(input: PluginDefInput): PluginDef;
export declare function buildBuildPluginHooks(): (overrideDefs: PluginDef[], globalDefs: PluginDef[]) => PluginHooks;
//# sourceMappingURL=plugin-system.d.ts.map