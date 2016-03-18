var socket = require('socket.io/node_modules/socket.io-client')('http://node.seb.ly:8102');
var oled = require('oled-js-pi');
var font = require('oled-font-5x7');

var room = process.argv[2] || 'defaultroom';
var opts = {
  width: 128,
  height: 64,
  address: 0x3c
};

var oled = new oled(opts);

showMessage('connecting...'); 
	
socket.on('connect', function(){
	socket.emit('joinroom', {value:room}); 
	showMessage('join room '+room); 
});
socket.on('message', function(data){
	console.log('message', data.value);
	showMessage(data.value); 

});

socket.on('disconnect', function(){
	
});

function showMessage(message) { 
	oled.clearDisplay(false); 
	oled.setCursor(1, 1);
	oled.writeString(font, 1, message, 1, true);
	oled.update();
}


// If ctrl+c is hit, free resources and exit.
process.on('SIGINT', function() {
	lcd.clear();
	lcd.close();
	process.exit();
});
