const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let circleArray = [];
let hue = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = Math.random() * 12 + 1;
    this.height = Math.random() * 10 + 1;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 10 - 4;
    this.speedY = Math.random() * 6 - 4;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillRect(this.x, this.y, this.size, this.size);
    // ctx.fill();
  }
}

canvas.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 10; i++) {
    circleArray.push(new Circle(e.x, e.y));
  }
});

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
    circleArray[i].draw();
    if (circleArray[i].size <= 0.3) {
      circleArray.splice(i, 1);
      i--;
    }
  }
  hue++;
  ctx.fillStyle = "rgba(0,0,0,0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animation);
}
animation();
