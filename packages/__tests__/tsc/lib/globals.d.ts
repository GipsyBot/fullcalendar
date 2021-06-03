/// <reference types="jasmine" />
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import './hacks';
import './simulate';
import './date-matchers';
declare function pushOptions(options: CalendarOptions): void;
declare function spyOnCalendarCallback(name: any, func?: any): any;
declare function initCalendar(moreOptions?: CalendarOptions, el?: any): Calendar;
declare function getCurrentOptions(): any;
declare function describeOptions(optName: any, hash?: any, callback?: any): void;
declare function describeValues(hash: any, callback: any): void;
declare function describeTimeZones(callback: any): void;
declare function describeTimeZone(name: any, callback: any): void;
declare function oneCall(func: any): () => any;
declare function spyOnMethod(Class: any, methodName: any, dontCallThrough: any): jasmine.Spy<any>;
declare function spyCall(func?: any): any;
declare type spyOnCalendarCallbackType = typeof spyOnCalendarCallback;
declare type pushOptionsType = typeof pushOptions;
declare type initCalendarType = typeof initCalendar;
declare type getCurrentOptionsType = typeof getCurrentOptions;
declare type describeOptionsType = typeof describeOptions;
declare type describeValuesType = typeof describeValues;
declare type describeTimeZonesType = typeof describeTimeZones;
declare type describeTimeZoneType = typeof describeTimeZone;
declare type oneCallType = typeof oneCall;
declare type spyOnMethodType = typeof spyOnMethod;
declare type spyCallType = typeof spyCall;
declare global {
    let currentCalendar: Calendar;
    let spyOnCalendarCallback: spyOnCalendarCallbackType;
    let pushOptions: pushOptionsType;
    let initCalendar: initCalendarType;
    let getCurrentOptions: getCurrentOptionsType;
    let describeOptions: describeOptionsType;
    let describeValues: describeValuesType;
    let describeTimeZones: describeTimeZonesType;
    let describeTimeZone: describeTimeZoneType;
    let oneCall: oneCallType;
    let spyOnMethod: spyOnMethodType;
    let spyCall: spyCallType;
    interface Window {
        currentCalendar: Calendar;
        karmaConfig: any;
    }
    interface Function {
        calls: any;
    }
    interface JQueryStatic {
        simulate: any;
        simulateMouseClick: any;
        simulateTouchClick: any;
        simulateByPoint: any;
        _data: any;
    }
    interface JQuery {
        simulate: any;
        draggable: any;
        sortable: any;
    }
    namespace jasmine {
        interface Matchers<T> {
            toEqualDate: any;
            toEqualLocalDate: any;
            toEqualNow: any;
            toBeBoundedBy: any;
            toIntersectWith: any;
            toBeAbove: any;
            toBeBelow: any;
            toBeRightOf: any;
            toBeLeftOf: any;
            toHaveScrollbars: any;
            toBeMostlyHBoundedBy: any;
            toBeMostlyAbove: any;
            toBeMostlyLeftOf: any;
            toBeMostlyRightOf: any;
        }
    }
}
export {};
//# sourceMappingURL=globals.d.ts.map