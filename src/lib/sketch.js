export default function sketch(p) {
  let cols, rows;
  let w = 20;
  var grid = [];
  let playerX = 0;
  let playerY = 0;
  let player;

  class Room {
    constructor(i,j) {
      this.x = i;
      this.y = j;
      this.walls = [true, true, true, true]
      this.description = "room description"
      this.players = [Player]
      this.items = []
    }
    show () {
      let x = this.x * w;
      let y = this.y * w;
      p.stroke(255);
      if (this.walls[0]) {
        p.line(x, y, x + w, y);
        p.stroke(255, 0, 0);
        p.line(x, y, x + w/6, y);
        p.line(x + (5*w)/6, y, x + w, y);
        // top
      }
      if (this.walls[1]) {
        p.line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        p.stroke(255)
        p.line(x + w, y + w, x, y + w); //  bot
      }
      if (this.walls[3]) {
        p.stroke(255)
        p.line(x, y + w, x, y); // left
        p.stroke(255, 0, 0);
        p.line(x, y+w, x, y + w - (w/6));
        p.line(x, y+w - (w*5/6), x, y);
      }
    }
  }
  class Player {
    constructor(x,y,name) {
      this.x = x;
      this.y = y;
      this.currentRoom = "room_name";
      this.name = name;
    }
    show () {
      p.fill(255, 205, 0);
      p.noStroke()
      p.rectMode(p.CENTER)
      p.rect(this.x + w/2,this.y + w/2, w/2, w/2, 100)
      }
    move () {
      this.x = playerX;
      this.y = playerY;
    }
  }
  
  p.preload = function() {
    p.angleMode(p.DEGREES)
  }
p.setup = function () {
  p.createCanvas(200, 200);
  cols = p.floor(p.width / w);
  rows = p.floor(p.height / w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Room(i, j);
      grid.push(cell);
    }
  }

  player = new Player(0,0, "Ike");
  playerY = p.height - w
};

p.draw = function() {
  p.background(0);
  p.strokeWeight(2)
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  player.show()
  player.move()
}

 p.keyPressed= function() {
  if (p.keyCode === p.LEFT_ARROW && playerX > 0) {
    playerX -= w
  } else if (p.keyCode === p.RIGHT_ARROW && playerX + w < p.width) {
    playerX += w
  } else if (p.keyCode === p.UP_ARROW && playerY  > 0) {
    playerY -= w
  } else if (p.keyCode === p.DOWN_ARROW && playerY + w < p.height) {
    playerY += w
  }
  return false;
}
}