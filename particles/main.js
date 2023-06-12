const canvas = document.getElementById("can");
const switchButton = document.getElementById("switch");
const context = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}

let isParticlesActive = true;
let isEffectsActive = false;

const particleWorker = new Worker("particles/worker.js");
const particlesInstances = [];


switchButton.addEventListener("click", function () {
  isParticlesActive = !isParticlesActive;
  isEffectsActive = !isEffectsActive;

  if (isParticlesActive) {
    // Switch to particles code
    switchToParticles();
  } else if (isEffectsActive) {
    // Switch to effects code
    switchToEffects();
  }
});

function handleMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  particleWorker.postMessage({ mouse, message: "intiParticle" });
}

function switchToParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  switchButton.innerText = "Switch to Effects";

  canvas.addEventListener("mousemove", handleMouseMove);
  particleWorker.postMessage({ message: "handleParticlesUpdate" });
  particleWorker.addEventListener("message", handleWorkerMessage);
  animate();
}

function handleWorkerMessage(event) {
  const { data } = event;
  const { particles } = data;

  context.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particleData) => {
    const particle = new Particle(mouse);
    particle.deserialize(particleData);
    particle.draw(context);
  });
}

function switchToEffects() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  switchButton.innerText = "Switch to Particles";
  this.effect = new Effects(context, canvas.width, canvas.height);
  this.effect.wrapText("Fantastic!");

  canvas.removeEventListener("mousemove", handleMouseMove);
  particleWorker.removeEventListener("message", handleWorkerMessage);

  animate();
}

function animate() {
  if (isParticlesActive) {
    particleWorker.postMessage({ message: "handleParticlesUpdate" });
  } else if (isEffectsActive) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.effect.render();
  }
  requestAnimationFrame(animate);
}

// Call the appropriate function based on the initial state
if (isParticlesActive) {
  switchToParticles();
} else if (isEffectsActive) {
  switchToEffects();
}
