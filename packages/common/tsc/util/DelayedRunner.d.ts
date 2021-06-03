export declare class DelayedRunner {
    private drainedOption?;
    private isRunning;
    private isDirty;
    private pauseDepths;
    private timeoutId;
    constructor(drainedOption?: () => void);
    request(delay?: number): void;
    pause(scope?: string): void;
    resume(scope?: string, force?: boolean): void;
    isPaused(): number;
    tryDrain(): void;
    clear(): void;
    private clearTimeout;
    protected drained(): void;
}
//# sourceMappingURL=DelayedRunner.d.ts.map