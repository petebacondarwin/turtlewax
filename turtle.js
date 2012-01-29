
/*
    Turtle
    ======
    
    Canvas implementation of turtle graphics found in Logo, at least in spirit, and
    reimagined for a Coffe Script world.

    Conventions
    -----------    
    - coordinate and distance units are expressed in pixels
    - angles are expressed in degrees (mecause most humans don't grok radians)
*/

(function() {
  var Turtle,
    __hasProp = Object.prototype.hasOwnProperty,
    __slice = Array.prototype.slice;

  if (typeof exports === "undefined" || exports === null) exports = this;

  console.log(this);

  console.log(exports);

  Turtle = (function() {

    function Turtle(tag, options) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      this.tag = tag;
      this.tag = document.getElementById(this.tag) || this.tag;
      this.canvas = this.tag.getContext("2d");
      this.currentState = {
        x: (_ref = options != null ? options.x : void 0) != null ? _ref : this.tag.width / 2,
        y: (_ref2 = options != null ? options.x : void 0) != null ? _ref2 : this.tag.height / 2,
        dir: (_ref3 = options != null ? options.dir : void 0) != null ? _ref3 : -90,
        penDown: (_ref4 = options != null ? options.penDown : void 0) != null ? _ref4 : true,
        origin: {
          x: (_ref5 = options != null ? (_ref6 = options.origin) != null ? _ref6.x : void 0 : void 0) != null ? _ref5 : 0,
          y: (_ref7 = options != null ? (_ref8 = options.origin) != null ? _ref8.y : void 0 : void 0) != null ? _ref7 : 0
        }
      };
      this.previousStates = [];
      this.canvas.strokeStyle = "#000";
      this.canvas.lineWidth = 5;
      this.canvas.lineCap = "round";
      this.canvas.lineJoin = "round";
      this.canvas.moveTo(this.currentState.x, this.currentState.y);
    }

    Turtle.prototype.penDown = function(size, style) {
      if (size != null) this.canvas.lineWidth = size;
      if (style != null) this.canvas.strokeStyle = style;
      this.canvas.beginPath();
      this.canvas.moveTo(this.currentState.x, this.currentState.y);
      return this.currentState.penDown = true;
    };

    Turtle.prototype.penUp = function() {
      this.canvas.stroke();
      return this.currentState.penDown = false;
    };

    Turtle.prototype.pushCurrent = function() {
      return this.previousStates.push(this.currentState);
    };

    Turtle.prototype.popCurrent = function() {
      this.currentState = this.previousStates.pop();
      return this.moveRelative();
    };

    Turtle.prototype.forward = function(dist) {
      var a;
      a = Math.PI / 180.0 * this.currentState.dir;
      return this.moveRelative(dist * Math.cos(a), dist * Math.sin(a));
    };

    Turtle.prototype.backward = function(dist) {
      return this.forward(-dist);
    };

    Turtle.prototype.left = function(deg) {
      return this.turn(-deg);
    };

    Turtle.prototype.right = function(deg) {
      return this.turn(deg);
    };

    Turtle.prototype.turn = function(deg) {
      return this.currentState.dir = (this.currentState.dir + deg) % 360;
    };

    Turtle.prototype.moveRelative = function(x, y) {
      if (x == null) x = 0;
      if (y == null) y = 0;
      return moveAbsolute(this.currentState.x + x, this.currentState.y + y);
    };

    Turtle.prototype.moveAbsolute = function(x, y) {
      this.currentState.x = x;
      this.currentState.y = y;
      if (this.currentState.penDown) {
        return this.canvas.lineTo(this.currentState.x, this.currentState.y);
      } else {
        return this.canvas.moveTo(this.currentState.x, this.currentState.y);
      }
    };

    Turtle.prototype.north = function(r) {
      return this.moveRelative(this.x, this.y - r);
    };

    Turtle.prototype.south = function(r) {
      return this.moveRelative(this.x, this.y + r);
    };

    Turtle.prototype.west = function(r) {
      return this.moveRelative(this.x - r, this.y);
    };

    Turtle.prototype.east = function(r) {
      return this.moveRelative(this.x + r, this.y);
    };

    Turtle.prototype.jumpRelative = function(x, y) {
      this.penUp();
      this.moveRelative(this.x, this.y);
      return this.penDown();
    };

    Turtle.prototype.jumpAbsolute = function(x, y) {
      this.penUp();
      this.moveAbsolute(this.x, this.y);
      return this.penDown();
    };

    Turtle.prototype.movePolar = function(r, angle) {
      var dir;
      dir = this.currentState.dir;
      this.turn(angle);
      this.forward(r);
      return this.currentState.dir = dir;
    };

    Turtle.prototype.setOrigin = function(ox, oy) {
      if (ox == null) ox = this.currentState.x;
      if (oy == null) oy = this.currentStae.y;
      this.currentState.origin.x = ox;
      return this.currentState.origin.y = oy;
    };

    Turtle.prototype.text = function(str, font) {
      if (font != null) this.canvas.font = font;
      return this.canvas.fillText(str, this.x, this.y);
    };

    return Turtle;

  })();

  exports.Turtle = Turtle;

  exports.drawOn = function(canvasElement, program) {
    var key, turtle, value, _ref;
    turtle = new Turtle(canvasElement);
    _ref = Turtle.prototype;
    for (key in _ref) {
      if (!__hasProp.call(_ref, key)) continue;
      value = _ref[key];
      if (typeof value === "function") {
        (function(key) {
          return this[key] = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return turtle[key].apply(turtle, args);
          };
        })(key);
      }
    }
    penDown();
    program();
    return penUp();
  };

}).call(this);
