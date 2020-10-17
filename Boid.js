class Boid {
    constructor(index){
        this.id = index;
        this.position = createVector(random(0, width), random(0, height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,5));
        this.acceleration = createVector();
        this.size=random(3,20);
        this.fillColor = [random(255), random(355), random(255), 120];
        this.strokeColor = [120, 110,190];
        this.maXForce = 0.5;
        this.maxSpeed = 3.0;
    }


    display(){
        // console.log(this.position);
        fill(this.fillColor);
        stroke(this.strokeColor);
        ellipse(this.position.x, this.position.y, this.size);
    }


}