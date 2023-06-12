importScripts('particle.js');

const particleInstancesList = [];

self.onmessage = function (event) {
  const { mouse, message } = event.data;

  if (message == "intiParticle") {
    initParticle(mouse);
  }

  if (message == "handleParticlesUpdate") {
    handleParticlesUpdate();
  }
};

function initParticle(mouse) {
  // for (let i = 0; i < 10; i++) {
  //   particleInstancesList.push(new Particle(mouse));
  // }
  particleInstancesList.push(new Particle(mouse));
}

function handleParticlesUpdate() {
  for (let i = 0; i < particleInstancesList.length; i++) {
    const particleData = particleInstancesList[i];
    particleData.update();
    self.postMessage({ particles: particleInstancesList});
    if (particleData.size <= 0.3) {
      particleInstancesList.splice(i, 1);
      i--;
    }
  }
}