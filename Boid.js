class Boid {
    constructor(index){
        this.id = index;
       // this.position = createVector(random(0, width), random(0, height));
        this.position = createVector(width/2, height/2);
        this.velocity = p5.Vector.random2D();
        // this.velocity.setMag(random(2,5));
        this.velocity = createVector(random(-3, 3), random(-3, 3));
        this.acceleration = createVector(0,0);
        this.size = random(3,100);
        this.fillColor = [random(255), random(355), random(255), 120];
        this.strokeColor = [120, 110,190];
        this.maXForce = 0.005;
        this.maxSpeed = 3.0;
        this.perceptionRadius = 100;
        this.blindspot = 0;
        this.rate = 0;
        this.running = false;
        this.resetRunning = this.resetRunning.bind(this);
        this.growing = false;
        this.starved = false;
        this.triggered = false;
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

    calculateFlocking(boids, data){
            const { seperationValue } = data;
            //calculate vectors
            const align = this.align(boids);
            const cohesion = this.cohesion(boids);
            const seperation = this.seperation(boids, seperationValue);
            //add weightings
            align.mult(1.0);
            cohesion.mult(0.1);
            seperation.mult(1.5);
            //apply the new force
            this.acceleration.add(cohesion);
            this.acceleration.add(align);
            this.acceleration.add(seperation);
        }

    calculateInfluence(nX, nY){
        const mX = this.position.x;
        const mY = this.position.y;
        const d = dist(mX, mY, nX, nY);
        const influenceMult = 0.001;
        return d * influenceMult;
    }


    checkCollision(player){
        const d = dist(this.position.x, this.position.y, player.x, player.y);
        
        const radii = (this.size/2 + player.size/2);

        if(d < radii){
            
            this.triggered = true;

            return 
        } else {
            this.triggered = false;
        }
    }

    checkEdges(){
        if(this.position.x < 0){
            this.position.x = width - this.size/2;
        } else if (this.position.x > width){
            this.position.x = 0 + this.size/2;
        }
        if(this.position.y < 0){
            this.position.y = height;
        } else if(this.position.y > height){
            this.position.y = 0;
        }
    }

    checkSize(){
        
        if(this.size > 200){
            console.log('checking size', this.size, this.starved);
            this.starved = true;
        }
    }

    cohesion(boids){
      
        let sum = createVector(0,0);
        let count = 0;

        boids.forEach( boid => {
            const d = p5.Vector.dist(this.position, boid.position);
            if(d <  this.perceptionRadius && d > this.blindspot){
                sum.add(boid.position);
                count++
            }
    
        })

          if (count > 0) {
            sum.div(count);
            return this.seek(sum);
          } else {
            return createVector(0, 0);
          }


    }

    

    display(){
        if(!this.starved){

            let theta = this.velocity.heading() + radians(90);
            // console.log('theta:', theta);
            this.rate = map(theta, -4.0, 4.0, -6.0, 6.0);

            fill(this.fillColor);
            stroke(this.strokeColor);
            ellipse(this.position.x, this.position.y, this.size);
            fill(255);
            stroke(60, 60, 60);
            const eyeX = Math.sin(theta) * this.size/2 + this.position.x;
            const eyeY = Math.cos(theta) * this.size/2 + this.position.y;
            ellipse(eyeX, eyeY, this.size/6);
        }

    }

    evolve(boids){

        const data = this.generateEvolutionData();
        if(!this.running){
        this.calculateFlocking(boids, data);
        }
        if(this.growing){
            this.grow(data);
        }
        this.checkSize();
    }

    generateEvolutionData(){
        const seperationValue = this.generateSeperationValue();
        const growth = this.generateGrowth();
        const data = {
            seperationValue,
            growth
        }

        return data
    }

    generateGrowth(){
        let growth = 1;
        if(Math.random() > 0.99995){
            this.growing = true;
            growth = random(-5, 5);
            const growthSeason = Math.random() * 10000; 
            setTimeout(this.resetGrowing, 3000);
        }

        return growth
    }

    generateSeperationValue(){
        let seperationValue = this.size * 6 * random(0.001, 0.1);      
        let coin = Math.random() > 0.9995;
        if(coin){
            seperationValue = 450;
            this.running = true;
            setTimeout(this.resetRunning, 3000);
        } 
        return seperationValue
    }

    grow(data){
        const { growth } = data;
        this.size += growth;
    }

    resetGrowing(){
        this.growing = false;
    }

    resetRunning(){
        this.running = false;
    }

    seek(target){
        let desired = p5.Vector.sub(target,this.position);

      // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxForce);  // Limit to maximum steering force
    return steer;
    }



    seperation(boids, seperationValue){
       let desiredSeperation = seperationValue;
        let steer = createVector(0,0);
        let count = 0;

        boids.forEach( boid => {
            const d = p5.Vector.dist(this.position, boid.position);
            if(d < desiredSeperation && d > this.blindspot){
                let diff = p5.Vector.sub(this.position, boid.position);
                diff.normalize();
                diff.div(d);
                steer.add(diff);
                count++
            }
    
        })

        if (count > 0) {
            steer.div(count);
            }
        if (steer.mag() > 0) {
                // Implement Reynolds: Steering = Desired - Velocity
                steer.normalize();
                steer.mult(this.maxSpeed);
                steer.sub(this.velocity);
                steer.limit(this.maxForce);
              }
        return steer;
    }
    


    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        const origin = createVector(0, 0);
        const other = createVector( 10, 4)
        // this.rate = other.angleBetween(origin);
        // this.rate = p5.Vector.angleBetween(this.position, origin);
        // this.rate = map(this.rate, )
        // console.log(this.rate)
        
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