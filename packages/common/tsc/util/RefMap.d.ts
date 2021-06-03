export declare class RefMap<RefType> {
    masterCallback?: (val: RefType | null, key: string) => void;
    currentMap: {
        [key: string]: RefType;
    };
    private depths;
    private callbackMap;
    constructor(masterCallback?: (val: RefType | null, key: string) => void);
    createRef(key: string | number): (val: RefType) => void;
    handleValue: (val: RefType | null, key: string) => void;
    collect(startIndex?: number, endIndex?: number, step?: number): RefType[];
    getAll(): RefType[];
}
//# sourceMappingURL=RefMap.d.ts.map