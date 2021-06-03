// no public types yet. when there are, export from:
// import {} from './api-type-deps'
var EventSourceApi = /** @class */ (function () {
    function EventSourceApi(context, internalEventSource) {
        this.context = context;
        this.internalEventSource = internalEventSource;
    }
    EventSourceApi.prototype.remove = function () {
        this.context.dispatch({
            type: 'REMOVE_EVENT_SOURCE',
            sourceId: this.internalEventSource.sourceId,
        });
    };
    EventSourceApi.prototype.refetch = function () {
        this.context.dispatch({
            type: 'FETCH_EVENT_SOURCES',
            sourceIds: [this.internalEventSource.sourceId],
            isRefetch: true,
        });
    };
    Object.defineProperty(EventSourceApi.prototype, "id", {
        get: function () {
            return this.internalEventSource.publicId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventSourceApi.prototype, "url", {
        get: function () {
            return this.internalEventSource.meta.url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventSourceApi.prototype, "format", {
        get: function () {
            return this.internalEventSource.meta.format; // TODO: bad. not guaranteed
        },
        enumerable: false,
        configurable: true
    });
    return EventSourceApi;
}());
export { EventSourceApi };
//# sourceMappingURL=EventSourceApi.js.map