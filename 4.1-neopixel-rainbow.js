var ws281x = require('rpi-ws281x-native');
var Colour = require('color'); 


var NUM_LEDS = parseInt(process.argv[2], 10) || 10,
	pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
	ws281x.reset();
	process.nextTick(function () { process.exit(0); });
});


// ---- animation-loop
var offset = 0;
setInterval(function () {
	for (var i = 0; i < NUM_LEDS; i++) {
		var colour = Colour().hsl((offset + (i*10))%360, 100, 80).rgb(); 
		pixelData[i] = rgb2Int(colour)
	}
	offset+=5;
	ws281x.render(pixelData);
}, 1000 / 30);

console.log('Press <ctrl>+C to exit.');

function rgb2Int(col) {
	with (col) 
		return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
