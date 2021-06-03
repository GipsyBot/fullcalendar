import './main.css';
// exports
// --------------------------------------------------------------------------------------------------
export var version = '<%= version %>'; // important to type it, so .d.ts has generic string
// explicit API
export { EventSourceApi } from './api/EventSourceApi';
export { EventApi, buildEventApis } from './api/EventApi';
export { CalendarApi } from './CalendarApi';
export { formatDate, formatRange } from './formatting-api';
export { ViewApi } from './ViewApi';
export * from './api-type-deps';
export { // things for plugins. everything else is exported in api-type-deps
BASE_OPTION_DEFAULTS, BASE_OPTION_REFINERS, identity, refineProps, } from './options';
export { createEventInstance } from './structs/event-instance';
export { parseEventDef, refineEventDef } from './structs/event-parse';
export { parseBusinessHours } from './structs/business-hours';
export { padStart, isInt, parseFieldSpecs, compareByFieldSpecs, compareByFieldSpec, flexibleCompare, preventSelection, allowSelection, preventContextMenu, allowContextMenu, compareNumbers, enableCursor, disableCursor, guid, computeSmallestCellWidth, } from './util/misc';
export { computeVisibleDayRange, isMultiDayRange, diffDates, } from './util/date';
export { removeExact, isArraysEqual, } from './util/array';
export { memoize, memoizeObjArg, memoizeArraylike, memoizeHashlike } from './util/memoize';
export { intersectRects, pointInsideRect, constrainPoint, getRectCenter, diffPoints, translateRect, } from './util/geom';
export { mapHash, filterHash, isPropsEqual, compareObjs, buildHashFromArray, collectFromHash, getUnequalProps } from './util/object';
export { findElements, findDirectChildren, removeElement, applyStyle, applyStyleProp, elementMatches, elementClosest, } from './util/dom-manip';
export { parseClassNames } from './util/html';
export { getCanVGrowWithinCell } from './util/table-styling';
export { filterEventStoreDefs, createEmptyEventStore, mergeEventStores, getRelevantEvents, eventTupleToStore, } from './structs/event-store';
export { combineEventUis, createEventUi } from './component/event-ui';
export { Splitter } from './component/event-splitting';
export { getDayClassNames, getDateMeta, getSlotClassNames } from './component/date-rendering';
export { buildNavLinkData } from './common/nav-link';
export { preventDefault, listenBySelector, whenTransitionDone, } from './util/dom-event';
export { computeInnerRect, computeEdges, computeHeightAndMargins, getClippingParents, computeRect, } from './util/dom-geom';
export { unpromisify } from './util/promise';
export { Emitter } from './common/Emitter';
export { rangeContainsMarker, intersectRanges, rangesEqual, rangesIntersect, rangeContainsRange } from './datelib/date-range';
export { PositionCache } from './common/PositionCache';
export { ScrollController, ElementScrollController, WindowScrollController } from './common/scroll-controller';
export { Theme } from './theme/Theme';
export { ViewContextType } from './ViewContext';
export { DateComponent } from './component/DateComponent';
export { CalendarDataManager } from './reducers/CalendarDataManager';
export { CalendarDataProvider } from './component/CalendarDataProvider';
export { sliceEvents } from './View';
export { DateProfileGenerator } from './DateProfileGenerator';
export { isDateSpansEqual } from './structs/date-span';
export { addDays, startOfDay, addMs, addWeeks, diffWeeks, diffWholeWeeks, diffWholeDays, diffDayAndTime, diffDays, isValidDate, } from './datelib/marker';
export { createDuration, asCleanDays, multiplyDuration, addDurations, asRoughMinutes, asRoughSeconds, asRoughMs, wholeDivideDurations, greatestDurationDenominator, } from './datelib/duration';
export { DateEnv } from './datelib/env';
export { createFormatter, } from './datelib/formatting';
export { formatIsoTimeString, formatDayString, buildIsoString, } from './datelib/formatting-utils';
export { NamedTimeZoneImpl } from './datelib/timezone';
export { parse as parseMarker } from './datelib/parsing';
export { SegHierarchy, buildEntryKey, getEntrySpanEnd, binarySearch, groupIntersectingEntries, } from './event-placement';
export { Interaction, interactionSettingsToStore, interactionSettingsStore, } from './interactions/interaction';
export { ElementDragging } from './interactions/ElementDragging';
export { config } from './global-config';
export { globalLocales } from './global-locales';
export { parseDragMeta } from './structs/drag-meta';
export { createPlugin } from './plugin-system';
export { CalendarContent } from './CalendarContent';
export { CalendarRoot } from './CalendarRoot';
export { DayHeader } from './common/DayHeader';
export { computeFallbackHeaderFormat } from './common/table-utils';
export { TableDateCell } from './common/TableDateCell';
export { TableDowCell } from './common/TableDowCell';
export { DaySeriesModel } from './common/DaySeriesModel';
export { sliceEventStore, hasBgRendering, setElSeg, getElSeg, computeSegDraggable, computeSegStartResizable, computeSegEndResizable, getEventClassNames, buildSegTimeText, buildSegCompareObj, sortEventSegs, getSegMeta, buildEventRangeKey, } from './component/event-rendering';
export { DayTableModel } from './common/DayTableModel';
export { Slicer } from './common/slicing-utils';
export { applyMutationToEventStore } from './structs/event-mutation';
export { isPropsValid, isInteractionValid, isDateSelectionValid } from './validation';
export { requestJson } from './util/requestJson';
export * from './vdom';
export { BaseComponent, setRef } from './vdom-util';
export { DelayedRunner } from './util/DelayedRunner';
export { SimpleScrollGrid } from './scrollgrid/SimpleScrollGrid';
export { hasShrinkWidth, renderMicroColGroup, getScrollGridClassNames, getSectionClassNames, getSectionHasLiquidHeight, getAllowYScrolling, renderChunkContent, computeShrinkWidth, sanitizeShrinkWidth, isColPropsEqual, renderScrollShim, getStickyFooterScrollbar, getStickyHeaderDates, } from './scrollgrid/util';
export { Scroller } from './scrollgrid/Scroller';
export { getScrollbarWidths } from './util/scrollbar-width';
export { RefMap } from './util/RefMap';
export { getIsRtlScrollbarOnLeft } from './util/scrollbar-side';
export { NowTimer } from './NowTimer';
export { ScrollResponder } from './ScrollResponder';
export { globalPlugins } from './global-plugins';
export { RenderHook, MountHook, buildClassNameNormalizer, ContentHook, CustomContentRenderContext, } from './common/render-hook';
export { StandardEvent } from './common/StandardEvent';
export { NowIndicatorRoot } from './common/NowIndicatorRoot';
export { DayCellRoot } from './common/DayCellRoot';
export { DayCellContent } from './common/DayCellContent';
export { EventRoot } from './common/EventRoot';
export { renderFill, BgEvent } from './common/bg-fill';
export { WeekNumberRoot } from './common/WeekNumberRoot';
export { MoreLinkRoot, computeEarliestSegStart } from './common/MoreLinkRoot';
export { ViewRoot } from './common/ViewRoot';
export { triggerDateSelect, getDefaultEventEnd } from './calendar-utils';
//# sourceMappingURL=main.js.map