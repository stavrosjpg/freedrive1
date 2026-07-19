let selectedCar="";

let cars={

"Audi RS6":{
speed:1.2,
color:0x222222
},

"BMW M4 Competition":{
speed:1,
color:0x0066ff
},

"Mercedes C63":{
speed:1.1,
color:0xffffff
}

};



function selectCar(name){

selectedCar=name;

document.getElementById("selected").innerHTML=
"Ausgewählt: "+name;

}



function startGame(){

if(selectedCar==""){
alert("Wähle zuerst ein Auto!");
return;
}

document.getElementById("garage").style.display="none";

init();

}




let scene,camera,renderer,car;

let speed=0;
let turn=0;


function init(){


scene=new THREE.Scene();

scene.background=
new THREE.Color(0x87ceeb);



camera=new THREE.PerspectiveCamera(
60,
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
100,200,100
);

scene.add(light);





// Stadt Boden

let ground=new THREE.Mesh(

new THREE.PlaneGeometry(3000,3000),

new THREE.MeshLambertMaterial({
color:0x228833
})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);




// Straße

let road=new THREE.Mesh(

new THREE.BoxGeometry(
40,
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
2,
1,
4
),

new THREE.MeshLambertMaterial({
color:data.color
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


if(keys.w)
speed=0.3;

else
speed*=0.95;



if(keys.a)
turn=0.04;

else if(keys.d)
turn=-0.04;

else
turn=0;



car.rotation.y+=turn;

car.translateZ(speed);



camera.position.lerp(

new THREE.Vector3(
car.position.x,
car.position.y+6,
car.position.z+10
),

0.08

);


camera.lookAt(car.position);



document.getElementById("speed").innerHTML=
Math.round(speed*100)+" km/h";


renderer.render(
scene,
camera
);


}




let keys={};


document.addEventListener("keydown",e=>{
keys[e.key]=true;
});


document.addEventListener("keyup",e=>{
keys[e.key]=false;
});
