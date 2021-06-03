import { startOfDay, createDuration, asRoughMs, rangeContainsMarker, } from '@fullcalendar/common';
var TimeColsSlatsCoords = /** @class */ (function () {
    function TimeColsSlatsCoords(positions, dateProfile, slotDuration) {
        this.positions = positions;
        this.dateProfile = dateProfile;
        this.slotDuration = slotDuration;
    }
    TimeColsSlatsCoords.prototype.safeComputeTop = function (date) {
        var dateProfile = this.dateProfile;
        if (rangeContainsMarker(dateProfile.currentRange, date)) {
            var startOfDayDate = startOfDay(date);
            var timeMs = date.valueOf() - startOfDayDate.valueOf();
            if (timeMs >= asRoughMs(dateProfile.slotMinTime) &&
                timeMs < asRoughMs(dateProfile.slotMaxTime)) {
                return this.computeTimeTop(createDuration(timeMs));
            }
        }
        return null;
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given date.
    // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
    TimeColsSlatsCoords.prototype.computeDateTop = function (when, startOfDayDate) {
        if (!startOfDayDate) {
            startOfDayDate = startOfDay(when);
        }
        return this.computeTimeTop(createDuration(when.valueOf() - startOfDayDate.valueOf()));
    };
    // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
    // This is a makeshify way to compute the time-top. Assumes all slatMetas dates are uniform.
    // Eventually allow computation with arbirary slat dates.
    TimeColsSlatsCoords.prototype.computeTimeTop = function (duration) {
        var _a = this, positions = _a.positions, dateProfile = _a.dateProfile;
        var len = positions.els.length;
        // floating-point value of # of slots covered
        var slatCoverage = (duration.milliseconds - asRoughMs(dateProfile.slotMinTime)) / asRoughMs(this.slotDuration);
        var slatIndex;
        var slatRemainder;
        // compute a floating-point number for how many slats should be progressed through.
        // from 0 to number of slats (inclusive)
        // constrained because slotMinTime/slotMaxTime might be customized.
        slatCoverage = Math.max(0, slatCoverage);
        slatCoverage = Math.min(len, slatCoverage);
        // an integer index of the furthest whole slat
        // from 0 to number slats (*exclusive*, so len-1)
        slatIndex = Math.floor(slatCoverage);
        slatIndex = Math.min(slatIndex, len - 1);
        // how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
        // could be 1.0 if slatCoverage is covering *all* the slots
        slatRemainder = slatCoverage - slatIndex;
        return positions.tops[slatIndex] +
            positions.getHeight(slatIndex) * slatRemainder;
    };
    return TimeColsSlatsCoords;
}());
export { TimeColsSlatsCoords };
//# sourceMappingURL=TimeColsSlatsCoords.js.map