let randomCounts100 = [];
let randomCounts500 = [];
let randomCounts1000 = [];
let randomPerlins = [];
let randomNormals = [];
let animateHistogram = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(127);

  // Generate randomPerlins array
  let t = 0;
  for (let i = 0; i < 1000; i++) {
    randomPerlins[i] = noise(t);
    t = t + 0.01;
  }

  // Generate randomNormals array
  let vn = 0;
  for (let i = 0; i < 1000; i++) {
    randomNormals[i] = vn;
    vn = vn + randomGaussian(0, 1);
  }

  // Initialize randomCounts arrays
  for (let i = 0; i < 100; i++) {
    randomCounts100[i] = 0;
  }
  for (let i = 0; i < 500; i++) {
    randomCounts500[i] = 0;
  }
  for (let i = 0; i < 1000; i++) {
    randomCounts1000[i] = 0;
  }

  // Generate lines for array 500
  generateLines(randomCounts500);

  // Generate lines for array 1000
  generateLines(randomCounts1000);
}

function generateLines(array) {
  for (let i = 0; i < array.length; i++) {
    let idx = int(random(array.length));
    array[idx] = array[idx] + 5;
  }
}

function draw() {
  background(127);

  // First quadrant: Array 100 (non-animating)
  drawArray(randomCounts100, 0, 0, windowWidth / 2, windowHeight / 2);

  // Second quadrant: Array 500 (non-animating)
  drawArray(randomCounts500, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);

  // Third quadrant: Array 1000 (non-animating)
  drawArray(randomCounts1000, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);

  // Fourth quadrant: Histogram (animating)
  drawHistogram(randomCounts100, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2, animateHistogram);
}

function drawArray(array, x, y, w, h) {
  // Draw the lines
  strokeWeight(2);
  for (let i = 0; i < array.length - 1; i++) {
    let y1 = map(array[i], 0, max(array), h, 0);
    let y2 = map(array[i + 1], 0, max(array), h, 0);
    line(x + i * (w / array.length), y + y1, x + (i + 1) * (w / array.length), y + y2);
  }
}

function drawHistogram(array, x, y, w, h, animate) {
  // Calculate histogram data
  let hist = Array.from({ length: 10 }, () => 0);
  for (let i = 0; i < array.length; i++) {
    let bin = int(map(array[i], 0, max(array), 0, hist.length - 1));
    hist[bin]++;
  }

  // Draw histogram bars
  let barWidth = w / hist.length;
  let maxHist = max(hist);
  for (let i = 0; i < hist.length; i++) {
    let barHeight = map(hist[i], 0, maxHist, 0, h);
    fill(255);
    rect(x + i * barWidth, y + h - barHeight, barWidth, barHeight);
  }

  // Animate histogram if enabled
  if (animate) {
    for (let i = 0; i < array.length; i++) {
      array[i] = noise(i * 0.1 + frameCount * 0.01) * maxHist;
    }
  }
}