drawOn "mycanvas", ()->
  penDown(2, "#00F")
  for [1..4]
    forward(10)
    right(90)

drawOn "mycanvas", ()->
  pushCurrent()
  penUp()
  forward(50)
  penDown()
  for [1..8]
    forward(20)
    right(45)
  
  popCurrent()
  for i in [1..100]
    forward(i)
    right(10)