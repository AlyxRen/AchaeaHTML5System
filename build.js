var fs = require('fs')
require('./reflexGroup.js').import(global)

var id = 0;

//Make the actual Reflex Package
var system = new ReflexPackage(++id, 'rixius html5 system', 'Manage Defences and Curing', true)

//Core Functions
;function coreFunctions(system) {
    console.log(system)
    var onGMCP = new Code(++id, 'onGMCP', ReflexHelpers.codeCompile(
        'switch (args.gmcp_method) {',
            'case "Char.Vitals":',
                'console.log(args)',
                'client.rixsystem.balances.bal = !!+args.gmcp_args.bal',
                'client.rixsystem.balances.eq = !!+args.gmcp_args.eq',
                'break',
        '}'
    ), true)

    var onLoad = new Code(++id, 'onLoad', ReflexHelpers.codeCompile(
        'if (!client.rixsystem) {',
            'client.rixsystem = {',
                'queue: {',
                    'do: [],',
                    'herb: [],',
                    'apply: [],',
                    'sip: [],',
                    'lastdo: null,',
                    'lastherb: null,',
                    'lastapply: null,',
                    'lastsip: null',
                '},'
                'balances: {',
                    'bal: true,',
                    'eq: true,',
                    'herb: true,',
                    'apply: true,',
                    'sip: true',
                '}',
            '}',
        '}'
    ), true)

    var onBlock = new Code(++id, 'onBlock', ReflexHelpers.codeCompile(
        'var rixsystem = client.rixsystem',
        //Check for herbqueue
        'if (rixsystem.balances.herb && rixsystem.queue.herb.length > 0) nextHerb()',
        //Check for sipqueue
        'if (rixsystem.balances.sip && rixsystem.queue.sip.length > 0) nextSip()',
        //Check for applyqueue
        'if (rixsystem.balances.apply && rixsystem.queue.apply.length > 0) nextApply()',
        //check for doqueue
        'if (rixsystem.balances.bal && rixsystem.balances.eq && rixsystem.queue.do.length > 0) nextDo()',
    ), true)

    system
    .add(onGMCP)
    .add(onLoad)
    .add(onBlock)
}(system)

;function QueueTriggers(system) {
    var queue = new Group(++id, 'Queueing', true)
    var nextHerb = new Code(++id, 'nextHerb', ReflexHelpers.codeCompile(
        'var rixsystem = client.rixsystem',
        //Send OUTR and EAT for the next herb in the queue.
        'if (rixsystem.balances.herb',
        '&&  rixsystem.queue.herb.length > 0',
        '&&  rixsystem.balances.do) {',
        '}'
    ), true)
    var herbBalanceRecovery = new Trigger(++id, 'Herb Balance Recovery',
        '^You may eat another plant or mineral.$',
        ReflexHelpers.Matching.regex, true, true, true)
    herbBalanceRecovery.act(new ExecCode(ReflexHelpers.codeCompile(
        'client.rixsystem.balances.herb = true',
        'nextHerb'
    ))

    //Check for Herb Balance
    //var herbBalance = new Reflex(++id)

    queue
    .add(nextHerb)

    system
    .add(queue)
}(system)

//Groups under the Base Package
var config = new Group(++id, 'Configuration Options', true)
var misc = new Group(++id, 'Misc Helpers', true)


system
.add(config)
.add(misc)

var getgold = new Alias(++id, 'Get Gold', 'gg', ReflexHelpers.Matching.begins, true, true, true)
getgold
.act(new Command('get pouch from pack', false))
.act(new Command('get @suffix gold from pouch', false))
.act(new Command('put pouch in pack', false))
var putgold = new Alias(++id, 'Put Gold', 'pg', ReflexHelpers.Matching.begins, true, true, true)
putgold
.act(new Command('get pouch from pack', false))
.act(new Command('put @suffix gold in pouch', false))
.act(new Command('put pouch in pack', false))

misc.add(getgold)
misc.add(putgold)

console.log(system)
fs.writeFile('./system.js', JSON.stringify(system), function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('system written')
    }
})
