(function () {
  if (typeof Matrix === "undefined") {
    window.Matrix = {};
  }

  var Code = Matrix.Code = function (centerX, centerY, message, ptFont, ySpeed) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.message = message;
    this.ptFont = ptFont;
    this.ySpeed = ySpeed;
  };


  Code.randomBit = function (maxX, maxY) {
    return new Code(
      maxX * Math.random(),
      -20,
      Math.floor(Math.random() * 2) === 1 ? "1" : "0",
      Math.floor(maxY / 40),
      Math.random() * 5
    );
  };

  Code.jsMessage = function (maxX, maxY, message, order) {
    return new Code(
      Math.floor(maxX / 3) * Math.random(),
      -40 * order,
      message,
      Math.floor(maxY / 20),
      maxY / 800
    );
  };

  Code.prototype.moveMessage = function (maxX, maxY) {
    this.centerY += this.ySpeed
    if (this.centerY > maxY) { 
      this.centerY = Math.random() * -15;
      if (this.message.length > 1) { 
        this.centerX = Math.floor(maxX / 2) * Math.random()
      } else {
        this.centerX = maxX * Math.random();
      }
    }
  };

  Code.prototype.render = function (ctx) {
    ctx.fillStyle = "green";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 50;
    ctx.font = this.ptFont + "px Miltown";
    ctx.fillText(this.message, this.centerX, this.centerY);

    ctx.fill();
  };
})();