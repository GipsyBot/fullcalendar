import { createVerboseFormattingArg } from './DateFormatter';
var FuncFormatter = /** @class */ (function () {
    function FuncFormatter(func) {
        this.func = func;
    }
    FuncFormatter.prototype.format = function (date, context, betterDefaultSeparator) {
        return this.func(createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
    };
    FuncFormatter.prototype.formatRange = function (start, end, context, betterDefaultSeparator) {
        return this.func(createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
    };
    return FuncFormatter;
}());
export { FuncFormatter };
//# sourceMappingURL=formatting-func.js.map