export declare type GenericHash = {
    [key: string]: any;
};
export declare function guid(): string;
export declare function disableCursor(): void;
export declare function enableCursor(): void;
export declare function preventSelection(el: HTMLElement): void;
export declare function allowSelection(el: HTMLElement): void;
export declare function preventContextMenu(el: HTMLElement): void;
export declare function allowContextMenu(el: HTMLElement): void;
export interface OrderSpec<Subject> {
    field?: string;
    order?: number;
    func?: FieldSpecInputFunc<Subject>;
}
export declare type FieldSpecInput<Subject> = string | string[] | FieldSpecInputFunc<Subject> | FieldSpecInputFunc<Subject>[];
export declare type FieldSpecInputFunc<Subject> = (a: Subject, b: Subject) => number;
export declare function parseFieldSpecs<Subject>(input: FieldSpecInput<Subject>): OrderSpec<Subject>[];
export declare function compareByFieldSpecs<Subject>(obj0: Subject, obj1: Subject, fieldSpecs: OrderSpec<Subject>[]): number;
export declare function compareByFieldSpec<Subject>(obj0: Subject, obj1: Subject, fieldSpec: OrderSpec<Subject>): number;
export declare function flexibleCompare(a: any, b: any): number;
export declare function padStart(val: any, len: any): string;
export declare function compareNumbers(a: any, b: any): number;
export declare function isInt(n: any): boolean;
export declare function firstDefined(...args: any[]): any;
export declare function computeSmallestCellWidth(cellEl: HTMLElement): number;
//# sourceMappingURL=misc.d.ts.map