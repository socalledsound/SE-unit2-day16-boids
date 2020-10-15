let numBoids = 30;
let started  = false;
let flock = [];
let boidCount = 0;

function setup(){
    createCanvas(800, 800);

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
    text('drag the mouse to generate new boids', 100, 100);
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
        numBoids = random(3,300);
        for(let i = 0; i< numBoids; i++){
            flock.push(new Boid(i));
        }
    }

    //  else {
    //     flock.push(new Boid(boidCount));
    //     boidCount++
    // }
    

}

