let chosenCar = "";

let scene;
let camera;
let renderer;
let car;

let speed = 0;
let cameraInside = false;


const cars = {

"Audi RS6":{
    color:0x222222,
    maxSpeed:4.2,
    acceleration:0.06
},

"BMW M4 Competition":{
    color:0x0066ff,
    maxSpeed:4.6,
    acceleration:0.075
},

"Mercedes C63":{
    color:0xffffff,
    maxSpeed:4.4,
    acceleration:0.07
}

};



function chooseCar(name){

chosenCar=name;

document.getElementById("carName").innerHTML=
"Ausgewählt: "+name;

}




document.addEventListener("keydown",function(e){

if(e.key.toLowerCase()=="c"){

cameraInside=!cameraInside;

}

});





function startGame(){


if(chosenCar==""){

alert("Bitte Auto auswählen");

return;

}


document.getElementById("menu").style.display="none";


createWorld();


}




function createWorld(){


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






let sun=new THREE.DirectionalLight(

0xffffff,

2

);

sun.position.set(

100,

200,

100

);

scene.add(sun);





// Stadt Boden


let ground=new THREE.Mesh(

new THREE.PlaneGeometry(

3000,

3000

),

new THREE.MeshLambertMaterial({

color:0x555555

})

);


ground.rotation.x=-Math.PI/2;

scene.add(ground);






// Straßen


for(let i=-1000;i<=1000;i+=200){


let road1=new THREE.Mesh(

new THREE.BoxGeometry(

50,

0.1,

3000

),

new THREE.MeshLambertMaterial({

color:0x222222

})

);


road1.position.x=i;

scene.add(road1);




let road2=new THREE.Mesh(

new THREE.BoxGeometry(

3000,

0.1,

50

),

new THREE.MeshLambertMaterial({

color:0x222222

})

);


road2.position.z=i;

scene.add(road2);


}







// Gebäude


for(let i=0;i<200;i++){


let height=
50+Math.random()*200;


let building=new THREE.Mesh(

new THREE.BoxGeometry(

40+Math.random()*50,

height,

40+Math.random()*50

),

new THREE.MeshLambertMaterial({

color:
0x777777+Math.random()*0x222222

})

);



building.position.x=
Math.random()*2500-1250;


building.position.z=
Math.random()*2500-1250;


building.position.y=
height/2;


scene.add(building);


}







// Auto


let data=cars[chosenCar];


car=new THREE.Mesh(

new THREE.BoxGeometry(

2.5,

1,

5

),

new THREE.MeshLambertMaterial({

color:data.color

})

);



car.position.y=1;


scene.add(car);






camera.position.set(

0,

8,

15

);





let keys={};





document.addEventListener("keydown",e=>{

keys[e.key.toLowerCase()]=true;

});



document.addEventListener("keyup",e=>{

keys[e.key.toLowerCase()]=false;

});







function update(){



requestAnimationFrame(update);




// Gas

if(keys["w"]){

speed+=data.acceleration;

}




if(keys["s"]){

speed-=0.1;

}




speed*=0.98;




if(speed>data.maxSpeed){

speed=data.maxSpeed;

}




if(speed<-1){

speed=-1;

}






// Lenken


if(keys["a"]){

car.rotation.y+=0.04;

}


if(keys["d"]){

car.rotation.y-=0.04;

}





car.translateZ(speed);







// Kamera


if(cameraInside){


camera.position.set(

car.position.x,

car.position.y+1,

car.position.z

);


camera.lookAt(

car.position.x,

car.position.y+1,

car.position.z-10

);



}

else{


camera.position.lerp(

new THREE.Vector3(

car.position.x,

car.position.y+8,

car.position.z+15

),

0.08

);


camera.lookAt(car.position);


}






document.getElementById("speed").innerHTML=

Math.round(speed*100)+" km/h";






renderer.render(

scene,

camera

);



}



update();



}
