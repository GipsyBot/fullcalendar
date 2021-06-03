import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
export var DEFAULT_PLUGINS = [
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
];
pushOptions({
    plugins: DEFAULT_PLUGINS,
});
//# sourceMappingURL=install-plugins.js.map