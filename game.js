let selectedCar = "";

let scene;
let camera;
let renderer;
let car;

let speed = 0;
let insideCamera = false;


const cars = {

"Audi RS6":{
    maxSpeed:3.2,
    acceleration:0.04,
    color:0x222222
},

"BMW M4 Competition":{
    maxSpeed:2.9,
    acceleration:0.05,
    color:0x0066ff
},

"Mercedes C63":{
    maxSpeed:3.0,
    acceleration:0.045,
    color:0xffffff
}

};


let keys={};



function selectCar(name){

selectedCar=name;

document.getElementById("selected").innerHTML=
"Ausgewählt: "+name;

}



function startGame(){

if(selectedCar===""){

alert("Bitte erst ein Auto auswählen");

return;

}


document.getElementById("garage").style.display="none";


createGame();

}




document.addEventListener("keydown",e=>{

keys[e.key.toLowerCase()]=true;


if(e.key.toLowerCase()=="c"){

insideCamera=!insideCamera;

}

});


document.addEventListener("keyup",e=>{

keys[e.key.toLowerCase()]=false;

});





function createGame(){


scene=new THREE.Scene();

scene.background=
new THREE.Color(0x87ceeb);



camera=new THREE.PerspectiveCamera(

70,

window.innerWidth/window.innerHeight,

0.1,

5000

);



renderer=new THREE.WebGLRenderer({

antialias:true

});


renderer.setSize(

window.innerWidth,

window.innerHeight

);


document.body.appendChild(renderer.domElement);





let light=new THREE.DirectionalLight(

0xffffff,

2

);

light.position.set(

100,

200,

100

);

scene.add(light);





// Stadt Boden

let ground=new THREE.Mesh(

new THREE.PlaneGeometry(

3000,

3000

),

new THREE.MeshLambertMaterial({

color:0x339933

})

);


ground.rotation.x=-Math.PI/2;

scene.add(ground);





// Straße

let road=new THREE.Mesh(

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

let data=cars[selectedCar];


car=new THREE.Mesh(

new THREE.BoxGeometry(

2.2,

1,

4.5

),

new THREE.MeshLambertMaterial({

color:data.color

})

);


car.position.y=0.5;

scene.add(car);



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

speed -=0.08;

}



// Geschwindigkeit begrenzen

if(speed>data.maxSpeed){

speed=data.maxSpeed;

}


if(speed<-1){

speed=-1;

}



// Reibung

speed*=0.98;




// Lenken


if(keys["a"]){

car.rotation.y+=0.04;

}


if(keys["d"]){

car.rotation.y-=0.04;

}




car.translateZ(speed);






// Kamera


if(insideCamera){


// Innenansicht

camera.position.set(

car.position.x,

car.position.y+0.8,

car.position.z

);


camera.lookAt(

car.position.x,

car.position.y+0.8,

car.position.z-10

);



}else{


// GTA Kamera

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



document.getElementById("speed").innerHTML=

Math.round(Math.abs(speed)*100)+" km/h";



renderer.render(

scene,

camera

);


}
