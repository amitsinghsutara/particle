const canvas = document.getElementById("can");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener("resize", function() {

})

const particleWorker = new Worker('particles/worker.js');
const particlesInstances = [];

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  

});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  particleWorker.postMessage({ mouse, message: "intiParticle" });
})

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
  
particleWorker.onmessage = handleWorkerMessage;

function animate() {

  particleWorker.postMessage({message: "handleParticlesUpdate"});
  requestAnimationFrame(animate);

}

animate();



