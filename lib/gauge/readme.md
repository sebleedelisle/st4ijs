Gauge module
============

Usage
-----

Require and setup oled and gauge...

    var Oled     = require('oled-js-pi');
    var Gauge    = require('./lib/gauge');
    
    var oled = new Oled({
        width  : 128,
        height : 64,
        address: 0x3c
    });
    
    var gauge = new Gauge(oled);
    
Update the gauge...

    gauge.update(percentValue);
    
Debugging
---------

You can enable debugging by passing `true` as the 2nd constructor argument...

    var gauge = new Gauge(oled, true);