var Gpio = require('pigpio').Gpio,
  buzzer = new Gpio(5, {mode: Gpio.OUTPUT}),

setInterval(update, 100);

function update() { 
	buzzer.pwmFrequency(Math.round((Math.random() * 440) + 120)); 
	buzzer.pwmWrite(128);

}



