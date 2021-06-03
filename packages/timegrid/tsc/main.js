import { createPlugin } from '@fullcalendar/common';
import { TimeColsView } from './TimeColsView';
import { DayTimeColsView, buildTimeColsModel } from './DayTimeColsView';
import { DayTimeCols, buildDayRanges } from './DayTimeCols';
import { DayTimeColsSlicer } from './DayTimeColsSlicer';
import { OPTION_REFINERS } from './options';
import './options-declare';
import './main.css';
export { DayTimeCols, DayTimeColsView, TimeColsView, buildTimeColsModel, buildDayRanges, DayTimeColsSlicer };
export { TimeCols } from './TimeCols';
export { buildSlatMetas } from './time-slat-meta';
export { TimeColsSlatsCoords } from './TimeColsSlatsCoords';
export default createPlugin({
    initialView: 'timeGridWeek',
    optionRefiners: OPTION_REFINERS,
    views: {
        timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: true,
            slotDuration: '00:30:00',
            slotEventOverlap: true,
        },
        timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 },
        },
        timeGridWeek: {
            type: 'timeGrid',
            duration: { weeks: 1 },
        },
    },
});
//# sourceMappingURL=main.js.map