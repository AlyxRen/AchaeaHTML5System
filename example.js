/*/
 * 
 * Examples of the options in Achaean HTML5 client Reflex packages.
 * 
/*/
{
    "name": "examples",
    "enabled": true,
    "description": "Examples of how to design plans",
    "type": "group",
    "id": 1,
    "items": [{
        "type": "function",
        "name": "onGMCP",
        "enabled": true,
        "id": 2,
        "code": "console.log(args);",
        "actions": []
    }, {
        "type": "function",
        "name": "onLoad",
        "enabled": true,
        "id": 3,
        "code": "console.log(args);",
        "actions": []
    }, {
        "type": "group",
        "name": "Example folder 1",
        "enabled": true,
        "id": 4,
        "items": [{
            "type": "alias",
            "name": "Example Folder 1 Alias 1",
            "enabled": true,
            "id": 5,
            "matching": "begins",
            "whole_words": true,
            "case_sensitive": true,
            "prefix_suffix": true,
            "actions": [{
                "command": "ASD",
                "prefix_suffix": true
            }, {
                "command": "DSA",
                "prefix_suffix": true
            }],
            "text": "asd"
        }, {
            "type": "keybind",
            "name": "",
            "enabled": true,
            "id": 7,
            "actions": [{
                "command": "farsee Asraii"
            }, {
                "command": "walk to asraii"
            }],
            "key_alt": true,
            "key_ctrl": false,
            "key_shift": false,
            "key": 65
        }],
        "actions": []
    }, {
        "type": "trigger",
        "name": "runaway",
        "enabled": true,
        "id": 8,
        "matching": "regexp",
        "whole_words": true,
        "case_sensitive": true,
        "text": "You have run away.",
        "actions": [{
            "action": "script",
            "script": "console.log(args);"
        }, {
            "action": "notify",
            "notice": "Mrow",
            "notice_fg": "#ff0000",
            "notice_bg": "#000000"
        }, {
            "action": "highlight",
            "highlight": "match",
            "highlight_backref": "1",
            "highlight_fg": "#ffff00",
            "highlight_bg": "#000000"
        }, {
            "action": "rewrite",
            "rewrite": "match",
            "rewrite_backref": "1",
            "rewrite_text": "FRA",
            "rewrite_colors": false,
            "rewrite_fg": "#ffff00",
            "rewrite_bg": "#000000"
        }, {
            "action": "function",
            "fn": "onLoad"
        }]
    }]
}
