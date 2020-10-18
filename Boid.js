class Boid {
    constructor(index){
        this.id = index;
        this.position = createVector(random(0, width), random(0, height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,5));
        this.acceleration = createVector();
        this.size = random(3,20);
        this.fillColor = [random(255), random(355), random(255), 120];
        this.strokeColor = [120, 110,190];
        this.maXForce = 0.5;
        this.maxSpeed = 3.0;
        this.perceptionRadius = 100;
        this.blindspot = 0;
    }   

    align(boids){
       
        let sum = createVector(0,0);
        let total = 0;
        
        boids.forEach( (boid, index) => {
            const d = p5.Vector.dist(this.position, boid.position);
            if(d <  this.perceptionRadius && d > this.blindspot){
                // const influence = this.calculateInfluence(neighborPos.x, neighborPos.y);
                // desired.add(boid.velocity * influence);
                sum.add(boid.velocity);
                total++;
            }
        })
        
        if(total > 0){
            sum.div(total);
            sum.normalize();
            sum.mult(this.maxSpeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
            
        }       
        return createVector(0, 0);
    }     

    calculateFlocking(boids){
        const steering = this.align(boids);
        this.acceleration.add(steering);
    }

    calculateInfluence(nX, nY){
        const mX = this.position.x;
        const mY = this.position.y;
        const d = dist(mX, mY, nX, nY);
        const influenceMult = 0.001;
        return d * influenceMult;
    }

    checkEdges(){
        if(this.position.x < 0){
            this.position.x = width
        } else if (this.position.x > width){
            this.position.x = 0;
        }
        if(this.position.y < 0){
            this.position.y = height;
        } else if(this.position.y > height){
            this.position.y = 0;
        }
    }


    checkNeighbor(nX, nY, perceptionRadius){
        const myX = this.position.x;
        const myY = this.position.y;
        if(dist(myX, myY, nX, nY) < perceptionRadius){
            return true
        }
    }



    display(){
        // console.log(this.position);
        fill(this.fillColor);
        stroke(this.strokeColor);
        ellipse(this.position.x, this.position.y, this.size);
    }


    steer(){

    }



    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        
    }


}

// this.velocity.add(this.acceleration);
// // Limit speed
// this.velocity.limit(this.maxspeed);
// this.position.add(this.velocity);
// // Reset accelertion to 0 each cycle
// this.acceleration.mult(0);
// STEER = DESIRED MINUS VELOCITY
// Boid.prototype.seek = function(target) {
//     let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
//     // Normalize desired and scale to maximum speed
//     desired.normalize();
//     desired.mult(this.maxspeed);
//     // Steering = Desired minus Velocity
//     let steer = p5.Vector.sub(desired,this.velocity);
//     steer.limit(this.maxforce);  // Limit to maximum steering force
//     return steer;
//   }