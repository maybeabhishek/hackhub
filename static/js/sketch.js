

var n = document.getElementById("name").value
var n1 = document.getElementById("name1").value

function setup() {
  var canvas = createCanvas(720, 360);
  canvas.parent("draw")
}

function draw(){
    x = 100;
    for (let i = 0; i < n ; i++) {
    fill(200,30,40);
    noStroke();
    circle(x, 100, 30);
    fill(10,64,255);
    text('Arduino '+ i, x-25, 150);
    x += 100;
  }
  for (let i = 0; i < n1; i++) {
    fill(200,30,40);
    noStroke();
    circle(x, 100, 30);
    fill(10,64,255);
    text('Rasp Pi'+ i, x-25, 150);
    x += 100;
    
  }
}


