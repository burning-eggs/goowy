/**
 * @name goowy.string
 * @description Extended common string functions
 */
goowy.string = function () {
    return {
        /**
         * @name goowy.string.ASCII_LOWERCASE
         * @description All lowercase characters
         */
        ASCII_LOWERCASE: "abcdefghijklmnopqrstuvwxyz",

        /**
         * @name goowy.string.ASCII_UPPERCASE
         * @description All lowercase characters
         */
        ASCII_UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /**
         * @name goowy.string.ASCII_LETTERS
         * @description All ASCII letters
         */
        ASCII_LETTERS: this.ASCII_LOWERCASE + this.ASCII_UPPERCASE,

        /**
         * @function
         * @name goowy.string.format
         * @description Return a string with {n} replaced with the n-th argument
         * @param s The string to format
         * @param {Object} [arguments] All other arguments are substituted into the string
         */
        format: function (s) {
            var i = 0, regexp, args = goowy.makeArray(arguments)

            args.shift() // Drop first argument (not needed)

            for (i = 0; i < args.length; i++) {
                regexp = new RegExp('\\{' + i + '\\}', 'gi')
                s = s.replace(regexp, args[i])
            }

            return s
        },

        startsWith: function (s, subs) {
            return (s.indexOf(subs) === 0)
        },

        endsWith: function (s, subs) {
            return (s.lastIndexOf(subs, s.length - subs.length) !== -1)
        }
    }
} ();