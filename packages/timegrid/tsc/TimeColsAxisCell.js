import { createElement, createFormatter, ViewContextType, RenderHook, } from '@fullcalendar/common';
var DEFAULT_SLAT_LABEL_FORMAT = createFormatter({
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: true,
    meridiem: 'short',
});
export function TimeColsAxisCell(props) {
    var classNames = [
        'fc-timegrid-slot',
        'fc-timegrid-slot-label',
        props.isLabeled ? 'fc-scrollgrid-shrink' : 'fc-timegrid-slot-minor',
    ];
    return (createElement(ViewContextType.Consumer, null, function (context) {
        if (!props.isLabeled) {
            return (createElement("td", { className: classNames.join(' '), "data-time": props.isoTimeStr }));
        }
        var dateEnv = context.dateEnv, options = context.options, viewApi = context.viewApi;
        var labelFormat = // TODO: fully pre-parse
         options.slotLabelFormat == null ? DEFAULT_SLAT_LABEL_FORMAT :
            Array.isArray(options.slotLabelFormat) ? createFormatter(options.slotLabelFormat[0]) :
                createFormatter(options.slotLabelFormat);
        var hookProps = {
            level: 0,
            time: props.time,
            date: dateEnv.toDate(props.date),
            view: viewApi,
            text: dateEnv.format(props.date, labelFormat),
        };
        return (createElement(RenderHook, { hookProps: hookProps, classNames: options.slotLabelClassNames, content: options.slotLabelContent, defaultContent: renderInnerContent, didMount: options.slotLabelDidMount, willUnmount: options.slotLabelWillUnmount }, function (rootElRef, customClassNames, innerElRef, innerContent) { return (createElement("td", { ref: rootElRef, className: classNames.concat(customClassNames).join(' '), "data-time": props.isoTimeStr },
            createElement("div", { className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame" },
                createElement("div", { className: "fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion", ref: innerElRef }, innerContent)))); }));
    }));
}
function renderInnerContent(props) {
    return props.text;
}
//# sourceMappingURL=TimeColsAxisCell.js.map