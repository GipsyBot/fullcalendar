import { mergeProps } from '../util/object';
import { globalLocales } from '../global-locales'; // weird to be importing this
var RAW_EN_LOCALE = {
    code: 'en',
    week: {
        dow: 0,
        doy: 4,
    },
    direction: 'ltr',
    buttonText: {
        prev: 'prev',
        next: 'next',
        prevYear: 'prev year',
        nextYear: 'next year',
        year: 'year',
        today: 'today',
        month: 'month',
        week: 'week',
        day: 'day',
        list: 'list',
    },
    weekText: 'W',
    allDayText: 'all-day',
    moreLinkText: 'more',
    noEventsText: 'No events to display',
};
export function organizeRawLocales(explicitRawLocales) {
    var defaultCode = explicitRawLocales.length > 0 ? explicitRawLocales[0].code : 'en';
    var allRawLocales = globalLocales.concat(explicitRawLocales);
    var rawLocaleMap = {
        en: RAW_EN_LOCALE,
    };
    for (var _i = 0, allRawLocales_1 = allRawLocales; _i < allRawLocales_1.length; _i++) {
        var rawLocale = allRawLocales_1[_i];
        rawLocaleMap[rawLocale.code] = rawLocale;
    }
    return {
        map: rawLocaleMap,
        defaultCode: defaultCode,
    };
}
export function buildLocale(inputSingular, available) {
    if (typeof inputSingular === 'object' && !Array.isArray(inputSingular)) {
        return parseLocale(inputSingular.code, [inputSingular.code], inputSingular);
    }
    return queryLocale(inputSingular, available);
}
function queryLocale(codeArg, available) {
    var codes = [].concat(codeArg || []); // will convert to array
    var raw = queryRawLocale(codes, available) || RAW_EN_LOCALE;
    return parseLocale(codeArg, codes, raw);
}
function queryRawLocale(codes, available) {
    for (var i = 0; i < codes.length; i += 1) {
        var parts = codes[i].toLocaleLowerCase().split('-');
        for (var j = parts.length; j > 0; j -= 1) {
            var simpleId = parts.slice(0, j).join('-');
            if (available[simpleId]) {
                return available[simpleId];
            }
        }
    }
    return null;
}
function parseLocale(codeArg, codes, raw) {
    var merged = mergeProps([RAW_EN_LOCALE, raw], ['buttonText']);
    delete merged.code; // don't want this part of the options
    var week = merged.week;
    delete merged.week;
    return {
        codeArg: codeArg,
        codes: codes,
        week: week,
        simpleNumberFormat: new Intl.NumberFormat(codeArg),
        options: merged,
    };
}
//# sourceMappingURL=locale.js.map