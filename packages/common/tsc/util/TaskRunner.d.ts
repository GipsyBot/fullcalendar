export declare class TaskRunner<Task> {
    private runTaskOption?;
    private drainedOption?;
    private queue;
    private delayedRunner;
    constructor(runTaskOption?: (task: Task) => void, drainedOption?: (completedTasks: Task[]) => void);
    request(task: Task, delay?: number): void;
    pause(scope?: string): void;
    resume(scope?: string, force?: boolean): void;
    drain(): void;
    protected runTask(task: Task): void;
    protected drained(completedTasks: Task[]): void;
}
//# sourceMappingURL=TaskRunner.d.ts.map