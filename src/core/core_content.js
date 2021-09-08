/**
 * @description Contains directories for accessing content
 * @name goowy.content
 */
goowy.content = function () {
    return {
        /**
         * @description The url of the game code relative to the page.
         * @name goowy.content.source
         */
        source: "",

        /**
         * @description The url of the assets relative to the page.
         * @name goowy.content.assets
         */
        assets: null,

        /**
         * @description Entity Data exported from the game database is stored in the data attribute.
         */
        data: {},

        /**
         * @description If data is accessed via a repository, then the username of the owner is required.
         */
        username: null,

        /**
         * @description if data is accessed via a repository, then the project name is required.
         */
        project: null,
    }
} ();