(function() {

  drawOn("mycanvas", function() {
    var _i, _results;
    penDown(2, "#00F");
    _results = [];
    for (_i = 1; _i <= 4; _i++) {
      forward(10);
      _results.push(right(90));
    }
    return _results;
  });

  drawOn("mycanvas", function() {
    var i, _i, _results;
    pushCurrent();
    penUp();
    forward(50);
    penDown();
    for (_i = 1; _i <= 8; _i++) {
      forward(20);
      right(45);
    }
    popCurrent();
    _results = [];
    for (i = 1; i <= 100; i++) {
      forward(i);
      _results.push(right(10));
    }
    return _results;
  });

}).call(this);
