import { __assign } from "tslib";
import { buildRangeApiWithTimeZone } from './structs/date-span';
export function handleDateProfile(dateProfile, context) {
    context.emitter.trigger('datesSet', __assign(__assign({}, buildRangeApiWithTimeZone(dateProfile.activeRange, context.dateEnv)), { view: context.viewApi }));
}
//# sourceMappingURL=dates-set.js.map