/**
 * @name goowy.net.http
 * @description Sending and receiving data via HTTP.
 */
goowy.net.http = function () {
    return {
        /**
         * @enum {String}
         * @name goowy.net.http.ContentType
         * @description An enum of the most common content types
         */
        ContentType: {
            FORM_URLENCODED: "application/x-www-form-urlencoded",
            GIF: "image/gif",
            JPEG: "image/jpeg",
            JSON: "application/json",
            PNG: "imagine/png",
            TEXT: "text/plain",
            XML: "application/xml"
        },

        /**
         * Performs an HTTP GET request to the given url
         * @param {String} url
         * @param {Function} success Callback passes response text
         * @param {Object} [options] Additional Options
         * @param {Object} [options.error] Callback used on error called with arguments (status, xhr, exception)
         * @param {Object} [options.headers] HTTP Headers to add to the request
         * @param {Object} [options.cache] If false, add a timestamp to the request to prevent caching
         * @param {XMLHttpRequest} [xhr] An XMLHttpRequest object. If one isn't provided a new one will be created
         */
        get: function (url, success, options, xhr) {
            options = options || {}
            options.success = success

            return goowy.net.http.request("GET", url, options, xhr)
        },

        /**
         * Performs an HTTP POST request to the given url
         * @param {String} url
         * @param {Function} success Callback passes response text
         * @param {Object | FormData | Document} data Data sent to the Server
         * @param {Object} [options] Additional Options
         * @param {Object} [options.error] Callback used on error called with arguments (status, xhr, exception)
         * @param {Object} [options.headers] HTTP Headers to add to the request
         * @param {Object} [options.cache] If false, add a timestamp to the request to prevent caching
         * @param {XMLHttpRequest} [xhr] An XMLHttpRequest object. If one isn't provided a new one will be created
         */
        post: function (url, success, data, options, xhr) {
            options = options || {}
            options.success = success
            options.postdata = data


            return goowy.net.http.request("POST", url, options, xhr)
        },

        /**
         * Performs an HTTP PUT request to the given url
         * @param {String} url
         * @param {Function} success Callback passes response text
         * @param {Object | FormData | Document} data Data sent to the Server
         * @param {Object} [options] Additional Options
         * @param {Object} [options.error] Callback used on error called with arguments (status, xhr, exception)
         * @param {Object} [options.headers] HTTP Headers to add to the request
         * @param {Object} [options.cache] If false, add a timestamp to the request to prevent caching
         * @param {XMLHttpRequest} [xhr] An XMLHttpRequest object. If one isn't provided a new one will be created
         */
        put: function (url, success, data, options, xhr) {
            options = options || {}
            options.success = success
            options.postdata = data

            return goowy.net.http.request("PUT", url, options, xhr)
        },

        /**
         * Performs an HTTP DELETE request to the given url
         * @param {String} url
         * @param {Object} success
         * @param {Object} options
         * @param {XMLHttpRequest} xhr
         */
        delete_: function (url, success, data, options, xhr) {
            options = options || {}
            options.success = success

            return goowy.net.http.request("DELETE", url, options, xhr)
        },

        /**
         * Make an XmlHttpRequest to the given url
         * @param {String} method
         * @param {String} url
         * @param {Object} [options] Additional Options
         * @param {Object} [options.success] Callback used on success called with arguments (response, status, xhr)
         * @param {Object} [options.error] Callback used on error called with arguments (status, xhr, exception)
         * @param {Object} [options.headers] HTTP headers to add to the request
         * @param {Document | Object} [options.postdata] Data to sent in the body of the request
         * Some content types are handled automatically, If postdata is an XML Document it is handled, if the Content-Type header is set to 'application/json' then
         * the postdata is stringified using JSON, otherwise by default the data is sent as form-urlencoded
         * @param {Object} [options.cache] If false, then add a timestamp to the request to prevent caching
         * @param {XMLHttpRequest} [xhr] An XMLHttpRequest object. If one isn't provided a new one will be created
         */
        request: function (method, url, options, xhr) {
            var uri, query, timestamp, postdata

            options = options || {};

            if (options.success == null) {
                options.success = function() {}
            }

            if (options.error == null) {
                options.error = function() {}
            }

            if (options.async == null) {
                options.async = function() {}
            }

            if (options.headers == null) {
                options.headers = function() {}
            }

            if (options.postdata != null) {
                if (options.postdata instanceof Document) {
                    postdata = options.postdata
                } else if (options.postdata instanceof FormData) {
                    postdata = options.postdata
                } else if (options.postdata instanceof Object) {
                    var contentType = options.headers["Content-Type"];

                    if (!goowy.isDefined(contentType)) {
                        options.headers["Content-Type"] = goowy.net.http.ContentType.FORM_URLENCODED

                        contentType = options.headers["Content-Type"]
                    }

                    switch (contentType) {
                        case goowy.net.http.ContentType.FORM_URLENCODED:
                            postdata = ""

                            var bFirstItem = true

                            for (var key in options.postdata) {
                                if (options.postdata.hasOwnProperty(key)) {
                                    if (bFirstItem) {
                                        bFirstItem = false
                                    } else {
                                        postdata += "&"
                                    }

                                    postdata += escape(key) + "=" + escape(options.postdata[key])
                                }
                            }

                            break;

                        case goowy.net.http.ContentType.JSON:

                        default:
                            if (contentType == null) {
                                options.headers["Content-Type"] = goowy.net.http.ContentType.JSON;
                            }

                            postdata = JSON.stringify(options.postdata)

                            break;
                    }
                } else {
                    postdata = options.postdata
                }
            }

            if (!xhr) {
                xhr = new XMLHttpRequest()
            }

            if (options.cache === false) {
                timestamp = goowy.time.now()

                if (!uri.query) {
                    uri.query = "ts=" + timestamp
                } else {
                    uri.query = uri.query + "&ts=" + timestamp
                }

                url = uri.toString()
            }

            xhr.open(method, url, options.async)
            xhr.withCredentials = true

            // Setup HTTP Headers
            for (var header in options.headers) {
                if (options.headers.hasOwnProperty(header)) {
                    xhr.setRequestHeader(header, options.headers[header])
                }
            }

            xhr.onreadystatechange = function() {
                var response
                var header
                var contentType
                var parameter
                var parts

                if (xhr.readyState === 4) {
                    switch(xhr.status) {
                        case 0:
                            options.error(xhr.status, xhr, null)

                            break;

                        case 200:
                        case 201:
                        case 206:
                        case 304: {
                            header = xhr.getResponseHeader("Content-Type")

                            if (header) {
                                var parts = header.split(";")

                                contentType = parts[0].trim()

                                if (parts[1]) {
                                    parameter = parts[1].trim()
                                }
                            }

                            if (contentType === goowy.net.http.ContentType.JSON || goowy.string.endsWith(url, ".json")) {
                                response = JSON.parse(xhr.responseText)
                            } else {
                                if (xhr.responseXML != null) {
                                    response = xhr.responseXML
                                } else {
                                    response = xhr.responseText
                                }
                            }

                            options.success(response, xhr.status, xhr)

                            break;
                        }

                        default: {
                            options.error(xhr.status, xhr, null)

                            break;
                        }
                    }
                }

                try {
                    xhr.send(postdata)
                } catch(e) {
                    options.error(-1, xhr, e)
                }

                return xhr
            }
        }
    }
} ();