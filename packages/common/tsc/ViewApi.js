// no public types yet. when there are, export from:
// import {} from './api-type-deps'
var ViewApi = /** @class */ (function () {
    function ViewApi(type, getCurrentData, dateEnv) {
        this.type = type;
        this.getCurrentData = getCurrentData;
        this.dateEnv = dateEnv;
    }
    Object.defineProperty(ViewApi.prototype, "calendar", {
        get: function () {
            return this.getCurrentData().calendarApi;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewApi.prototype, "title", {
        get: function () {
            return this.getCurrentData().viewTitle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewApi.prototype, "activeStart", {
        get: function () {
            return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewApi.prototype, "activeEnd", {
        get: function () {
            return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewApi.prototype, "currentStart", {
        get: function () {
            return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewApi.prototype, "currentEnd", {
        get: function () {
            return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end);
        },
        enumerable: false,
        configurable: true
    });
    ViewApi.prototype.getOption = function (name) {
        return this.getCurrentData().options[name]; // are the view-specific options
    };
    return ViewApi;
}());
export { ViewApi };
//# sourceMappingURL=ViewApi.js.map