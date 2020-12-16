let center; //vector to center of canvas
let startVector = Array(); //startpoints
let vectorSet = Array(); //set of all other points
let percentJump = 0.5; //size of gap 
let iterationsBase = 201; //number of inner lines per side
let sides; //number of sides in shape

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 30, 100, 100, 1);
  center = createVector(width/2,height/2);
  sides = 9;
  iterations = iterationsBase*sides;
  percentJump = 0.01
  
  for(let i = 0; i < sides; i++){
    let v = createVector(cos((2*i*PI)/sides)*150,sin((2*i*PI)/sides)*150);   
    v.add(center);
    vectorSet.push(v);
  }
}

function draw() {
  background(30, 100, 10);
  //inner lines
  for(let i = sides-1; i < iterations ; i++){
    let p = vectorSet[i-(sides-1)];
    let q = vectorSet[i-(sides-2)];
    let d = p5.Vector.add(p, p5.Vector.mult(p5.Vector.sub(q,p), percentJump));
    vectorSet.push(d);
  }
  strokeWeight(1);
  for(let i = sides; i < vectorSet.length; i++){
    if (i%2==0){  stroke(5, 20, 70, 1);}
    else{  stroke(350, 70, 10, 1);}
    let p = vectorSet[i-1];
    let d = vectorSet[i];
    line(p.x, p.y, d.x, d.y);
  }
  
  //outer triangle
  stroke(180, 100, 100, 1);
  strokeWeight(3);
  for(let i = 0; i < sides; i++){
    let n = vectorSet[(i+1)%sides];
    let d = vectorSet[i];
    line(n.x, n.y, d.x, d.y);
  }
  
  //increment variables
  percentJump += 0.002
  if (percentJump >= 1){
    //increase sides by one, reset vectorSet completely
    sides -= 1
    iterations = iterationsBase*sides;
    percentJump = 0.01
    vectorSet = [];
    for(let i = 0; i < sides; i++){
      let v = createVector(cos((2*i*PI)/sides)*150,sin((2*i*PI)/sides)*150);   
      v.add(center);
      vectorSet.push(v);
    }
  } else {
    //just reset vectorSet, keep the startvectors
    vectorSet = vectorSet.slice(0,sides);
  }
  if(sides == 2) {
    noLoop();
  }
}