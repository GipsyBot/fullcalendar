import { DateEnv, DateInput } from '../datelib/env';
import { DateMarker } from '../datelib/marker';
import { Action } from './Action';
import { BaseOptionsRefined } from '../options';
export declare function reduceCurrentDate(currentDate: DateMarker, action: Action): Date;
export declare function getInitialDate(options: BaseOptionsRefined, dateEnv: DateEnv): Date;
export declare function getNow(nowInput: DateInput | (() => DateInput), dateEnv: DateEnv): Date;
//# sourceMappingURL=current-date.d.ts.map