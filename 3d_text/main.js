const canvas = document.getElementById("can");
const context = canvas.getContext("2d", {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = context.createLinearGradient(0, 0, 0,  canvas.height);
gradient.addColorStop(0.2, '#A46225');
gradient.addColorStop(0.5, '#F8E218');
gradient.addColorStop(0.7, '#E39D37');

const fontSize = 100;
context.font = 'bold 50px Kalam, cursive';
context.fillStyle = gradient;

const text = 'Fantastic!';
const depth = 5;
const initialX = 50;
const spacing = 0.3;

  
function drawText() {
    let x = initialX;
  
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const letterWidth = context.measureText(letter).width;
      context.fillText(letter, x, 250);
      x += letterWidth + spacing;
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawText();
    requestAnimationFrame(animate)
}

animate();