var Gpio = require('onoff').Gpio,
  led = new Gpio(21, 'out'),
  button = new Gpio(23, 'in', 'both');

setInterval(update, 1); 

function update() { 
	
	if(button.readSync()) { 
		led.writeSync((Date.now()%200<100) ? 1 : 0);
	} else { 
		led.writeSync(0); 
	}
	
	
}


