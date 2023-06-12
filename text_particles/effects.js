class Effects {
    constructor(context, canvasWidth, canvasHeight) {
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textX = this.canvasWidth / 2;
        this.textY = this.canvasHeight / 2;
        this.fontSize = 50;
        this.lineHeight = this.fontSize * 0.8;
        this.maxTextWidth = this.canvasWidth * 0.8;

        this.particles = [];
        this.gap = 3;
        this.mouse = {
            radius: 2000,
            x: 0,
            y: 0
        }
    }

    wrapText(text) {
        const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth,  this.canvasHeight);
        gradient.addColorStop(0.3, '#F8E218');
        gradient.addColorStop(0.5, '#F8E218');
        gradient.addColorStop(0.7, '#E39D37');
        this.context.fillStyle = gradient;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.lineWidth = 3;
        this.context.strokeStyle = '#A46225';
        this.context.font = `bold ${this.fontSize}px Kalam, cursive`;

        //break multiline text
        let lineArray = [];
        let words = text.split(' ');
        let lineCounter = 0;
        let line = '';
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + ' ';
            if (this.context.measureText(testLine).width > this.maxTextWidth) {
                line = words[i] + ' ';
                lineCounter++;
            } else {
                line = testLine;
            }
            lineArray[lineCounter] = line;
        }
        let textHeight = this.lineHeight * lineCounter;
        this.textY = this.canvasHeight / 2 - textHeight / 2;
        lineArray.forEach((el, index) => {
            this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
            this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            
        })
        this.convertToParticle()
    }

    convertToParticle() {
        this.particles = [];
        const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let y = 0; y < this.canvasHeight; y += this.gap) {
            for (let x = 0; x < this.canvasWidth; x += this.gap) {
                let index = (y * this.canvasWidth + x) * 4;
                const alpha = pixels[index + 3];
                if (alpha > 0) {
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                    this.particles.push(new Particle(this, x, y, color));
                } 
            }
        }
    }

    render() {
        this.particles.forEach((particle) => {
            particle.draw();
            particle.update();
        })
    }
}