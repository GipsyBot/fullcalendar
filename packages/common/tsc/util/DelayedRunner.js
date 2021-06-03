var DelayedRunner = /** @class */ (function () {
    function DelayedRunner(drainedOption) {
        this.drainedOption = drainedOption;
        this.isRunning = false;
        this.isDirty = false;
        this.pauseDepths = {};
        this.timeoutId = 0;
    }
    DelayedRunner.prototype.request = function (delay) {
        this.isDirty = true;
        if (!this.isPaused()) {
            this.clearTimeout();
            if (delay == null) {
                this.tryDrain();
            }
            else {
                this.timeoutId = setTimeout(// NOT OPTIMAL! TODO: look at debounce
                this.tryDrain.bind(this), delay);
            }
        }
    };
    DelayedRunner.prototype.pause = function (scope) {
        if (scope === void 0) { scope = ''; }
        var pauseDepths = this.pauseDepths;
        pauseDepths[scope] = (pauseDepths[scope] || 0) + 1;
        this.clearTimeout();
    };
    DelayedRunner.prototype.resume = function (scope, force) {
        if (scope === void 0) { scope = ''; }
        var pauseDepths = this.pauseDepths;
        if (scope in pauseDepths) {
            if (force) {
                delete pauseDepths[scope];
            }
            else {
                pauseDepths[scope] -= 1;
                var depth = pauseDepths[scope];
                if (depth <= 0) {
                    delete pauseDepths[scope];
                }
            }
            this.tryDrain();
        }
    };
    DelayedRunner.prototype.isPaused = function () {
        return Object.keys(this.pauseDepths).length;
    };
    DelayedRunner.prototype.tryDrain = function () {
        if (!this.isRunning && !this.isPaused()) {
            this.isRunning = true;
            while (this.isDirty) {
                this.isDirty = false;
                this.drained(); // might set isDirty to true again
            }
            this.isRunning = false;
        }
    };
    DelayedRunner.prototype.clear = function () {
        this.clearTimeout();
        this.isDirty = false;
        this.pauseDepths = {};
    };
    DelayedRunner.prototype.clearTimeout = function () {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = 0;
        }
    };
    DelayedRunner.prototype.drained = function () {
        if (this.drainedOption) {
            this.drainedOption();
        }
    };
    return DelayedRunner;
}());
export { DelayedRunner };
//# sourceMappingURL=DelayedRunner.js.map