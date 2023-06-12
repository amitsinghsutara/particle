class Particle {

    constructor(mouse) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    draw(context) {
        let gradient = context.createLinearGradient(this.x - this.size, this.y - this.size, this.x + this.size, this.y + this.size);
        gradient.addColorStop(0.3, "white");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(0.7, "red");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1; 
        }
    }

    serialize() {
        return {
          x: this.x,
          y: this.y,
          size: this.size,
          speedX: this.speedX,
          speedY: this.speedY
        };
      }
    
    deserialize(data) {
        this.x = data.x;
        this.y = data.y;
        this.size = data.size;
        this.speedX = data.speedX;
        this.speedY = data.speedY;
    }
}