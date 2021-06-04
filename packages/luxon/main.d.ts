import { CalendarApi, Duration, PluginDef } from '@fullcalendar/common';
import { DateTime, Duration as Duration$1 } from 'luxon';

declare function toLuxonDateTime(date: Date, calendar: CalendarApi): DateTime;
declare function toLuxonDuration(duration: Duration, calendar: CalendarApi): Duration$1;
declare const _default: PluginDef;

export default _default;
export { toLuxonDateTime, toLuxonDuration };
