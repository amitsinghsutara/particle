const canvas = document.getElementById("can");
const context = canvas.getContext("2d", {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const effect = new Effects(context, canvas.width, canvas.height);
effect.wrapText("Fantastic!");

effect.render();

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.render();
    requestAnimationFrame(animate);
}
animate();


