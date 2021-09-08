if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this != "function") {
            throw new TypeError("Function.prototype.bind - What is trying to be fBound is not callable.")
        }

        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {}, fBound = function () {
            return fToBind.apply(this instanceof fNOP ? this: oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)))
        }

        fNOP.prototype = this.prototype
        fBound.prototype = new fNOP()

        return fBound
    }
}