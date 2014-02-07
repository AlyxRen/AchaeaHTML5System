var Class = require('./resigsimpleclass.js').Class
var _slice = [].slice,
    Base,
    Group,
    ReflexPackage,
    Reflex,
    Code,
    ReflexHelpers

Base = Class.extend({
    init: function(id, type, name, enabled) {
        this.type = type
        this.name = name
        this.id = +id
        this.enabled = !!enabled
    },
    attr: function(key, value) {
        if (!value) {
            return this[key]
        }
        this[key] = value
        return this
    }
})

Group = Base.extend({
    init: function(id, name, enabled) {
        this._super(id, 'group', name, enabled)
        this.items = []
    },
    add: function(action) {
        if (!(action instanceof Base)) {
            throw 'input not instanceof Base'
        }
        this.items.push(action);
        return this;
    }
})
ReflexPackage = Group.extend({
    init: function(id, name, desc, enabled) {
        this._super(id, name, enabled)
        this.description = desc
    }
})

Reflex = Base.extend({
    init: function(id, type, name, enabled) {
        this._super(id, type, name, enabled)
        this.actions = []
    }
})

Code = Reflex.extend({
    init: function(id, name, code, enabled) {
        this._super(id, 'function', name, enabled)
        this.code = code
    }
})

ReflexHelpers = {
    codeCompile: function() {
        var args = 1 <= arguments.length ? _slice.call(arguments, 0) : []
        return args.join('\n')
    }
}




exports.Base = Base
exports.Group = Group
exports.ReflexPackage = ReflexPackage
exports.Reflex = Reflex
exports.Code = Code
exports.ReflexHelpers = ReflexHelpers
exports.import = function Import(target) {
    for (key in this) {
        if (this[key] != Import) {
            target[key] = this[key]
        }
    }
}
