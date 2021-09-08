goowy.extend(goowy, function () {
    return {
        /**
         * @function
         * @name goowy.createURI
         * @description Create a URI Object from constituent parts
         * @param {Object} options Parts of the URI to build
         * @param {String} [options.scheme] The URI Scheme (e.g. http)
         * @param {String} [options.authority] The URI Authority (e.g. www.example.com)
         * @param {String} [options.host] The URI Host (e.g. http://www.example.com)
         * @param {String} [options.path] The URI Path (e.g. /users/example)
         * @param {String} [options.hostpath] The URI HostPath (e.g. http://www.example.com/users/example)
         * @param {String} [options.query] The URI Query (e.g. http://www.example.com?key=value&another=123)
         * @param {String} [options.fragment] The URI Fragment (e.g. http://www.example.com#fragment/data)
         */
        createURI: function (options) {
            var s = ""

            if ((options.authority || options.scheme) && (options.host || options.hostpath)) {
                throw new Error("Cannot have 'scheme' or 'authority' and 'host' or 'hostpath' option.")
            }

            if (options.host && options.hostpath) {
                throw new Error("Cannot have 'host' and 'hostpath' option.")
            }

            if (options.path && options.hostpath) {
                throw new Error("Cannot have 'path' and 'hostpath' option.")
            }

            if (options.scheme) {
                s += options.scheme + ":"
            }

            if (options.authority) {
                s += "//" + options.authority
            }

            if (options.host) {
                s += options.host
            }

            if (options.path) {
                s += options.path
            }

            if (options.hostpath) {
                s += options.hostpath
            }

            if (options.query) {
                s += options.query
            }

            if (options.fragment) {
                s += options.fragment
            }

            return s
        },

        /**
         * @name goowy.URI
         * @description Create a new URI Object
         * @param uri
         * @class {String} uri URI String
         */
        URI: function (uri) {
            var re = /^(([^:\/?\#]+):)?(\/\/([^\/?\#]*))?([^?\#]*)(\?([^\#]*))?(\#(.*))?/

            result = uri.match(re)

            /**
             * @name goowy.URI#scheme
             * @description The URI Scheme
             * @see goowy.createURI
             */
            this.scheme = result[2]

            /**
             * @name goowy.URI#authority
             * @description The URI Authority
             * @see goowy.createURI
             */
            this.authority = result[4]

            /**
             * @name goowy.URI#path
             * @description The URI Path
             * @see goowy.createURI
             */
            this.path = result[5]

            /**
             * @name goowy.URI#query
             * @description The URI Query
             * @see goowy.createURI
             */
            this.query = result[7]

            /**
             * @name goowy.URI#fragment
             * @description The URI Fragment
             * @see goowy.createURI
             */
            this.fragment = result[9]

            /**
             * @function
             * @name goowy.URI#toString
             * @description Convert URI back to a String
             */
            this.toString = function () {
                var s = ""

                if (this.scheme) {
                    s += this.scheme + ":"
                }

                if (this.authority) {
                    s += "//" + this.authority
                }

                s += this.path

                if (this.query) {
                    s += "?" + this.query
                }

                if (this.fragment) {
                    s += "#" + this.fragment
                }

                return s
            }

            /**
             * @function
             * @name goowy.URI#getQuery
             * @description Returns the query parameters in an Object
             */
            this.getQuery = function () {
                var vars
                var pair
                var result = {}

                vars = decodeURIComponent(this.query).split("&")
                vars.forEach(function (item, index, arr) {
                    pair = item.split("=")
                    result[pair[0]] = pair[1]
                }, this)

                return result
            }

            this.setQuery = function (params) {
                q = ""

                for (key in params) {
                    if (params.hasOwnProperty(key)) {
                        if (q !== "") {
                            q += "&"
                        }

                        q += encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
                    }
                }

                this.query = q
            }
        }
    }
} ())