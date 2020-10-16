class Player {
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.size = 20;
        this.fillColor=[255,255,255,200];
        this.triggeredFillColor=[240,20,60,250];
        this.triggered = false;
    }


    checkCollision(boids){
        boids.forEach((boid,i) => {
      
            const d = dist(this.x, this.y, boid.position.x, boid.position.y);
        
            const radii = (this.size/2 + boid.size/2);
 
            if(d < radii){
                
                this.triggered = true;
 
                return i
            } else {
                this.triggered = false;
            }
            
        })
        
    }



    update(){
        this.x = mouseX;
        this.y = mouseY;
    }


    display(){
        if(this.triggered){
            fill(this.triggeredFillColor)
        } else {
            fill(this.fillColor);
        }
        
        ellipse(this.x, this.y, this.size)
    };

}