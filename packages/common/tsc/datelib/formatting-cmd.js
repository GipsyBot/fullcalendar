import { createVerboseFormattingArg } from './DateFormatter';
/*
TODO: fix the terminology of "formatter" vs "formatting func"
*/
/*
At the time of instantiation, this object does not know which cmd-formatting system it will use.
It receives this at the time of formatting, as a setting.
*/
var CmdFormatter = /** @class */ (function () {
    function CmdFormatter(cmdStr) {
        this.cmdStr = cmdStr;
    }
    CmdFormatter.prototype.format = function (date, context, betterDefaultSeparator) {
        return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(date, null, context, betterDefaultSeparator));
    };
    CmdFormatter.prototype.formatRange = function (start, end, context, betterDefaultSeparator) {
        return context.cmdFormatter(this.cmdStr, createVerboseFormattingArg(start, end, context, betterDefaultSeparator));
    };
    return CmdFormatter;
}());
export { CmdFormatter };
//# sourceMappingURL=formatting-cmd.js.map