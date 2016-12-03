/**
 * Expose `createGauge()`.
 */

function Gauge(oled, debug) {
    this.oled    = oled;
    this.width   = oled.WIDTH -2;
    this.height  = oled.HEIGHT -2;
    this.armLength = Math.min(this.width, this.height);
    this.centreX = Math.round(this.width / 2) + 1;
    this.centreY = this.height + 1;
    this.lastX   = null;
    this.lastY   = null;
    this.debug   = !!debug;
}

/**
 * Updates the gauge's indicator
 *
 * @param value Float (0 - 100)
 */
Gauge.prototype.update = function (value) {
    var angle       = 180 * (value / 100);
    var angleInRads = angle * (Math.PI / 180);
    var x           = Math.min(Math.round(this.centreX - Math.cos(angleInRads) * this.armLength), this.width - 1);
    var y           = Math.round(this.centreY - Math.sin(angleInRads) * this.armLength);

    if (this.debug) {
        console.log(
            this.centreX,
            this.centreY,
            String('0000' + value).slice(-4),
            String(angle + '     ').slice(0, 5),
            String(angleInRads + '     ').slice(0, 5),
            String(x + '     ').slice(0, 5),
            String(y + '     ').slice(0, 5)
        );
    }

    // Clear the last line
    if (this.lastX && this.lastY) {
        console.log('Clearing last line');
        console.log([this.centreX, this.centreY, this.lastX, this.lastY]);

        this.oled.drawLine(this.centreX, Math.min(127, this.centreY), this.lastX, Math.max(0, this.lastY), 0, false);
    }

    // Draw the new line
    this.oled.drawLine(this.centreX, this.centreY, x, y, 1, true);

    this.lastX = x;
    this.lastY = y;
};

module.exports = Gauge;