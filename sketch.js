let started  = false;

const numBoids = 20;
let boids = Array.from({ length: numBoids });

function setup(){
    createCanvas(800, 800);
    boids.forEach((boid, i) => {
        boids[i] = new Boid(i);
    })
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
    text('drag the mouse to generate new boids', 100, 100);
}

function drawBoids(){
    boids.forEach(boid => {
        // update boid
        boid.display();
    })
}


function mousePressed(){
    if(!started){
        started = true;
    } else {
        boids.forEach((boid, i) => {
            boids[i] = new Boid(i);
        })
    }
    
}

