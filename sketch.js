const CANV_SIZE = 600;

let numBoids = 20;
let started  = false;
let flock = [];
let boidCount = 0;
let numSounds = numBoids;
let sounds = Array.from({ length: numSounds });

let player;


function preload(){

    sounds.forEach((sound,i) => {
        sounds[i] = loadSound(`sounds/${i}.mp3`);
    })
    
}


function setup(){
    createCanvas(CANV_SIZE, CANV_SIZE);
    frameRate(12);
    flock.push(new Boid(boidCount));
    boidCount++
    sounds.forEach( sound => {
        sound.loop();
        sound.setVolume(0.2);
    })
    
    player = new Player();
}

function draw(){
    background(0);
    if(!started){
        drawIntro();
    } else {
        player.update();
        const triggeredSound = player.checkCollision(flock);
        player.display();
        drawBoids();
        boidSound(triggeredSound);
        
 

    }
}

function boidSound(triggeredSound){
    const rate = getPlayBackRate();
    const absRate = Math.abs(rate)/2;
    



    flock.forEach((boid, i) => {
        if(i < numSounds- 1){
            sounds[i].rate(boid.rate/2);
            sounds[i].setVolume(boid.size/150, 1.0);
            if(boid.starved){
                sounds[i].stop();
            }
        }
        
    })


    if(triggeredSound){
        sounds[triggeredSound].setVolume(1.5,0.1);
    }
    // sounds.forEach( sound => {
    //     sound.rate(boids[i%numSounds].rate);
    // })
}


function drawIntro(){
    fill(255);
    text('click the mouse to generate new boids', 100, 100);
}

function drawBoids(){

    flock.forEach( (boid, i) => {
        boid.checkCollision(player);
        console.log(boid.triggered);
        if(!boid.triggered){
        boid.evolve(flock);
        boid.checkEdges();
        boid.update();
        }
        boid.display();
        if(boid.starved){
            // console.log(flock[i].starved);
            flock.slice(i,1);
            
        }
    })

}

function getPlayBackRate(){
    const totalRate = flock.reduce((acc, cur)=>{
        return acc += cur.rate
    }, 0)

    return totalRate/flock.length
}


function mousePressed(){
    if(started === false){
        started = true;
        for(let i = 0; i< numBoids; i++){
            flock.push(new Boid(i));
        }
    } else {
        flock = [];
        numBoids = random(90, 120);
        for(let i = 0; i< numBoids; i++){
            flock.push(new Boid(i));
        }
    }

    //  else {
    //     flock.push(new Boid(boidCount));
    //     boidCount++
    // }
    

}

