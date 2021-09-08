/**
 * @name goowy.time
 * @description Time functions
 */
goowy.time = function () {
    /**
     * @name goowy.time.Timer
     * @constructor Create a new Timer instance
     * @description A Timer counts milliseconds from when start() is called until stop() is called
     */
    var Timer = function Timer() {
        this._isRunning = false
        this._a = 0
        this._b = 0
    }

    /**
     * @function
     * @name goowy.time.Timer#start
     * @description Starts the timer
     */
    Timer.prototype.start = function () {
        this._isRunning = true
        this._a = (new Date()).getTime()
    }

    /**
     * @function
     * @name goowy.time.Timer#stop
     * @description Stops the timer
     */
    Timer.prototype.stop = function () {
        this._isRunning = false
        this._b = (new Date()).getTime()
    }

    /**
     * @function
     * @name goowy.time.Timer#getMilliseconds
     * @description Gets the number of milliseconds that passed between start() and stop() being called
     */
    Timer.prototype.getMilliseconds = function () {
        return this._b - this._a
    }

    return {
        Timer: Timer,

        /**
         * @function
         * @name goowy.time.now
         * @description Get current time in milliseconds
         * @returns {number} The time in milliseconds
         */
        now: function () {
            return new Date().getTime()
        }
    }
} ();