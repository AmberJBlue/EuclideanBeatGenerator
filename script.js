let radiusSlider
let rotationSlider

function setup() {
    createCanvas(windowWidth, windowHeight)

    radiusSlider = createSlider(10, 200, 1)
    rotationSlider = createSlider(0, TAU, 1)
  }
  
function draw() {
    background(0)
    stroke(255)
    noFill()

    regularPolygon(width / 2, height / 2, 5, radiusSlider.value(), rotationSlider.value())
  }

function regularPolygon(x, y , n, radius, rotation) {
    beginShape()

    for (let i = 0; i < n; i++) {
        vertex(x + cos(i * TAU / n + rotation) * radius, y + sin(i * TAU / n + rotation) * radius)
    }

    endShape(CLOSE)
}

class euclideanPolygon {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.diameter = random(10, 30);
        this.speed = 1;
      }

}