class Monster {
    constructor(width, height, image) {
      this.width = width;
      this.height = height;
      this.image = image;
      this.maxFrame = 6;
      this.x = width / 2 - width * 0.243;
      this.y = width / 3;
      this.fps = 10;
      this.frameInterval = 1000 / this.fps;

      this.frameTimer = 0;
      this.frameX = 0;
      this.frameY = 0;
    }
  
    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      } else {
        this.frameTimer += deltaTime;
      }
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
  