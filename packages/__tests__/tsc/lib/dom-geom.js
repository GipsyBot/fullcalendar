import { isRect, isRectMostlyAbove, isRectMostlyLeft, isRectMostlyBounded, isRectMostlyHBounded, isRectMostlyVBounded, rectsIntersect, rectContainersOther, } from './geom';
// fix bug with jQuery 3 returning 0 height for <td> elements in the IE's
['height', 'outerHeight'].forEach(function (methodName) {
    var orig = $.fn[methodName];
    $.fn[methodName] = function () {
        if (!arguments.length && this.is('td')) { // eslint-disable-line prefer-rest-params
            return this[0].getBoundingClientRect().height;
        }
        return orig.apply(this, arguments); // eslint-disable-line prefer-rest-params
    };
});
export function getBoundingRects(els) {
    return $(els).map(function (i, node) { return getBoundingRect(node); }).get();
}
export function getBoundingRect(el) {
    el = $(el);
    return $.extend({}, el[0].getBoundingClientRect(), {
        node: el,
    });
}
export function anyElsIntersect(els) {
    var rects = els.map(function (el) { return el.getBoundingClientRect(); });
    for (var i = 0; i < rects.length; i += 1) {
        for (var j = i + 1; j < rects.length; j += 1) {
            if (rectsIntersect(rects[i], rects[j])) {
                return [els[i], els[j]];
            }
        }
    }
    return false;
}
export function anyElsObscured(els) {
    var rects = els.map(function (el) { return el.getBoundingClientRect(); });
    for (var i = 0; i < rects.length; i += 1) {
        for (var j = 0; j < rects.length; j += 1) {
            if (i !== j && rectContainersOther(rects[i], rects[j])) {
                return [els[i], els[j]];
            }
        }
    }
    return false;
}
export function getLeadingBoundingRect(els, direction) {
    if (direction === void 0) { direction = 'ltr'; }
    els = $(els);
    expect(els.length).toBeGreaterThan(0);
    var best = null;
    els.each(function (i, node) {
        var rect = getBoundingRect(node);
        if (!best) {
            best = rect;
        }
        else if (direction === 'rtl') {
            if (rect.right > best.right) {
                best = rect;
            }
        }
        else if (rect.left < best.left) {
            best = rect;
        }
    });
    return best;
}
export function getTrailingBoundingRect(els, direction) {
    if (direction === void 0) { direction = 'ltr'; }
    els = $(els);
    expect(els.length).toBeGreaterThan(0);
    var best = null;
    els.each(function (i, node) {
        var rect = getBoundingRect(node);
        if (!best) {
            best = rect;
        }
        else if (direction === 'rtl') {
            if (rect.left < best.left) {
                best = rect;
            }
        }
        else if (rect.right > best.right) {
            best = rect;
        }
    });
    return best;
}
export function sortBoundingRects(els, direction) {
    if (direction === void 0) { direction = 'ltr'; }
    els = $(els); // TODO: un-jquery-ify
    var rects = els.map(function (i, node) { return getBoundingRect(node); }).get();
    rects.sort(function (a, b) {
        if (direction === 'rtl') {
            return b.right - a.right;
        }
        return a.left - b.left;
    });
    return rects;
}
// given an element, returns its bounding box. given a rect, returns the rect.
function massageRect(input) {
    if (isRect(input)) {
        return input;
    }
    return getBoundingRect(input);
}
// Jasmine Adapters
// --------------------------------------------------------------------------------------------------
beforeEach(function () {
    jasmine.addMatchers({
        toBeMostlyAbove: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: isRectMostlyAbove(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect is not mostly above the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyBelow: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: !isRectMostlyAbove(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect is not mostly below the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyLeftOf: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: isRectMostlyLeft(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect is not mostly left of the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyRightOf: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: !isRectMostlyLeft(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect is not mostly right of the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyBoundedBy: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: isRectMostlyBounded(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect is not mostly bounded by the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyHBoundedBy: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: isRectMostlyHBounded(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect does not mostly horizontally bound the second';
                    }
                    return result;
                },
            };
        },
        toBeMostlyVBoundedBy: function () {
            return {
                compare: function (subject, other) {
                    var result = { pass: isRectMostlyVBounded(massageRect(subject), massageRect(other)), message: '' };
                    if (!result.pass) {
                        result.message = 'first rect does not mostly vertically bound the second';
                    }
                    return result;
                },
            };
        },
        toBeBoundedBy: function () {
            return {
                compare: function (actual, expected) {
                    var outer = massageRect(expected);
                    var inner = massageRect(actual);
                    var result = {
                        message: '',
                        pass: outer && inner &&
                            inner.left >= outer.left &&
                            inner.right <= outer.right &&
                            inner.top >= outer.top &&
                            inner.bottom <= outer.bottom,
                    };
                    if (!result.pass) {
                        result.message = 'Element does not bound other element';
                    }
                    return result;
                },
            };
        },
        toBeLeftOf: function () {
            return {
                compare: function (actual, expected) {
                    var subjectBounds = massageRect(actual);
                    var otherBounds = massageRect(expected);
                    var result = {
                        message: '',
                        pass: subjectBounds && otherBounds &&
                            Math.round(subjectBounds.right) <= Math.round(otherBounds.left) + 2,
                    };
                    if (!result.pass) {
                        result.message = 'Element is not to the left of the other element';
                    }
                    return result;
                },
            };
        },
        toBeRightOf: function () {
            return {
                compare: function (actual, expected) {
                    var subjectBounds = massageRect(actual);
                    var otherBounds = massageRect(expected);
                    var result = {
                        message: '',
                        pass: subjectBounds && otherBounds &&
                            Math.round(subjectBounds.left) >= Math.round(otherBounds.right) - 2,
                    };
                    if (!result.pass) {
                        result.message = 'Element is not to the right of the other element';
                    }
                    return result;
                },
            };
        },
        toBeAbove: function () {
            return {
                compare: function (actual, expected) {
                    var subjectBounds = massageRect(actual);
                    var otherBounds = massageRect(expected);
                    var result = {
                        message: '',
                        pass: subjectBounds && otherBounds &&
                            Math.round(subjectBounds.bottom) <= Math.round(otherBounds.top) + 2,
                    };
                    if (!result.pass) {
                        result.message = 'Element is not above the other element';
                    }
                    return result;
                },
            };
        },
        toBeBelow: function () {
            return {
                compare: function (actual, expected) {
                    var subjectBounds = massageRect(actual);
                    var otherBounds = massageRect(expected);
                    var result = {
                        message: '',
                        pass: subjectBounds && otherBounds &&
                            Math.round(subjectBounds.top) >= Math.round(otherBounds.bottom) - 2,
                    };
                    if (!result.pass) {
                        result.message = 'Element is not below the other element';
                    }
                    return result;
                },
            };
        },
        toIntersectWith: function () {
            return {
                compare: function (actual, expected) {
                    var subjectBounds = massageRect(actual);
                    var otherBounds = massageRect(expected);
                    var result = {
                        message: '',
                        pass: subjectBounds && otherBounds &&
                            subjectBounds.right - 1 > otherBounds.left &&
                            subjectBounds.left + 1 < otherBounds.right &&
                            subjectBounds.bottom - 1 > otherBounds.top &&
                            subjectBounds.top + 1 < otherBounds.bottom,
                    };
                    if (!result.pass) {
                        result.message = 'Element does not intersect with other element';
                    }
                    return result;
                },
            };
        },
    });
});
//# sourceMappingURL=dom-geom.js.map