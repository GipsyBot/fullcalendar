import { __assign } from 'tslib';
export function buildDatePointApiWithContext(dateSpan, context) {
    var props = {};
    for (var _i = 0, _a = context.pluginHooks.datePointTransforms; _i < _a.length; _i++) {
        var transform = _a[_i];
        __assign(props, transform(dateSpan, context));
    }
    __assign(props, buildDatePointApi(dateSpan, context.dateEnv));
    return props;
}
export function buildDatePointApi(span, dateEnv) {
    return {
        date: dateEnv.toDate(span.range.start),
        dateStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
        allDay: span.allDay,
    };
}
//# sourceMappingURL=utils.js.map