const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let elArray = [];
let hue = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
class Bullet {
  constructor(dir) {
    if (dir === "left") {
      this.x = canvas.width;
      this.y = Math.random() * canvas.height;
    } else if (dir === "right") {
      this.x = 0;
      this.y = Math.random() * canvas.height;
    } else if (dir === "top") {
      this.x = Math.random() * canvas.width;
      this.y = 0;
    } else if (dir === "bottom") {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
    }
    this.speedX = 7;
    this.size = Math.random() * 20 + 5;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.dir = dir;
  }
  update() {
    if (this.dir === "left") {
      this.x -= this.speedX;
    } else if (this.dir === "right") {
      this.x += this.speedX;
    } else if (this.dir === "top") {
      this.y += this.speedX;
    } else if (this.dir === "bottom") {
      this.y -= this.speedX;
    }
    if (this.x < 0) this.delete();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.stroke();
  }
  delete() {
    this.size = 0;
  }
}

canvas.onclick = function () {
  elArray.push(
    new Bullet(
      ["left", "right", "top", "bottom"][Math.floor(Math.random() * 4)]
    )
  );
};
window.addEventListener("keyup", function (e) {
  if (e.key === "ArrowLeft") {
    elArray.push(new Bullet("left"));
  } else if (e.key === "ArrowRight") {
    elArray.push(new Bullet("right"));
  } else if (e.key === "ArrowUp") {
    elArray.push(new Bullet("bottom"));
  } else if (e.key === "ArrowDown") {
    elArray.push(new Bullet("top"));
  }
});
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i in elArray) {
    elArray[i].update();
    elArray[i].draw();
  }
  hue++;
  requestAnimationFrame(animation);
}

animation();
