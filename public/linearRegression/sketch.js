// https://www.youtube.com/watch?v=szXbuO3bVRk

var arr = [];
var regr = {};

function preload() {

}

function setup() {
  createCanvas(400,400);
}

function draw() {
  background(51);
  translate(0,height);
  fill(255);
  strokeWeight(0);
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i].x;
    let y = arr[i].y;
    showPoint(x,y);
  }
  if (arr.length >= 2) {
    regr = linearRegression(arr);
    showLine(regr);
  }
}


function linearRegression(arr) {

  /**
  Calculating averages
  */
  let x_avg = 0;
  let y_avg = 0;
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i].x;
    let y = arr[i].y;
    x_avg += x;
    y_avg += y;
  }
  x_avg /= arr.length;
  y_avg /= arr.length;

  /**
  calculating denominator and numerator for ordinary least squares
  */
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < arr.length; i++) {
    let x = arr[i].x;
    let y = arr[i].y;
    numerator += (x - x_avg) * (y - y_avg);
    denominator += Math.pow(x - x_avg,2);
  }

  m = numerator / denominator;
  b = y_avg - m * x_avg;

  return { 'slope': m, 'yintersect': b };
}

function showPoint(x,y) {
  ellipse(x,0 - y,10,10);
}

function showLine(regr) {
  let m = regr.slope;
  let b = regr.yintersect;
  let x1 = 0;
  let x2 = width;
  let y1 = m * x1 + b;
  let y2 = m * x2 + b;

  stroke(255,0,255);
  strokeWeight(2);
  line(x1,-y1,x2,-y2);

}

function mousePressed() {
  var x = mouseX;
  var y = height - mouseY;

  arr.push(createVector(x,y));
}
