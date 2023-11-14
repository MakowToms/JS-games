var direction = 'clockwise'

var angle = 0;
const radius = 300;

var obstacle_array = [];
var score = 0;
var speed_increment = 0.1;
var interval1;
var interval2;
var obstacleinterval;
var interval4;
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.addEventListener('keyup', event => {
  if (event.code === 'KeyD') {
      obstacle_array.forEach(element => {console.log(element._left);console.log(element._right)})
    alert();
  }
})

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    if (direction === 'clockwise'){
        direction = 'counterclockwise'
    }
    else{
        direction = 'clockwise'
    }
  }
})

document.addEventListener("mousemove", e => {
            document.getElementById('cursor').style.top = (e.pageY-29)+"px";
            document.getElementById('cursor').style.left = (e.pageX-29)+"px";})
document.addEventListener("mousedown", () => {
            document.getElementById('cursor').style.scale = '1.1';})
document.addEventListener("mouseup", () => {
            document.getElementById('cursor').style.scale = '1';})

function deg_to_rad(deg){
    return(0.0174532925*deg)
}

function play(){
    interval1 = setInterval(move_player, 5);
    interval2 = setInterval(increment_score, 140);
    generateObstacles();
    interval4 = setInterval(function(){coin=generateCoin()}, 3000);

}

function increment_score(){
    score += 7;
    var pointsholder= document.getElementById('points')
    pointsholder.innerHTML=score;
}

function move_player() {

    if (direction === 'clockwise') {
        angle += speed_increment;
        angle = angle % 360;
    } else {
        angle -= speed_increment;
        angle = angle % 360;
    }
    if (angle < 0){
        angle = angle + 360;
    }

    document.getElementById('mydiv').style.top = (window.innerHeight / 2 + radius * Math.sin(deg_to_rad(angle)) - 15) + 'px';
    document.getElementById('mydiv').style.left = (window.innerWidth / 2 + radius * Math.cos(deg_to_rad(angle)) - 20) + 'px';

    for (let i = 0; i < obstacle_array.length; i++) {
       if (obstacle_array[i]._left < angle && obstacle_array[i]._right > angle){

           // NA RAZIE WSZYSTKO USUWAMY POTEM MOŻNA POMYSLEC
           removeAllChildNodes(document.body)

           //TO CZYSCI WSZYSTKIE PROCESY
           clearInterval(interval1);
           clearInterval(obstacleinterval)
           clearInterval(interval2)
           clearInterval(interval4)
           document.body.style.cursor = 'auto';
           //TUTAJ KOD NA OKIENKO Z WYNIKIEM ITP
           let popupcontainer =document.createElement("div");
            popupcontainer.className= "popup-container";
            document.body.appendChild(popupcontainer);

            let popuptext= document.createElement("div");
            let p = document.createElement('p');
            let p1 = document.createElement('p');
            popuptext.appendChild(p);
            popuptext.appendChild(p1);
            p.textContent= 'GAME OVER';
            p.style.fontSize = '50px';
            p.style.marginBottom = '-2%';
            p1.textContent= 'YOUR SCORE: ' + score
            popuptext.className= "popup-text";
            popupcontainer.appendChild(popuptext);

            const newButton = document.createElement('button');
            newButton.className= "tryagainbutton";
            newButton.textContent = 'TRY AGAIN';
            popuptext.appendChild(newButton);
            newButton.style.cursor = 'pointer';
            newButton.addEventListener('click', () => {

                window.location.reload();
              });
       }
       if ((obstacle_array[i]._left > obstacle_array[i]._right) && angle < obstacle_array[i]._right){
            // NA RAZIE WSZYSTKO USUWAMY POTEM MOŻNA POMYSLEC
           removeAllChildNodes(document.body)

           //TO CZYSCI WSZYSTKIE PROCESY
           clearInterval(interval1);
           clearInterval(obstacleinterval)
           clearInterval(interval2)
           clearInterval(interval4)
            document.body.style.cursor = 'auto';
           //TUTAJ KOD NA OKIENKO Z WYNIKIEM ITP
           let popupcontainer =document.createElement("div");
            popupcontainer.className= "popup-container";
            document.body.appendChild(popupcontainer);

            let popuptext= document.createElement("div");
            let p = document.createElement('p');
            let p1 = document.createElement('p');
            popuptext.appendChild(p);
            popuptext.appendChild(p1);
            p.textContent= 'GAME OVER';
            p.style.fontSize = '50px';
            p.style.marginBottom = '-2%';
            p1.textContent= 'YOUR SCORE:' + score;
            popuptext.className= "popup-text";
            popupcontainer.appendChild(popuptext);

            const newButton = document.createElement('button');
            newButton.className= "tryagainbutton";
            newButton.textContent = 'TRY AGAIN';
            newButton.style.cursor = 'pointer';
            popuptext.appendChild(newButton);

            newButton.addEventListener('click', () => {
                window.location.reload();

              });
       }
    }


    if (coin._left < angle && coin._right > angle){

        coin.getAnimationContainer().remove();
        coin._left=-100;
        coin._right=-100;
        score+=1000;
        addpoints();
    }
    if ((coin._left > coin._right) && angle < coin._right){

        coin.getAnimationContainer().remove();
        coin._left=-100;
        coin._right=-100;
        let animationcontainer =document.createElement("div");
        animationcontainer.className= "animation-container";
        document.body.appendChild(animationcontainer);
        score+=1000;
        addpoints();
    }
    speed_increment += 0.00008
    speed_increment = Math.min(speed_increment, 1)
}


class Coin{
    constructor(left,right) {
        let animationcontainer =document.createElement("div");
        animationcontainer.className= "animation-container";
        document.body.appendChild(animationcontainer);

        let yaxiscontainer = document.createElement('div');
        yaxiscontainer.className='y-axis-container';
        animationcontainer.appendChild(yaxiscontainer);

        let container=document.createElement('div');
        container.className= 'container';
        yaxiscontainer.appendChild(container);

        let flash= document.createElement('div');
        flash.className= 'flash';
        container.appendChild(flash);

        let coinside= document.createElement('div');
        coinside.className= 'coin side';
        container.appendChild(coinside);

        let shine=document.createElement('div');
        shine.className= 'shine'
        shine.style='transform:rotate(-30deg);'
        coinside.appendChild(shine)

        let sidecoin= document.createElement('div');
        sidecoin.className='side coin';
        container.appendChild(sidecoin);

        let coin= document.createElement('div');
        coin.className='coin';
        container.appendChild(coin);

        let dai= document.createElement('div');
        dai.className='dai';
        coin.appendChild(dai);

        let innerdai= document.createElement('div');
        innerdai.className='inner-dai';
        dai.appendChild(innerdai);

        let innerinnerdai= document.createElement('div');
        innerinnerdai.className='inner-inner-dai';
        innerdai.appendChild(innerinnerdai);

        let cutout= document.createElement('div');
        cutout.className='cutout';
        dai.appendChild(cutout);

        let daishadow= document.createElement('div');
        daishadow.className='dai-shadow';
        dai.appendChild(daishadow);

        shine=document.createElement('div');
        shine.className= 'shine';
        coin.appendChild(shine);

        let shadow= document.createElement('div');
        shadow.className='shadow';
        animationcontainer.appendChild(shadow);



        this._left = left;
        this._right = right;

        this.angle = (this._right + this._left)/2;
        this._angle1= this.angle + 90;
        this.updateVisuals = function() {
            animationcontainer.style.top = ((window.innerHeight / 2) + (radius * Math.sin(deg_to_rad(this.angle))) - 80) + 'px';
            animationcontainer.style.left = ((window.innerWidth / 2) + (radius * Math.cos(deg_to_rad(this.angle))) - 45) + 'px';
            animationcontainer.style.transform= 'rotate('+this._angle1+'deg)';}
        this.AnimationContainer= animationcontainer;
        this.updateVisuals();
        document.body.appendChild(animationcontainer);


    }
    getAnimationContainer(){
        return this.AnimationContainer;
    }

}
function generateCoin(){
    var left = 340*Math.random();
    var right = 20+left;
    let coin= new Coin(left,right);
    setTimeout(function() {
        coin.getAnimationContainer().remove();}, 3000);
    return coin;
}



class Obstacle{
    constructor(left, right) {
        this._id = Math.floor(Math.random() * 10000);
        this._obstacle = document.createElement("div");
        this._obstacle.classList.add('noThreat');

        this._clickCount = 0;

        this._left = left;
        this._right = right;
        this.angle = (this._right+this._left) / 2
        this._inithp = Math.min(7, Math.ceil(Math.ceil(Math.random() * 10) * speed_increment));


        this.mult = 1;
        if (Math.random() > 0.5){
                this.mult = -1;
            }

        this.updateVisuals = function() {
            this.angle += 0.3 * this.mult
            this.angle = this.angle % 360;
            this._obstacle.style.top = ((window.innerHeight / 2) + (radius * Math.sin(deg_to_rad(this.angle))) - 40) + 'px';
            this._obstacle.style.left = ((window.innerWidth / 2) + (radius * Math.cos(deg_to_rad(this.angle))) - 40) + 'px'
            this._obstacle.style.zIndex = '23';

            this._left = (this.angle - 9) % 360;
            this._right = (this.angle + 9) % 360;

            if (this._left < 0){
                this._left += 360;
            }
            if (this._right < 0){
                this._right += 360;
            }
            this._hp = this._inithp - this._clickCount;
            this._obstacle.innerHTML = this._hp;
        }
        //this.changeToActive = function() {this._obstacle.classList.remove('noThreat'); this._obstacle.classList.add('Threat')};
        this.changeToActive = function() {this._obstacle.className="Threat"};
        this.deleteDiv = function(){this._obstacle.remove()};
        this.updateVisuals();
        this._obstacle = document.body.appendChild(this._obstacle);
    }

    get left() {
        return this._left;
    }

    set left(value) {
        this._left = value;
    }

    get right() {
        return this._right;
    }

    set right(value) {
        this._right = value;
    }

    get obstacle() {
        return this._obstacle;
    }

    get clickCount() {
        return this._clickCount;
    }

    set clickCount(value) {
        this._clickCount = value;
    }


    get inithp() {
        return this._inithp;
    }
}

function generateObstacles() {
    let old_increment = speed_increment;
    obstacleinterval = setInterval(function sranie() {
        generateObstacle();
        if ((speed_increment - 0.1) > old_increment){
            old_increment = speed_increment
            let new_timeout = 1500 - 600*speed_increment;
            clearInterval(obstacle_interval);
            obstacle_interval = setInterval(sranie, new_timeout);
        }

                                        }, 1500)
}
function generateObstacle(){

    var left = 340*Math.random();
    var right = 18+left
    let obst = new Obstacle(left, right);
    let expire = setTimeout(function() {
        obst.deleteDiv();
        obstacle_array = obstacle_array.filter(function(instance) {return !Object.is(instance, obst)})}, 12000);
    let update = setTimeout(function(){obst.changeToActive(); obstacle_array.push(obst);}, 4000);
    let refreshIntervalId = setInterval(function(){obst.updateVisuals();
        if (obst.clickCount === obst.inithp){
            clearInterval(expire);
            obst.deleteDiv();
            obstacle_array = obstacle_array.filter(function(instance) {return !Object.is(instance, obst)});
            clearInterval(refreshIntervalId);
            clearInterval(update);
        }
        }, 15);
    obst.obstacle.addEventListener("click", function(){
        obst.clickCount++;

    })


}

function addpoints(){

  $("#tag").fadeIn({
    duration:400,
    easing:"linear",
    step:function(now, fx){
      $(this).css("top", -55 * now  +"px");
    }
  }).fadeOut({
    duration:300,
    step:function(now, fx){
      $(this).css("top",-55 * ( 2 - now) + "px");
    }
  });

}


