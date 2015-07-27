(function () {
  if (typeof Matrix === "undefined") {
    window.Matrix = {};
  }

  var World = Matrix.World = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.messages = [];
    for (var i = 0; i < Math.floor(World.NUM_BYTES / 8); ++i) {
      this.messages.push(
        Matrix.Code.randomBit(xDim, yDim)
      );
    }
    this.messages.push(
      Matrix.Code.jsMessage(xDim, yDim, "I <3 JAVASCRIPT NOW", 1)
      );
    this.messages.push(
      Matrix.Code.jsMessage(xDim, yDim, "PLEASE DON'T TELL RUBY", 7)
      );
  };

  World.NUM_BYTES = 1000;

  World.prototype.render = function (ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.xDim, this.yDim);
    this.messages.forEach(function (message) {
      message.render(ctx);
    });
  };

  World.prototype.dropMessages = function () {
    var world = this;
    this.messages.forEach(function (message) {
      message.moveMessage(world.xDim, world.yDim);
    });
  };

  World.prototype.enterTheMatrix = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    window.setInterval((function () {
      this.dropMessages();
      this.render(ctx);
    }).bind(this), 1000 / 60);
  };
})();