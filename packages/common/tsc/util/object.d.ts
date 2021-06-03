export declare function mergeProps(propObjs: any, complexPropsMap?: any): any;
export declare function filterHash(hash: any, func: any): {};
export declare function mapHash<InputItem, OutputItem>(hash: {
    [key: string]: InputItem;
}, func: (input: InputItem, key: string) => OutputItem): {
    [key: string]: OutputItem;
};
export declare function arrayToHash(a: any): {
    [key: string]: true;
};
export declare function buildHashFromArray<Item, ItemRes>(a: Item[], func: (item: Item, index: number) => [string, ItemRes]): {
    [key: string]: ItemRes;
};
export declare function hashValuesToArray(obj: any): any[];
export declare function isPropsEqual(obj0: any, obj1: any): boolean;
export declare function getUnequalProps(obj0: any, obj1: any): string[];
export declare type EqualityFunc<T> = (a: T, b: T) => boolean;
export declare type EqualityThing<T> = EqualityFunc<T> | true;
export declare type EqualityFuncs<ObjType> = {
    [K in keyof ObjType]?: EqualityThing<ObjType[K]>;
};
export declare function compareObjs(oldProps: any, newProps: any, equalityFuncs?: EqualityFuncs<any>): boolean;
export declare function collectFromHash<Item>(hash: {
    [key: string]: Item;
}, startIndex?: number, endIndex?: number, step?: number): Item[];
//# sourceMappingURL=object.d.ts.map