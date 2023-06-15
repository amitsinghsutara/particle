var maxFrame = 6;
var fps = 10;
var frameInterval = 1000 / fps;
var frameTimer = 0;


self.addEventListener('message', function (e) {
    var deltaTime = e.data.deltaTime;
    var frameX = e.data.frameX;

    if (frameTimer > frameInterval) {
        frameTimer = 0;
        if (frameX < maxFrame) {
            frameX++;
        } else {
            frameX = 0;
        }
    } else {
        frameTimer += deltaTime;
    }

  var imageData = {
    frameX: frameX
  };

  self.postMessage(imageData);
});
