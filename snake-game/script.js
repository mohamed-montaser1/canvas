// =============================== Constants ===============================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// =============================== Canvas Width / Height ===============================
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// =============================== Generate Snake Class ===============================
class Snake {
  constructor(dir) {
    if (dir === undefined) {
      this.dir = "right";
    }
    // Initial X/Y Value
    this.x = 370;
    this.y = 320;
    this.length = [];
    // Snake Size
    this.blockSize = 14;
    switch (dir) {
      case "right":
        this.speedX = 3;
        this.speedY = 0;
        break;
      case "left":
        this.speedX = 3;
        this.speedY = 0;
        break;
      case "top":
        this.speedX = 0;
        this.speedY = 3;
        break;
      case "bottom":
        this.speedX = 0;
        this.speedY = 3;
        break;
      default:
        this.speedX = 3;
        this.speedY = 0;
        break;
    }
  }
  updateLength(el) {
    this.length.push(el);
  }
  setSpeed(speed) {
    this.speedX += speed;
    this.speedY += speed;
  }
  updateSize() {
    this.blockSize += 5;
  }
  updateDir(dir) {
    this.dir = dir;
    switch (dir) {
      case "right":
        this.speedX = 3;
        this.speedY = 0;
        break;
      case "left":
        this.speedX = 3;
        this.speedY = 0;
        break;
      case "top":
        this.speedX = 0;
        this.speedY = 3;
        break;
      case "bottom":
        this.speedX = 0;
        this.speedY = 3;
        break;
      default:
        this.speedX = 3;
        this.speedY = 0;
        break;
    }
  }
  update() {
    switch (this.dir) {
      case "top":
        this.y -= this.speedY;
        if (this.y === 2) {
          this.updateDir("bottom");
        }
        break;
      case "bottom":
        this.y += this.speedY;
        if (this.y === canvas.height) {
          this.updateDir("top");
        }
        break;
      case "right":
        this.x += this.speedX;
        if (this.x === canvas.width - 3) {
          this.updateDir("left");
        }
        break;
      case "left":
        this.x -= this.speedX;
        if (this.x === 1) {
          this.updateDir("right");
          // console.log(true)
        }
        console.log(this.x);
        break;
    }
  }
  draw() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize);
  }
}

class Food {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.size = 14;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  generate() {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
  }
}

// =============================== Animation Frames ===============================
let food = new Food();

let snake = new Snake(undefined);
window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") {
    snake.updateDir("right");
  } else if (e.key == "ArrowLeft") {
    snake.updateDir("left");
  } else if (e.key == "ArrowUp") {
    snake.updateDir("top");
  } else if (e.key == "ArrowDown") {
    snake.updateDir("bottom");
  }
});

function animation() {
  snake.update();
  snake.draw();
  food.draw();

  let score = snake.length.length;
  if (
    snake.x + snake.blockSize >= food.x &&
    snake.x <= food.x + food.size &&
    snake.y + snake.blockSize >= food.y &&
    snake.y <= food.y + food.size
  ) {
    food.generate();
    snake.updateLength(1);
    if (snake.blockSize < 40) {
      snake.updateSize();
    }
    if (score % 10 == 0) {
      snake.setSpeed(2);
    }
  }
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px system-ui";
  ctx.fillStyle = "white";
  ctx.fillText(`score: ${score}`, canvas.width - 300, 50);
  requestAnimationFrame(animation);
}
animation();
