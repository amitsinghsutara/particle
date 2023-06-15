class Monster {
    constructor(width, height, image, context) {
      this.width = width;
      this.height = height;
      this.image = image;
      this.context = context;
      this.x = width / 2 - width * 0.243;
      this.y = width / 3;
      
      this.frameX = 0;
      this.frameY = 0;

      this.monsterWorker = new Worker('./workers/monster_worker.js');

      this.monsterWorker.addEventListener('message', (event) => {
        const imageData = event.data;
        this.frameX = imageData.frameX;
        this.draw(this.context);
      });
    }
  
    update(deltaTime) {
        this.monsterWorker.postMessage({
            deltaTime: deltaTime,
            frameX: this.frameX,
        });
    }
  
    draw(context) {
      context.clearRect(0, 0, this.width, this.height);
      context.drawImage(
        this.image,
        770 * this.frameX,
        1386 * this.frameY,
        768,
        1386,
        this.x,
        this.y * 0.8,
        this.width / 2,
        this.height / 1.5
      );
    }
  }
  