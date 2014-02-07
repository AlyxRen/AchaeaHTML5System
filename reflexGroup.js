var Class = require('./resigsimpleclass.js').Class
var _slice = [].slice,
    Base,
    Group,
    ReflexPackage,

    Reflex,
    Alias,
    Keybind,
    Trigger,
    Code,

    Action,
    Command,
    Notice,
    Gag,
    Highlight,
    Rewrite,
    CallCode,
    ExecCode,

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
        return this
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
    },
    act: function(action) {
        if (!(action instanceof Action)) {
            throw 'Action not instanceof Action'
        }
        this.actions.push(action)
        return this
    }
})

Alias = Reflex.extend({
    init: function(id, name, text, matching, whole_words,
                   presuf, enabled) {
        this._super(id, 'alias', name, enabled)
        this.text = text
        this.matching = matching
        this.whole_words = whole_words
        this.prefix_suffix = presuf
    },
    act: function(action) {
        if (!(action instanceof Command)) {
            throw 'Can only add Commands'
        }
        return this._super(action)
    }
})

Keybind = Reflex.extend({
    init: function(id, name, key, key_alt, key_ctrl, key_shift, enabled) {
        this._super(id, 'keybind', name, enabled)
        this.key = key
        this.key_alt   = !!key_alt
        this.key_ctrl  = !!key_ctrl
        this.key_shift = !!key_shift
    },
    act: function(action) {
        if (!(action instanceof Command)) {
            throw 'Can only add Commands'
        }
        return this._super(action)
    }
})

Trigger = Reflex.extend({
    init: function(id, name, text, matchtype, case_sensitive,
                   whole_words, enabled) {
        this._super(id, 'trigger', name, enabled)
        this.matching = matchtype
        this.text = text
        this.whole_words = whole_words
        this.case_sensitive = case_sensitive
    }
})

Code = Reflex.extend({
    init: function(id, name, code, enabled) {
        this._super(id, 'function', name, enabled)
        this.code = code
    },
    act: function(a) { return this }
})

Action = Class.extend({

})

Command = Action.extend({
    init: function(command, presuf) {
        if (!typeof presuf == 'undefined') {
            this.prefix_suffix = presuf
        }
        this.command = command
    }
})

Notice = Action.extend({
    'init': function(text, fg, bg) {
        this.action = "notify"
        this.notice = text
        this.notice_fg = fg
        this.notice_bg = bg
    }
})

Gag = Action.extend({
    'init': function() {
        this.action = "gag"
    }
})

Highlight = Action.extend({
    'init': function(type, fg, bg, backref) {
        this.action = "highlight"
        this.highlight = type
        this.highlight_backref = backref
        this.highlight_fg = fg
        this.highlight_bg = bg
    }
})

Rewrite = Action.extend({
    'init': function(type, text, colors, fg, bg, backref) {
        this.action = "rewrite"
        this.rewrite = type
        this.rewrite_text = text
        this.rewrite_backref = backref
        this.rewrite_colors = colors
        this.rewrite_fg = fg
        this.rewrite_bg = bg
    }
})

CallCode = Action.extend({
    'init': function(fn) {
        this.action = "function"
        this.fn = fn
    }
})

ExecCode = Action.extend({
    'init': function(script) {
        this.action = "script"
        this.script = script
    }
})

ReflexHelpers = {
    codeCompile: function() {
        var args = 1 <= arguments.length ? _slice.call(arguments, 0) : []
        return args.join('\n')
    },
    Matching: {
        contains: 'substring',
        begins: 'begins',
        exact: 'exact',
        regex: 'regexp'
    },
    ReactionOptions: {
        match: 'match',
        line: 'line',
        prefix: 'prefix',
        suffix: 'suffix',
        backref: 'backref'
    }
}




exports.Base = Base
exports.Group = Group
exports.ReflexPackage = ReflexPackage

exports.Reflex = Reflex
exports.Alias = Alias
exports.Keybind = Keybind
exports.Trigger = Trigger
exports.Code = Code

exports.Action = Action
exports.Command = Command
exports.Notice = Notice
exports.Gag = Gag
exports.Highlight = Highlight
exports.Rewrite = Rewrite
exports.CallCode = CallCode
exports.ExecCode = ExecCode

exports.ReflexHelpers = ReflexHelpers

exports.import = function Import(target) {
    for (key in this) {
        if (this[key] != Import) {
            target[key] = this[key]
        }
    }
}
