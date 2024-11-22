const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const guessOutput = document.getElementById('guessOutput');

canvas.width = 500;
canvas.height = 500;

let drawing = false;

// Start Drawing
canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => (drawing = false));
canvas.addEventListener('mousemove', draw);

// Clear Canvas
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  guessOutput.textContent = '...';
});

// Draw on Canvas
function draw(event) {
  if (!drawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
