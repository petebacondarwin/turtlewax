###
    Turtle
    ======
    
    Canvas implementation of turtle graphics found in Logo, at least in spirit, and
    reimagined for a Coffe Script world.

    Conventions
    -----------    
    - coordinate and distance units are expressed in pixels
    - angles are expressed in degrees (mecause most humans don't grok radians)    
###

exports ?= this
console.log this
console.log exports

class Turtle
  constructor: (@tag, options)->
    @tag = document.getElementById(@tag) || @tag
    @canvas = @tag.getContext("2d")

    @currentState =
      x: options?.x ? @tag.width / 2
      y: options?.x ? @tag.height / 2
      dir: options?.dir ? -90
      penDown: options?.penDown ? true;
      origin:
        x: options?.origin?.x ? 0
        y: options?.origin?.y ? 0
    @previousStates = []

    # Initialize the canvas
    @canvas.strokeStyle = "#000"
    @canvas.lineWidth = 5
    @canvas.lineCap = "round"
    @canvas.lineJoin = "round"
    @canvas.moveTo(@currentState.x, @currentState.y)

  # Pen properties  
  penDown: (size, style)->
    @canvas.lineWidth = size if size?
    @canvas.strokeStyle = style if style?
    @canvas.beginPath()
    @canvas.moveTo(@currentState.x, @currentState.y)
    @currentState.penDown = true

  penUp: ()->
    @canvas.stroke()
    @currentState.penDown = false
  
  # Memory
  pushCurrent: ()->
    @previousStates.push(@currentState)

  popCurrent: ()->
    @currentState = @previousStates.pop()
    @moveRelative()      

  # Movement
  forward: (dist)->
    a = Math.PI / 180.0 * @currentState.dir
    @moveRelative(dist * Math.cos(a), dist * Math.sin(a))
  
  backward: (dist)->
    @forward(-dist)

  left: (deg)->
    @turn(-deg)

  right: (deg)->
    @turn(deg)
    
  turn: (deg)->
    @currentState.dir = (@currentState.dir + deg)%360

  moveRelative: (x=0,y=0)->
    moveAbsolute(@currentState.x+x, @currentState.y+y)  

  moveAbsolute: (x, y)->
    @currentState.x = x
    @currentState.y = y
    if @currentState.penDown
        @canvas.lineTo(@currentState.x, @currentState.y)
    else
        @canvas.moveTo(@currentState.x, @currentState.y)
  
  north: (r)->
    @moveRelative(@x, @y - r)
  
  south: (r)->
    @moveRelative(@x, @y + r)
  
  west: (r)->
    @moveRelative(@x - r, @y)

  east: (r)->
    @moveRelative(@x + r, @y)

  # Jumping  
  jumpRelative: (x, y)->
    @penUp()
    @moveRelative(@x, @y)
    @penDown()
  
  jumpAbsolute: (x, y)->
    @penUp()
    @moveAbsolute(@x, @y)
    @penDown()

  # Polar movement
  movePolar: (r, angle)->
    # Store previous direction
    dir = @currentState.dir
    @turn(angle)
    @forward(r)
    # Restore previous direction
    @currentState.dir = dir
  
  setOrigin: (ox = @currentState.x, oy=@currentStae.y)->
    @currentState.origin.x = ox
    @currentState.origin.y = oy

  # Text  
  text: (str, font)->
    @canvas.font = font if font?
    @canvas.fillText(str, @x, @y)
  
exports.Turtle = Turtle
exports.drawOn = (canvasElement, program)->
  turtle = new Turtle(canvasElement)
  for own key, value of Turtle.prototype when typeof(value) is "function"
    do(key) ->
      this[key] = (args...)->
        turtle[key](args...)
  penDown()
  program()
  penUp()

