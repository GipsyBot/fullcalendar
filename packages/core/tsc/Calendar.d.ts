import { CalendarOptions, Action, DelayedRunner, CssDimValue, CalendarApi, CalendarData } from '@fullcalendar/common';
export declare class Calendar extends CalendarApi {
    currentData: CalendarData;
    renderRunner: DelayedRunner;
    el: HTMLElement;
    isRendering: boolean;
    isRendered: boolean;
    currentClassNames: string[];
    customContentRenderId: number;
    get view(): import("@fullcalendar/common").ViewApi;
    constructor(el: HTMLElement, optionOverrides?: CalendarOptions);
    handleAction: (action: Action) => void;
    handleData: (data: CalendarData) => void;
    handleRenderRequest: () => void;
    render(): void;
    destroy(): void;
    updateSize(): void;
    batchRendering(func: any): void;
    pauseRendering(): void;
    resumeRendering(): void;
    resetOptions(optionOverrides: any, append?: any): void;
    setClassNames(classNames: string[]): void;
    setHeight(height: CssDimValue): void;
}
//# sourceMappingURL=Calendar.d.ts.map