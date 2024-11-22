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

/*************Using TensorFlaw.js************ */
let model;

// Load the pre-trained model
async function loadModel() {
  model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/savedmodel/quickdraw/model.json');
  console.log('Model Loaded!');
}

loadModel();

 /****************/
async function predictDrawing() {
    if (!model) return;
  
    // Preprocess the canvas image
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const tensor = tf.browser.fromPixels(imgData, 1) //Converts the canvas image into a TensorFlow tensor
      .resizeNearestNeighbor([28, 28])
      .toFloat()
      .expandDims(0);
  
    // Predict the drawing
    const prediction = model.predict(tensor); //Passes the preprocessed tensor to the loaded machine learning model for prediction
    const topGuess = prediction.argMax(-1).dataSync()[0]; //Finds the index of the highest probability (the most likely class) and concvert to a regular JavaScript array
    guessOutput.textContent = `Guess: ${getLabel(topGuess)}`;
  }
  
  function getLabel(index) {
    const labels = ['circle', 'square', 'triangle', 'etc.']; //The labels of the classes
    return labels[index] || 'Unknown';
  }
  
  setInterval(predictDrawing, 2000); //call the function every 2 sec
