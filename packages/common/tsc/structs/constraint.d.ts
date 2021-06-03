import { EventStore } from './event-store';
import { EventInput } from './event-parse';
import { DateSpanApi } from './date-span';
import { EventApi } from '../api/EventApi';
import { SplittableProps } from '../component/event-splitting';
import { CalendarContext } from '../CalendarContext';
export declare type ConstraintInput = 'businessHours' | string | EventInput | EventInput[];
export declare type Constraint = 'businessHours' | string | EventStore | false;
export declare type OverlapFunc = ((stillEvent: EventApi, movingEvent: EventApi | null) => boolean);
export declare type AllowFunc = (span: DateSpanApi, movingEvent: EventApi | null) => boolean;
export declare type isPropsValidTester = (props: SplittableProps, context: CalendarContext) => boolean;
export declare function normalizeConstraint(input: ConstraintInput, context: CalendarContext): Constraint | null;
//# sourceMappingURL=constraint.d.ts.map