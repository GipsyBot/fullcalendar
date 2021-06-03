import { Dictionary } from '../options';
export declare function memoize<Args extends any[], Res>(workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (...args: Args) => Res;
export declare function memoizeObjArg<Arg extends Dictionary, Res>(workerFunc: (arg: Arg) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (arg: Arg) => Res;
export declare function memoizeArraylike<Args extends any[], Res>(// used at all?
workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (argSets: Args[]) => Res[];
export declare function memoizeHashlike<Args extends any[], Res>(// used?
workerFunc: (...args: Args) => Res, resEquality?: (res0: Res, res1: Res) => boolean, teardownFunc?: (res: Res) => void): (argHash: {
    [key: string]: Args;
}) => {
    [key: string]: Res;
};
//# sourceMappingURL=memoize.d.ts.map