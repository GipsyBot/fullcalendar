/* eslint max-classes-per-file: off */
import { __extends } from "tslib";
import { __assign } from 'tslib';
import { Component } from './vdom';
import { ViewContextType } from './ViewContext';
import { compareObjs, getUnequalProps } from './util/object';
var PureComponent = /** @class */ (function (_super) {
    __extends(PureComponent, _super);
    function PureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PureComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.debug) {
            // eslint-disable-next-line no-console
            console.log(getUnequalProps(nextProps, this.props), getUnequalProps(nextState, this.state));
        }
        return !compareObjs(this.props, nextProps, this.propEquality) ||
            !compareObjs(this.state, nextState, this.stateEquality);
    };
    PureComponent.addPropsEquality = addPropsEquality;
    PureComponent.addStateEquality = addStateEquality;
    PureComponent.contextType = ViewContextType;
    return PureComponent;
}(Component));
export { PureComponent };
PureComponent.prototype.propEquality = {};
PureComponent.prototype.stateEquality = {};
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseComponent.contextType = ViewContextType;
    return BaseComponent;
}(PureComponent));
export { BaseComponent };
function addPropsEquality(propEquality) {
    var hash = Object.create(this.prototype.propEquality);
    __assign(hash, propEquality);
    this.prototype.propEquality = hash;
}
function addStateEquality(stateEquality) {
    var hash = Object.create(this.prototype.stateEquality);
    __assign(hash, stateEquality);
    this.prototype.stateEquality = hash;
}
// use other one
export function setRef(ref, current) {
    if (typeof ref === 'function') {
        ref(current);
    }
    else if (ref) {
        // see https://github.com/facebook/react/issues/13029
        ref.current = current;
    }
}
//# sourceMappingURL=vdom-util.js.map