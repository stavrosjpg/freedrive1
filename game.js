let selectedCar = "";

const cars = {
    "Audi RS6": {
        speed: 3.2,
        color: 0x222222
    },

    "BMW M4 Competition": {
        speed: 3.0,
        color: 0x0066ff
    },

    "Mercedes C63": {
        speed: 3.1,
        color: 0xffffff
    }
};


function selectCar(carName){

    selectedCar = carName;

    document.getElementById("selected").innerHTML =
    "Ausgewählt: " + carName;

}



function startGame(){

    if(selectedCar === ""){
        alert("Bitte erst ein Auto auswählen");
        return;
    }

    document.getElementById("garage").style.display="none";

    createGame();

}



function createGame(){

    let scene = new THREE.Scene();

    scene.background =
    new THREE.Color(0x87ceeb);


    let camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth/window.innerHeight,
        0.1,
        5000
    );


    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(renderer.domElement);



    let light = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    light.position.set(50,100,50);

    scene.add(light);



    let car = new THREE.Mesh(

        new THREE.BoxGeometry(2,1,4),

        new THREE.MeshLambertMaterial({
            color:cars[selectedCar].color
        })

    );


    car.position.y=0.5;

    scene.add(car);



    camera.position.set(
        0,
        5,
        10
    );



    let speed=0;


    let keys={};


    document.addEventListener("keydown",e=>{
        keys[e.key.toLowerCase()]=true;
    });


    document.addEventListener("keyup",e=>{
        keys[e.key.toLowerCase()]=false;
    });



    function loop(){

        requestAnimationFrame(loop);


        if(keys["w"]){
            speed=0.2;
        }


        car.translateZ(speed);


        camera.position.set(
            car.position.x,
            car.position.y+5,
            car.position.z+10
        );


        camera.lookAt(car.position);


        document.getElementById("speed").innerHTML =
        Math.round(speed*100)+" km/h";


        renderer.render(scene,camera);

    }


    loop();

}
