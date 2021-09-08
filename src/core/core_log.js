/**
 * @description Contains logging methods
 */
var Log = {}

/**
 * @description Write text to the console
 * @param {String} text
 */
Log.write = function (text) {
    console.log(text)
}

/**
 * @description Start logging to the console
 * @param {String} text
 */
Log.open = function (text) {
    Log.write(Date())
    Log.info("Log Started")
}

/**
 * @description Write text to the log preceded by "INFO: "
 * @param {String} text
 */
Log.info = function (text) {
    Log.write("INFO: " + text)
}

/**
 * @description Write text to the log preceded by "ERROR: "
 * @param {String} text
 */
Log.error = function (text) {
    Log.write("ERROR: " + text)
}

/**
 * @description Write text to the log preceded by "WARNING: "
 * @param {String} text
 */
Log.warning = function (text) {
    Log.write("WARNING: " + text)
}

/**
 * @description Write text to the log preceded by "DEBUG: "
 * @param {String} text
 */
Log.debug = function (text) {
    Log.write("DEBUG: " + text)
}

/**
 * @description Write text to the log preceded by "ALERT: ". Shows an alert dialog box with the text.
 * @param {String} text
 */
Log.alert = function (text) {
    Log.write("ALERT: " + text)

    alert(text)
}

Log.assert = function (condition, text) {
    if (condition === false) {
        Log.write("ASSERTION FAILED: " + text)
    }
}

// These functions are designed so they can be optionally
// "compiled out" in release builds, like a CPP Macro.
/**
 * @see Log.info
 */
function logInfo(text) {
    Log.info(text)
}

/**
 * @see Log.error
 */
function logError(text) {
    Log.error(text)
}

/**
 * @see Log.warning
 */
function logWarning(text) {
    Log.warning(text)
}

/**
 * @see Log.debug
 */
function logDebug(text) {
    Log.debug(text)
}

/**
 * @see Log.alert
 */
function logAssert(condition, text) {
    Log.assert(condition, text)
}