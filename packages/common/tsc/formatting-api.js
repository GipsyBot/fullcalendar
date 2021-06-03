import { __assign } from "tslib";
import { DateEnv } from './datelib/env';
import { createFormatter } from './datelib/formatting';
import { organizeRawLocales, buildLocale } from './datelib/locale';
import { BASE_OPTION_DEFAULTS } from './options';
export function formatDate(dateInput, options) {
    if (options === void 0) { options = {}; }
    var dateEnv = buildDateEnv(options);
    var formatter = createFormatter(options);
    var dateMeta = dateEnv.createMarkerMeta(dateInput);
    if (!dateMeta) { // TODO: warning?
        return '';
    }
    return dateEnv.format(dateMeta.marker, formatter, {
        forcedTzo: dateMeta.forcedTzo,
    });
}
export function formatRange(startInput, endInput, options) {
    var dateEnv = buildDateEnv(typeof options === 'object' && options ? options : {}); // pass in if non-null object
    var formatter = createFormatter(options);
    var startMeta = dateEnv.createMarkerMeta(startInput);
    var endMeta = dateEnv.createMarkerMeta(endInput);
    if (!startMeta || !endMeta) { // TODO: warning?
        return '';
    }
    return dateEnv.formatRange(startMeta.marker, endMeta.marker, formatter, {
        forcedStartTzo: startMeta.forcedTzo,
        forcedEndTzo: endMeta.forcedTzo,
        isEndExclusive: options.isEndExclusive,
        defaultSeparator: BASE_OPTION_DEFAULTS.defaultRangeSeparator,
    });
}
// TODO: more DRY and optimized
function buildDateEnv(settings) {
    var locale = buildLocale(settings.locale || 'en', organizeRawLocales([]).map); // TODO: don't hardcode 'en' everywhere
    return new DateEnv(__assign(__assign({ timeZone: BASE_OPTION_DEFAULTS.timeZone, calendarSystem: 'gregory' }, settings), { locale: locale }));
}
//# sourceMappingURL=formatting-api.js.map