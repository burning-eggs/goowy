/**
 * @name goowy
 * @description Root namespace for Goowy
 * @preserve Goowy Runtive v__CURRENT_SDK_VERSION__ revision __MERCURIAL_REVISION__
 *
 * Copyright 2021 wake-code. All rights reserved.
 * Do not distribute.
 */
var goowy = function () {
    // Public Interface
    var _goowy = {
        common: {},

        /**
         * Application Storage for Goowy
         */
        apps: {},

        /**
         * Exported Entity Data for Goowy
         */
        data: {},

        /**
         * @private
         * @function
         * @name goowy.unpack
         * @description Copy a set of common Goowy functions/classes/namespaces into the global namespace
         */
        unpack: function () {
            objects = [
                ["goowy.math.vec3", "vec3"],
                ["goowy.math.vec4", "vec4"],
                ["goowy.math.mat3", "mat3"],
                ["goowy.math.mat4", "mat4"]
            ]
        },

        /**
         * @param {Object} arr The array to convert
         * @return {Array} An Array
         * @function
         * @name goowy.makeArray
         * @description Convert an array-like object ( e.g. the arguments object ) into a normal array
         */
        makeArray: function (arr) {
            var i, ret = [], length = arr.length

            for (i = 0; i < length; ++i) {
                ret.push(arr[i])
            }

            return ret
        },

        /**
         * @deprecated There is a builtin function Array.map which should perform this task
         * @param {Array} arr
         * @param {Function} fn
         * @function
         * @name goowy.each
         * @description Call fn(index, arrayItem) for each item in the array
         */
        each: function (arr, fn) {
            var index, length = arr.length

            for (index = 0; index < length; ++index) {
                fn(index, arr[index])
            }
        },

        /**
         * @param {Object} self
         * @param {Object} fn
         * @returns {function(): *}
         * @function
         * @name goowy.callback
         * @description Create a callback function which maintains the correct value for "this"
         */
        callback: function (self, fn) {
            return function () {
                var args = goowy.makeArray(arguments)

                return fn.apply(self, args)
            }
        },

        type: function (obj) {
            if (obj == null) {
                return "null";
            }

            var type = typeof(obj)

            if (type === "undefined" || type === "number" || type === "string" || type === "boolean") {
                return type
            }

            return _typeLookup[Object.prototype.toString.call(obj)]
        },

        /**
         * @param {Object} target The target object of the merge
         * @param {Object} ex The object that is merged with the target
         * @return {Object} The target object
         * @function
         * @name goowy.extend
         * @description Merge the contents of two objects into a single object
         */
        extend: function (target, ex) {
            var prop, copy

            for (prop in ex) {
                copy = ex[prop]

                if (goowy.type(copy) === "object") {
                    target[prop] = goowy.extend({}, copy)
                } else if (goowy.type(copy) === "array") {
                    target[prop] = goowy.extend([], copy)
                } else {
                    target[prop] = copy
                }
            }

            return target
        },

        /**
         * @param o
         * @function
         * @name goowy.isDefined
         * @description Returns true if the object is undefined
         */
        isDefined: function (o) {
            var a

            return !(o === a)
        }
    }

    var _typeLookup = function () {
        var result = {}, index, names = ["Array", "Object", "Function", "Date", "RegExp", "Float32Array"]

        for (index = 0; index < names.length; ++index) {
            result["[object " + names[index] + "]"] = names[index].toLowerCase()
        }

        return result
    } ();

    return _goowy
} ();