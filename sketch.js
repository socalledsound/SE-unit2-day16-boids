const CANV_SIZE = 600;

let numBoids = 3;
let started  = false;
let flock = [];
let boidCount = 0;

function setup(){
    createCanvas(CANV_SIZE, CANV_SIZE);

    flock.push(new Boid(boidCount));
    boidCount++

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

function drawBoids(){

    flock.forEach( boid => {
        boid.calculateFlocking(flock);
        boid.checkEdges();
        boid.update();
        boid.display();
    })

}


function mousePressed(){
    if(started === false){
        started = true;
        for(let i = 0; i< numBoids; i++){
            flock.push(new Boid(i));
        }
    } else {
        flock = [];
        numBoids = random(3, 60);
        for(let i = 0; i< numBoids; i++){
            flock.push(new Boid(i));
        }
    }

    //  else {
    //     flock.push(new Boid(boidCount));
    //     boidCount++
    // }
    

}

