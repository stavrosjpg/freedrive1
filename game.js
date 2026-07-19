const cars = {
    "Audi RS6": {
        maxSpeed: 3.2,
        acceleration: 0.035,
        color: 0x222222
    },

    "BMW M4 Competition": {
        maxSpeed: 2.9,
        acceleration: 0.045,
        color: 0x0066ff
    },

    "Mercedes C63": {
        maxSpeed: 3.0,
        acceleration: 0.04,
        color: 0xffffff
    }
};


let selectedCar = localStorage.getItem("car") || "Audi RS6";


let scene;
let camera;
let renderer;
let car;


let speed = 0;
let steering = 0;


let insideCamera = false;


let keys = {};



document.addEventListener("keydown", e => {

    keys[e.key.toLowerCase()] = true;


    if(e.key.toLowerCase() === "c"){

        insideCamera = !insideCamera;

    }

});


document.addEventListener("keyup", e => {

    keys[e.key.toLowerCase()] = false;

});



function startGame(){


scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);



camera = new THREE.PerspectiveCamera(
70,
window.innerWidth/window.innerHeight,
0.1,
5000
);



renderer = new THREE.WebGLRenderer({
antialias:true
});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


document.body.appendChild(renderer.domElement);




let light = new THREE.DirectionalLight(
0xffffff,
2
);

light.position.set(100,200,100);

scene.add(light);




// Boden

let ground = new THREE.Mesh(

new THREE.PlaneGeometry(
3000,
3000
),

new THREE.MeshLambertMaterial({
color:0x3c9b3c
})

);


ground.rotation.x=-Math.PI/2;

scene.add(ground);




// Straße

let road = new THREE.Mesh(

new THREE.BoxGeometry(
50,
0.1,
3000
),

new THREE.MeshLambertMaterial({
color:0x333333
})

);


road.position.y=0.05;

scene.add(road);




// Auto

let carData = cars[selectedCar];


car = new THREE.Mesh(

new THREE.BoxGeometry(
2.2,
1,
4.5
),

new THREE.MeshLambertMaterial({
color:carData.color
})

);


car.position.y=0.5;

scene.add(car);



camera.position.set(
0,
6,
10
);



animate();

}




function animate(){

requestAnimationFrame(animate);



let data=cars[selectedCar];


// Gas

if(keys["w"]){

speed += data.acceleration;

}


// Bremse

if(keys["s"]){

speed -= 0.05;

}



// Höchstgeschwindigkeit

if(speed > data.maxSpeed){

speed=data.maxSpeed;

}



// Reibung

speed *=0.98;



// Lenken

if(keys["a"]){

car.rotation.y +=0.04;

}


if(keys["d"]){

car.rotation.y -=0.04;

}



car.translateZ(speed);





// Kamera wechseln


if(insideCamera){


camera.position.set(
car.position.x,
car.position.y+1,
car.position.z
);


camera.lookAt(

new THREE.Vector3(

car.position.x,
car.position.y+1,
car.position.z-10

)

);



}else{


camera.position.lerp(

new THREE.Vector3(

car.position.x,
car.position.y+6,
car.position.z+12

),

0.08

);


camera.lookAt(car.position);


}



renderer.render(
scene,
camera
);


}



window.onload=()=>{

if(typeof startGame==="function"){

startGame();

}

};
