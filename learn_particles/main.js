const canvas = document.getElementById("can");
const context = canvas.getContext("2d", {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = context.createLinearGradient(0, 0, canvas.width,  canvas.height);
gradient.addColorStop(0.3, '#F8E218');
gradient.addColorStop(0.5, '#F8E218');
gradient.addColorStop(0.7, '#E39D37');

window.addEventListener('resize', () => {
    canvas.width = window.width;
    canvas.height = window.height;
});

context.fillStyle = gradient;
// context.font = `bold 50px Kalam, cursive`;
// context.fillText("Fantastic!", 50, 100);

const kalamFont = new FontFace('Kalam', 'url(./fonts/Kalam/Kalam-Bold.ttf)');
kalamFont.load().then(() => {
  document.fonts.add(kalamFont);
  context.font = 'bold 50px Kalam, cursive';
  
  context.fillText("Fantastic!", 50, 100);

  context.fillText("Fantastic!", 53, 101);
  context.fillText("Fantastic!", 56, 102);
});
