import { formatDayString } from '../datelib/formatting-utils';
export function buildNavLinkData(date, type) {
    if (type === void 0) { type = 'day'; }
    return JSON.stringify({
        date: formatDayString(date),
        type: type,
    });
}
//# sourceMappingURL=nav-link.js.map