Function.prototype.extendsFrom = function (Super) {
    var Self
    var Func
    var Temp = function () {}

    Self = this

    Func = function () {
        Super.apply(this, arguments)
        Self.apply(this, arguments)

        this.constructor = Self
    }

    Func._super = Super.prototype
    Temp.prototype = Super.prototype
    Func.prototype = new Temp()

    return Func
}