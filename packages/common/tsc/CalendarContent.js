import { __assign as __assign_1, __extends, __spreadArrays } from "tslib";
import { __assign } from 'tslib';
import { ViewContextType, buildViewContext } from './ViewContext';
import { Toolbar } from './Toolbar';
import { rangeContainsMarker } from './datelib/date-range';
import { memoize } from './util/memoize';
import { createElement, createRef, Fragment } from './vdom';
import { buildDelegationHandler } from './util/dom-event';
import { ViewContainer } from './ViewContainer';
import { parseInteractionSettings, interactionSettingsStore, } from './interactions/interaction';
import { EventClicking } from './interactions/EventClicking';
import { EventHovering } from './interactions/EventHovering';
import { getNow } from './reducers/current-date';
import { DelayedRunner } from './util/DelayedRunner';
import { PureComponent } from './vdom-util';
var CalendarContent = /** @class */ (function (_super) {
    __extends(CalendarContent, _super);
    function CalendarContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildViewContext = memoize(buildViewContext);
        _this.buildViewPropTransformers = memoize(buildViewPropTransformers);
        _this.buildToolbarProps = memoize(buildToolbarProps);
        _this.handleNavLinkClick = buildDelegationHandler('a[data-navlink]', _this._handleNavLinkClick.bind(_this));
        _this.headerRef = createRef();
        _this.footerRef = createRef();
        _this.interactionsStore = {};
        // Component Registration
        // -----------------------------------------------------------------------------------------------------------------
        _this.registerInteractiveComponent = function (component, settingsInput) {
            var settings = parseInteractionSettings(component, settingsInput);
            var DEFAULT_INTERACTIONS = [
                EventClicking,
                EventHovering,
            ];
            var interactionClasses = DEFAULT_INTERACTIONS.concat(_this.props.pluginHooks.componentInteractions);
            var interactions = interactionClasses.map(function (TheInteractionClass) { return new TheInteractionClass(settings); });
            _this.interactionsStore[component.uid] = interactions;
            interactionSettingsStore[component.uid] = settings;
        };
        _this.unregisterInteractiveComponent = function (component) {
            for (var _i = 0, _a = _this.interactionsStore[component.uid]; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener.destroy();
            }
            delete _this.interactionsStore[component.uid];
            delete interactionSettingsStore[component.uid];
        };
        // Resizing
        // -----------------------------------------------------------------------------------------------------------------
        _this.resizeRunner = new DelayedRunner(function () {
            _this.props.emitter.trigger('_resize', true); // should window resizes be considered "forced" ?
            _this.props.emitter.trigger('windowResize', { view: _this.props.viewApi });
        });
        _this.handleWindowResize = function (ev) {
            var options = _this.props.options;
            if (options.handleWindowResize &&
                ev.target === window // avoid jqui events
            ) {
                _this.resizeRunner.request(options.windowResizeDelay);
            }
        };
        return _this;
    }
    /*
    renders INSIDE of an outer div
    */
    CalendarContent.prototype.render = function () {
        var props = this.props;
        var toolbarConfig = props.toolbarConfig, options = props.options;
        var toolbarProps = this.buildToolbarProps(props.viewSpec, props.dateProfile, props.dateProfileGenerator, props.currentDate, getNow(props.options.now, props.dateEnv), // TODO: use NowTimer????
        props.viewTitle);
        var viewVGrow = false;
        var viewHeight = '';
        var viewAspectRatio;
        if (props.isHeightAuto || props.forPrint) {
            viewHeight = '';
        }
        else if (options.height != null) {
            viewVGrow = true;
        }
        else if (options.contentHeight != null) {
            viewHeight = options.contentHeight;
        }
        else {
            viewAspectRatio = Math.max(options.aspectRatio, 0.5); // prevent from getting too tall
        }
        var viewContext = this.buildViewContext(props.viewSpec, props.viewApi, props.options, props.dateProfileGenerator, props.dateEnv, props.theme, props.pluginHooks, props.dispatch, props.getCurrentData, props.emitter, props.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent);
        return (createElement(ViewContextType.Provider, { value: viewContext },
            toolbarConfig.headerToolbar && (createElement(Toolbar, __assign_1({ ref: this.headerRef, extraClassName: "fc-header-toolbar", model: toolbarConfig.headerToolbar }, toolbarProps))),
            createElement(ViewContainer, { liquid: viewVGrow, height: viewHeight, aspectRatio: viewAspectRatio, onClick: this.handleNavLinkClick },
                this.renderView(props),
                this.buildAppendContent()),
            toolbarConfig.footerToolbar && (createElement(Toolbar, __assign_1({ ref: this.footerRef, extraClassName: "fc-footer-toolbar", model: toolbarConfig.footerToolbar }, toolbarProps)))));
    };
    CalendarContent.prototype.componentDidMount = function () {
        var props = this.props;
        this.calendarInteractions = props.pluginHooks.calendarInteractions
            .map(function (CalendarInteractionClass) { return new CalendarInteractionClass(props); });
        window.addEventListener('resize', this.handleWindowResize);
        var propSetHandlers = props.pluginHooks.propSetHandlers;
        for (var propName in propSetHandlers) {
            propSetHandlers[propName](props[propName], props);
        }
    };
    CalendarContent.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var propSetHandlers = props.pluginHooks.propSetHandlers;
        for (var propName in propSetHandlers) {
            if (props[propName] !== prevProps[propName]) {
                propSetHandlers[propName](props[propName], props);
            }
        }
    };
    CalendarContent.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleWindowResize);
        this.resizeRunner.clear();
        for (var _i = 0, _a = this.calendarInteractions; _i < _a.length; _i++) {
            var interaction = _a[_i];
            interaction.destroy();
        }
        this.props.emitter.trigger('_unmount');
    };
    CalendarContent.prototype._handleNavLinkClick = function (ev, anchorEl) {
        var _a = this.props, dateEnv = _a.dateEnv, options = _a.options, calendarApi = _a.calendarApi;
        var navLinkOptions = anchorEl.getAttribute('data-navlink');
        navLinkOptions = navLinkOptions ? JSON.parse(navLinkOptions) : {};
        var dateMarker = dateEnv.createMarker(navLinkOptions.date);
        var viewType = navLinkOptions.type;
        var customAction = viewType === 'day' ? options.navLinkDayClick :
            viewType === 'week' ? options.navLinkWeekClick : null;
        if (typeof customAction === 'function') {
            customAction.call(calendarApi, dateEnv.toDate(dateMarker), ev);
        }
        else {
            if (typeof customAction === 'string') {
                viewType = customAction;
            }
            calendarApi.zoomTo(dateMarker, viewType);
        }
    };
    CalendarContent.prototype.buildAppendContent = function () {
        var props = this.props;
        var children = props.pluginHooks.viewContainerAppends.map(function (buildAppendContent) { return buildAppendContent(props); });
        return createElement.apply(void 0, __spreadArrays([Fragment, {}], children));
    };
    CalendarContent.prototype.renderView = function (props) {
        var pluginHooks = props.pluginHooks;
        var viewSpec = props.viewSpec;
        var viewProps = {
            dateProfile: props.dateProfile,
            businessHours: props.businessHours,
            eventStore: props.renderableEventStore,
            eventUiBases: props.eventUiBases,
            dateSelection: props.dateSelection,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize,
            isHeightAuto: props.isHeightAuto,
            forPrint: props.forPrint,
        };
        var transformers = this.buildViewPropTransformers(pluginHooks.viewPropsTransformers);
        for (var _i = 0, transformers_1 = transformers; _i < transformers_1.length; _i++) {
            var transformer = transformers_1[_i];
            __assign(viewProps, transformer.transform(viewProps, props));
        }
        var ViewComponent = viewSpec.component;
        return (createElement(ViewComponent, __assign_1({}, viewProps)));
    };
    return CalendarContent;
}(PureComponent));
export { CalendarContent };
function buildToolbarProps(viewSpec, dateProfile, dateProfileGenerator, currentDate, now, title) {
    // don't force any date-profiles to valid date profiles (the `false`) so that we can tell if it's invalid
    var todayInfo = dateProfileGenerator.build(now, undefined, false); // TODO: need `undefined` or else INFINITE LOOP for some reason
    var prevInfo = dateProfileGenerator.buildPrev(dateProfile, currentDate, false);
    var nextInfo = dateProfileGenerator.buildNext(dateProfile, currentDate, false);
    return {
        title: title,
        activeButton: viewSpec.type,
        isTodayEnabled: todayInfo.isValid && !rangeContainsMarker(dateProfile.currentRange, now),
        isPrevEnabled: prevInfo.isValid,
        isNextEnabled: nextInfo.isValid,
    };
}
// Plugin
// -----------------------------------------------------------------------------------------------------------------
function buildViewPropTransformers(theClasses) {
    return theClasses.map(function (TheClass) { return new TheClass(); });
}
//# sourceMappingURL=CalendarContent.js.map