import { Constraint, AllowFunc } from '../structs/constraint';
import { parseClassNames } from '../util/html';
import { CalendarContext } from '../CalendarContext';
import { RawOptionsFromRefiners, RefinedOptionsFromRefiners, Identity } from '../options';
export declare const EVENT_UI_REFINERS: {
    display: StringConstructor;
    editable: BooleanConstructor;
    startEditable: BooleanConstructor;
    durationEditable: BooleanConstructor;
    constraint: Identity<any>;
    overlap: Identity<boolean>;
    allow: Identity<AllowFunc>;
    className: typeof parseClassNames;
    classNames: typeof parseClassNames;
    color: StringConstructor;
    backgroundColor: StringConstructor;
    borderColor: StringConstructor;
    textColor: StringConstructor;
};
declare type BuiltInEventUiRefiners = typeof EVENT_UI_REFINERS;
interface EventUiRefiners extends BuiltInEventUiRefiners {
}
export declare type EventUiInput = RawOptionsFromRefiners<Required<EventUiRefiners>>;
export declare type EventUiRefined = RefinedOptionsFromRefiners<Required<EventUiRefiners>>;
export interface EventUi {
    display: string | null;
    startEditable: boolean | null;
    durationEditable: boolean | null;
    constraints: Constraint[];
    overlap: boolean | null;
    allows: AllowFunc[];
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    classNames: string[];
}
export declare type EventUiHash = {
    [defId: string]: EventUi;
};
export declare function createEventUi(refined: EventUiRefined, context: CalendarContext): EventUi;
export declare function combineEventUis(uis: EventUi[]): EventUi;
export {};
//# sourceMappingURL=event-ui.d.ts.map