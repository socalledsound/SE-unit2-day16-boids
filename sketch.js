let started  = false;

function setup(){
    createCanvas(800, 800);

}

function draw(){
    background(0);
    if(!started){
        drawIntro();
    }
}

function drawIntro(){
    fill(255);
    text('drag the mouse to generate new boids', 100, 100);
}



