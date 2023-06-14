const canvas = document.getElementById("can");
const dropdown = document.getElementById("dropdown");
const context = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}

const big_monster_image = new Image();
big_monster_image.src = "./assets/big_monster_idle.png";

let activeCode = "particles";
let lastTime = 0;

const particleWorker = new Worker("particles/worker.js");
const particlesInstances = [];
const monster = new Monster(canvas.width, canvas.height, big_monster_image);;


dropdown.addEventListener("change", function () {
  activeCode = dropdown.value;
  switchCode();
});

function handleMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  particleWorker.postMessage({ mouse, message: "intiParticle" });
}

function switchToParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  dropdown.value = "particles";

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
  dropdown.value = "effects";
  this.effect = new Effects(context, canvas.width, canvas.height);
  this.effect.wrapText("Fantastic!");

  removeEvents();

  animate();
}

function switchToMonster() {
  dropdown.value = "monster";
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  removeEvents();

  monster.draw(context);
  animate(lastTime);

}

function switchCode() {
  if (activeCode == "particles") {
    switchToParticles();
  } else if (activeCode == "effects") {
    switchToEffects();
  } else if (activeCode == "monster") {
    switchToMonster();
  }
}

function removeEvents() {
  canvas.removeEventListener("mousemove", handleMouseMove);
  particleWorker.removeEventListener("message", handleWorkerMessage);
}

function animate(timeStamp) {
  if (activeCode == "particles") {
    particleWorker.postMessage({ message: "handleParticlesUpdate" });
  } else if (activeCode == "effects") {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.effect.render();
  } else if (activeCode == "monster") {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    monster.update(deltaTime);
    monster.draw(context)

  }
  requestAnimationFrame(animate);
}

// Call the appropriate function based on the initial active code
switchCode();
