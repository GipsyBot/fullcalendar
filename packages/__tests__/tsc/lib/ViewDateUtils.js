export function expectRenderRange(start, end) {
    var dateProfile = currentCalendar.getCurrentData().dateProfile; // not a great way to get this info
    expect(dateProfile.renderRange.start).toEqualDate(start);
    expect(dateProfile.renderRange.end).toEqualDate(end);
}
export function expectActiveRange(start, end) {
    var currentView = currentCalendar.view;
    expect(currentView.activeStart).toEqualDate(start);
    expect(currentView.activeEnd).toEqualDate(end);
}
//# sourceMappingURL=ViewDateUtils.js.map