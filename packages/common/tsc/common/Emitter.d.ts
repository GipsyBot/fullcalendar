export interface HandlerFuncTypeHash {
    [eventName: string]: (...args: any[]) => any;
}
export declare class Emitter<HandlerFuncs extends HandlerFuncTypeHash> {
    private handlers;
    private options;
    private thisContext;
    setThisContext(thisContext: any): void;
    setOptions(options: Partial<HandlerFuncs>): void;
    on<Prop extends keyof HandlerFuncs>(type: Prop, handler: HandlerFuncs[Prop]): void;
    off<Prop extends keyof HandlerFuncs>(type: Prop, handler?: HandlerFuncs[Prop]): void;
    trigger<Prop extends keyof HandlerFuncs>(type: Prop, ...args: Parameters<HandlerFuncs[Prop]>): void;
    hasHandlers(type: keyof HandlerFuncs): number | Partial<HandlerFuncs>[keyof HandlerFuncs];
}
//# sourceMappingURL=Emitter.d.ts.map