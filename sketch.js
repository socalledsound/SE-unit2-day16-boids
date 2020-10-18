let numBoids = 20;
let started  = false;
let flock;

function setup(){
    createCanvas(600, 600);
    makeFlock(numBoids);
}

function draw(){
    background(0);
    if(!started){
        drawIntro();
    } else {
        drawBoids();
    }
}

function drawIntro(){
    fill(255);
    text('click the mouse to generate new boids', 100, 100);
}

function makeFlock(numBoids){
    flock = Array.from({length: numBoids}, (boid, index) =>  new Boid(index))
}

function drawBoids(){

    flock.forEach( boid => {
        boid.calculateFlocking(flock);
        boid.checkEdges();
        boid.update();
        boid.display();
    })

}


function mousePressed(){
    if(!started){
        started = true;
    } else {
        numBoids = random(3, 60);
        makeFlock(numBoids);
    }
}

