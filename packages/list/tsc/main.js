import { createPlugin } from '@fullcalendar/common';
import { ListView } from './ListView';
import { OPTION_REFINERS } from './options';
import './options-declare';
import './main.css';
export { ListView };
export * from './api-type-deps';
export default createPlugin({
    optionRefiners: OPTION_REFINERS,
    views: {
        list: {
            component: ListView,
            buttonTextKey: 'list',
            listDayFormat: { month: 'long', day: 'numeric', year: 'numeric' },
        },
        listDay: {
            type: 'list',
            duration: { days: 1 },
            listDayFormat: { weekday: 'long' },
        },
        listWeek: {
            type: 'list',
            duration: { weeks: 1 },
            listDayFormat: { weekday: 'long' },
            listDaySideFormat: { month: 'long', day: 'numeric', year: 'numeric' },
        },
        listMonth: {
            type: 'list',
            duration: { month: 1 },
            listDaySideFormat: { weekday: 'long' },
        },
        listYear: {
            type: 'list',
            duration: { year: 1 },
            listDaySideFormat: { weekday: 'long' },
        },
    },
});
//# sourceMappingURL=main.js.map