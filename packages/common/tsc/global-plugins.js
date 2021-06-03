import { createPlugin } from './plugin-system';
import { arrayEventSourcePlugin } from './event-sources/array-event-source';
import { funcEventSourcePlugin } from './event-sources/func-event-source';
import { jsonFeedEventSourcePlugin } from './event-sources/json-feed-event-source';
import { simpleRecurringEventsPlugin } from './structs/recurring-event-simple';
import { changeHandlerPlugin } from './option-change-handlers';
import { handleDateProfile } from './dates-set';
import { handleEventStore } from './event-crud';
import { isArraysEqual } from './util/array';
import { removeElement } from './util/dom-manip';
import { computeEventSourcesLoading } from './reducers/eventSources';
/*
this array is exposed on the root namespace so that UMD plugins can add to it.
see the rollup-bundles script.
*/
export var globalPlugins = [
    arrayEventSourcePlugin,
    funcEventSourcePlugin,
    jsonFeedEventSourcePlugin,
    simpleRecurringEventsPlugin,
    changeHandlerPlugin,
    createPlugin({
        isLoadingFuncs: [
            function (state) { return computeEventSourcesLoading(state.eventSources); },
        ],
        contentTypeHandlers: {
            html: function () { return ({ render: injectHtml }); },
            domNodes: function () { return ({ render: injectDomNodes }); },
        },
        propSetHandlers: {
            dateProfile: handleDateProfile,
            eventStore: handleEventStore,
        },
    }),
];
export function injectHtml(el, html) {
    el.innerHTML = html;
}
export function injectDomNodes(el, domNodes) {
    var oldNodes = Array.prototype.slice.call(el.childNodes); // TODO: use array util
    var newNodes = Array.prototype.slice.call(domNodes); // TODO: use array util
    if (!isArraysEqual(oldNodes, newNodes)) {
        for (var _i = 0, newNodes_1 = newNodes; _i < newNodes_1.length; _i++) {
            var newNode = newNodes_1[_i];
            el.appendChild(newNode);
        }
        oldNodes.forEach(removeElement);
    }
}
//# sourceMappingURL=global-plugins.js.map