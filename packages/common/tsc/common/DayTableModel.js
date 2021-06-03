var DayTableModel = /** @class */ (function () {
    function DayTableModel(daySeries, breakOnWeeks) {
        var dates = daySeries.dates;
        var daysPerRow;
        var firstDay;
        var rowCnt;
        if (breakOnWeeks) {
            // count columns until the day-of-week repeats
            firstDay = dates[0].getUTCDay();
            for (daysPerRow = 1; daysPerRow < dates.length; daysPerRow += 1) {
                if (dates[daysPerRow].getUTCDay() === firstDay) {
                    break;
                }
            }
            rowCnt = Math.ceil(dates.length / daysPerRow);
        }
        else {
            rowCnt = 1;
            daysPerRow = dates.length;
        }
        this.rowCnt = rowCnt;
        this.colCnt = daysPerRow;
        this.daySeries = daySeries;
        this.cells = this.buildCells();
        this.headerDates = this.buildHeaderDates();
    }
    DayTableModel.prototype.buildCells = function () {
        var rows = [];
        for (var row = 0; row < this.rowCnt; row += 1) {
            var cells = [];
            for (var col = 0; col < this.colCnt; col += 1) {
                cells.push(this.buildCell(row, col));
            }
            rows.push(cells);
        }
        return rows;
    };
    DayTableModel.prototype.buildCell = function (row, col) {
        var date = this.daySeries.dates[row * this.colCnt + col];
        return {
            key: date.toISOString(),
            date: date,
        };
    };
    DayTableModel.prototype.buildHeaderDates = function () {
        var dates = [];
        for (var col = 0; col < this.colCnt; col += 1) {
            dates.push(this.cells[0][col].date);
        }
        return dates;
    };
    DayTableModel.prototype.sliceRange = function (range) {
        var colCnt = this.colCnt;
        var seriesSeg = this.daySeries.sliceRange(range);
        var segs = [];
        if (seriesSeg) {
            var firstIndex = seriesSeg.firstIndex, lastIndex = seriesSeg.lastIndex;
            var index = firstIndex;
            while (index <= lastIndex) {
                var row = Math.floor(index / colCnt);
                var nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1);
                segs.push({
                    row: row,
                    firstCol: index % colCnt,
                    lastCol: (nextIndex - 1) % colCnt,
                    isStart: seriesSeg.isStart && index === firstIndex,
                    isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex,
                });
                index = nextIndex;
            }
        }
        return segs;
    };
    return DayTableModel;
}());
export { DayTableModel };
//# sourceMappingURL=DayTableModel.js.map