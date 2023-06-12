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

function calculateLetterSpacing(text, targetWidth, spacingFactor) {
    const totalSpacing = targetWidth * (spacingFactor - 1);
    const totalLetterWidth = context.measureText(text).width;
    const letterSpacing = (totalSpacing - totalLetterWidth) / (text.length - 1);
    return letterSpacing;
  }
  
function drawText() {
    let x = initialX;
  
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const letterWidth = context.measureText(letter).width;
      context.fillText(letter, x, 250);
      x += letterWidth + spacing;
    }
}

// const fontSize = 100;
// context.font = `bold ${fontSize}px Arial`;
// context.fillStyle = gradient;

// const text = 'Ashish';
// const depth = 5;
// const initialX = 50;
// const spacing = 30; // Adjust the spacing value as needed
// const perspective = 1000; // Adjust the perspective value as needed

// function drawText() {
//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const totalWidth = calculateTotalWidth();
//   const scaleRatio = calculateScaleRatio(totalWidth);

//   for (let i = 0; i < text.length; i++) {
//     const letter = text[i];
//     const letterWidth = context.measureText(letter).width;
//     const x = initialX + i * (letterWidth + spacing);
//     const z = (x - centerX) / totalWidth * depth;
//     const scale = 1 / (1 + z / perspective) * scaleRatio;
//     const translateY = centerY - fontSize * scale / 2;

//     context.save();
//     context.translate(x, translateY);
//     context.scale(scale, scale);
//     context.fillText(letter, 0, 0);
//     context.restore();
//   }
// }

// function calculateTotalWidth() {
//   let totalWidth = 0;
//   for (let i = 0; i < text.length; i++) {
//     const letter = text[i];
//     const letterWidth = context.measureText(letter).width;
//     totalWidth += letterWidth;
//   }
//   totalWidth += (text.length - 1) * spacing;
//   return totalWidth;
// }

// function calculateScaleRatio(totalWidth) {
//   const targetWidth = canvas.width - 2 * initialX - (text.length - 1) * spacing;
//   return targetWidth / totalWidth;
// }

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawText();
    requestAnimationFrame(animate)
}

animate();