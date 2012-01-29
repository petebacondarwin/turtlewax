t = new Turtle("mycanvas")

# quickie arc drawing function
t.arc = (from, to, distance, res=1) ->
  for i in [from,to] by res
    @polar(distance, i)
  @
  
# make a foot (or a head)
t.foot = (angle, body, length, width) ->
  @polar(length, angle)
  @arc(angle, angle + width, length, 1)
  @polar(body, angle + width)

# draw a turtle
t.turtle = (s)->
  b = s * .6;
  f = s * .8;

  @origin()
  @penup()
  @polar(b, -20)
  @begin()
  @pendown()
  @foot(-20, b, s, 40)
  @arc(20, 50, b)
  @foot(50, b, f, 40)
  @arc(90, 120, b)
  @foot(120, b, f, 40)
  @arc(160, 170, b)
  @polar(s, 180)
  @polar(b, 190)
  @arc(190, 200, b)
  @foot(200, b, f, 40)
  @arc(240, 270, b)
  @foot(270, b, f, 40)
  @arc(310, 340, b)
  @close()
  @penup()
  @polar(s * .4, 0)
  @pendown()
  @arc(0, 360, s * .4)
  @close()
  @draw()


# start our drawing
t.goto(200, 200)
t.fillstyle("#fff");

# it's turtles all the way down (or up, in this case)
for i in [1...120]
  t.pensize(1 + (i / 10))
  t.penstyle(hsvtorgb(i * 4 - 90, 1, 1))

  t.turtle(i * 4)

  t.penup()
  t.turn(50)
  t.forward(i*i/2 + 10)
    