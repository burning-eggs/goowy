/**
 * @name goowy.path
 * @description Code for manipulating file and resource paths
 */
goowy.path = function () {
    return {
        /**
         * @description The character that separates path segments
         * @name goowy.path.delimiter
         */
        delimiter: "/",

        join: function () {
            var index
            var num = arguments.length
            var result = arguments[0]

            for (index = 0; index < num - 1; ++index) {
                var one = arguments[index]
                var two = arguments[index + 1]

                if (!goowy.isDefined(one) || !goowy.isDefined(two)) {
                    throw new Error("Undefined argument to goowy.path.join")
                }

                if (two[0] === goowy.path.delimiter) {
                    result = two

                    continue
                }

                if (one && two && one[one.length - 1] !== goowy.path.delimiter && two[0] !== goowy.path.delimiter) {
                    result += (goowy.path.delimiter + two)
                } else {
                    result += (two)
                }
            }

            return result
        },

        /**
         * @description Get the directory name from the path. This is everything up to the final instance of goowy.path.delimiter
         * @function
         * @param path
         * @name goowy.path.getDirectory
         */
        getDirectory: function (path) {
            var parts = path.split(goowy.path.delimiter)

            return parts.slice(0, parts.length - 1).join(goowy.path.delimiter)
        },

        isRelativePath: function (s) {
            return s.charAt(0) !== "/" && s.match(/:\/\//) === null
        },

        extractPath: function (s) {
            var path = "."

            parts = s.split("/")
            i = 0

            if (parts.length > 1) {
                if (goowy.path.isRelativePath(s) === false) {
                    path = ""
                }

                for (i = 0; i < parts.length - 1; ++i) {
                    path += "/" + parts[i]
                }
            }

            return path
        }
    }
} ();