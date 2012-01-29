(function() {
  var i, t;

  t = new Turtle("mycanvas");

  t.arc = function(from, to, distance, res) {
    var i, _i, _len, _ref, _step;
    if (res == null) res = 1;
    _ref = [from, to];
    for (_i = 0, _len = _ref.length, _step = res; _i < _len; _i += _step) {
      i = _ref[_i];
      this.polar(distance, i);
    }
    return this;
  };

  t.foot = function(angle, body, length, width) {
    this.polar(length, angle);
    this.arc(angle, angle + width, length, 1);
    return this.polar(body, angle + width);
  };

  t.turtle = function(s) {
    var b, f;
    b = s * .6;
    f = s * .8;
    this.origin();
    this.penup();
    this.polar(b, -20);
    this.begin();
    this.pendown();
    this.foot(-20, b, s, 40);
    this.arc(20, 50, b);
    this.foot(50, b, f, 40);
    this.arc(90, 120, b);
    this.foot(120, b, f, 40);
    this.arc(160, 170, b);
    this.polar(s, 180);
    this.polar(b, 190);
    this.arc(190, 200, b);
    this.foot(200, b, f, 40);
    this.arc(240, 270, b);
    this.foot(270, b, f, 40);
    this.arc(310, 340, b);
    this.close();
    this.penup();
    this.polar(s * .4, 0);
    this.pendown();
    this.arc(0, 360, s * .4);
    this.close();
    return this.draw();
  };

  t.goto(200, 200);

  t.fillstyle("#fff");

  for (i = 1; i < 120; i++) {
    t.pensize(1 + (i / 10));
    t.penstyle(hsvtorgb(i * 4 - 90, 1, 1));
    t.turtle(i * 4);
    t.penup();
    t.turn(50);
    t.forward(i * i / 2 + 10);
  }

}).call(this);
