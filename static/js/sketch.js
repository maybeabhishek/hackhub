

var n = document.getElementById("name").value


function setup() {
  var canvas = createCanvas(720, 360);
  canvas.parent("draw")
  x = 100;
    for (let i = 0; i < n ; i++) {
    fill(200,30,40);
    noStroke();
    circle(x, 100, 30);
    text('Arduino '+ i, x-25, 150);
    x += 100;
  }
}
