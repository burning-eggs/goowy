goowy.extend(goowy, function () {
    /**
     * @name goowy.json
     * @description Extended versions of builtin json parsing environment
     */
    var json = {
        /**
         * @function
         * @name goowy.json.parse
         * @description Identical to JSON.parse
         * @param {Object} value
         * @param {Object} reviver
         */
        parse: function (value, reviver) {
            return JSON.parse(value, reviver)
        },

        /**
         *
         * @description Extended version of JSON.stringify which converts Float32Arrays into normal Arrays before encoding
         * @param {Object} value
         * @param {Object} replacer
         * @param {Object} space
         */
        stringify: function (value, replacer, space) {
            return JSON.stringify(value, function (key, value) {
                if (this[key] instanceof Float32Array) {
                    value = goowy.makeArray(this[key])
                }

                return replacer ? replacer(key, value) : value
            }, space)
        }
    }

    return {
        json: json
    }
} ())