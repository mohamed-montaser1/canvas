const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brush_color = document.querySelector(".controlls .field.color input");
const brush_size = document.querySelector(".controlls .field.size input");
const ereser = document.querySelector(".controlls .field.ereser input");
const clear = document.getElementById("clear");

let color = "#fff";
let size = 10;
let painting = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillRect(0, 0, canvas.width, canvas.height);
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", endPaint);
  canvas.addEventListener("mousemove", draw);
});
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mousemove", draw);

function startPaint() {
  painting = true;
}

brush_color.addEventListener("input", function (e) {
  color = this.value;
});

brush_size.addEventListener("input", function (e) {
  size = this.value;
});

ereser.addEventListener("input", function (e) {
  let checked = e.srcElement.checked;
  if (checked) {
    color = "#000000";
  }
});

function endPaint() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  ctx.lineWidth = size;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.lineTo(e.clientX, e.clientY);
  ctx.moveTo(e.clientX, e.clientY);
  ctx.stroke();
}

clear.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

download.onclick = function () {
  this.href = canvas.toDataURL();
};
