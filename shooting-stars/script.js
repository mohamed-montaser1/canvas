const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let hue = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 10;
    this.speed = Math.random() * 7 + 3;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x -= this.speed;
    this.y += this.speed;
  }
  draw() {
    ctx.fillStyle = this.color;
    // ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.size, this.size);
    // ctx.fill();
  }
}
let elArray = [];
function createNewStar() {
  elArray.push(new Star(Math.random() * canvas.width, 0));
}
window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (window.innerWidth < 900) {
    elArray = [];
    console.log(canvas.width, Math.random() * canvas.height)
    elArray.push(new Star(canvas.width, canvas.he));
  }
};
function animate() {
  createNewStar();
  for (let i = 0; i < elArray.length; i++) {
    elArray[i].update();
    elArray[i].draw();
  }
  ctx.fillStyle = "rgba(0,0,0,0.123456)";
  hue++;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}
animate();
