let wynik=0;
let KoniecGry=false;
let currHTMLTile;
let currPythTile;
// const cursor = document.querySelector("cursor");

// window.addEventListener('mousemove', e => {
//     cursor.style.top = e.pageY + 'px';
//     cursor.style.left = e.pageX + 'px';
// })

window.onload=function(){
    setGame();
}

function setIntervalSpeedUp() {
    setInterval(function () {
        const speed = speedster();
        clearInterval(intervalHTML);
        clearInterval(intervalPyth);
        intervalHTML = setInterval(setHTML, speed);
        intervalPyth = setInterval(setPyth, speed);
    }, 10000);
}

let intervalHTML = setInterval(setHTML, 1000);
let intervalPyth = setInterval(setPyth, 1500);

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", SelectTile);
        document.getElementById("plansza").appendChild(tile);
    }

    setInterval(setHTML, 1000);
    setInterval(setPyth, 1500);
    setIntervalSpeedUp();
}

function setHTML(){
    if(KoniecGry){
        return;
    }
    if(currHTMLTile){
        currHTMLTile.innerHTML="";
    }
    let HTML = document.createElement("img");
    HTML.src = "./Htmlcssjs.png";

    let num=getRandomTile();
    if(currPythTile && currPythTile.id==num){
        return;
    }
    currHTMLTile=document.getElementById(num);
    currHTMLTile.appendChild(HTML);
    
}

function getRandomTile(){
    let num= Math.floor(Math.random()*9);
    return num.toString();
}

function setPyth(){
    if(KoniecGry){
        return;
    }
    if(currPythTile){
        currPythTile.innerHTML="";
    }
    let Pyth = document.createElement("img");
    Pyth.src = "./python.png";

    let num=getRandomTile();
    if(currHTMLTile && currHTMLTile.id==num){
        return;
    }
    currPythTile=document.getElementById(num);
    currPythTile.appendChild(Pyth);
}

function SelectTile() {
    if (KoniecGry) {
        return;
    }
    if (this == currHTMLTile) {
        wynik += 5;
        document.getElementById("Wynik").innerText = wynik.toString();

        // -------------------------------------------- Tutaj ta animacja --------------------------------------------
        const punktAnimation = document.getElementById("punkt-animation");
        punktAnimation.style.display = "block";

        setTimeout(function () {
            punktAnimation.style.display = "none";
        }, 1000);

        if (wynik == 100) {
            document.getElementById('Wynik').innerText = "KONIEC GRY: Jesteś najlepszy na roku " + wynik.toString() + "/100";
            KoniecGry = true;
        }
    }
    else if(this==currPythTile){
        if(wynik<=50){
            document.getElementById('Wynik').innerText="KONIEC GRY: Widzimy się za rok "+wynik.toString()+"/100";
        }
        if(wynik>50 && wynik<=60){
            document.getElementById('Wynik').innerText="KONIEC GRY: Solidna trójeczka "+wynik.toString()+"/100";
        }
        if(wynik>60 && wynik<=70){
            document.getElementById('Wynik').innerText="KONIEC GRY: 3.5?? Forma mutant "+wynik.toString()+"/100";
        }
        if(wynik>70 && wynik<=80){
            document.getElementById('Wynik').innerText="KONIEC GRY: 4 "+wynik.toString()+"/100";
        }
        if(wynik>80 && wynik<=90){
            document.getElementById('Wynik').innerText="KONIEC GRY: 4.5 ajajaj prawie... "+wynik.toString()+"/100";
        }
        if(wynik>90 && wynik<100){
            document.getElementById('Wynik').innerText="KONIEC GRY: 5, imponujące "+wynik.toString()+"/100";
        }

        
        KoniecGry=true;
    }
    else{
        wynik-=5;
        document.getElementById("Wynik").innerText=wynik.toString();
    }
}
function speedster(){
    let interval=1000-wynik*10;
    return interval;
}




