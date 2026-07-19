const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
5000
);


const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(renderer.domElement);



const light = new THREE.DirectionalLight(
0xffffff,
2
);

light.position.set(100,200,100);
scene.add(light);



const ground = new THREE.Mesh(

new THREE.PlaneGeometry(3000,3000),

new THREE.MeshLambertMaterial({
color:0x339933
})

);

ground.rotation.x=-Math.PI/2;

scene.add(ground);




// Straße

const road = new THREE.Mesh(

new THREE.BoxGeometry(
30,
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

const car = new THREE.Mesh(

new THREE.BoxGeometry(
2,
1,
4
),

new THREE.MeshLambertMaterial({
color:0x0066ff
})

);


car.position.y=0.5;

scene.add(car);





camera.position.set(
0,
6,
10
);



let speed=0;
let maxSpeed=1;
let rotation=0;



let keys={};



document.addEventListener("keydown",e=>{
keys[e.key]=true;
});


document.addEventListener("keyup",e=>{
keys[e.key]=false;
});



// Handy

gas.ontouchstart=()=>speed=0.3;
gas.ontouchend=()=>speed=0;

brake.ontouchstart=()=>speed=-0.2;
brake.ontouchend=()=>speed=0;


left.ontouchstart=()=>rotation=0.04;
left.ontouchend=()=>rotation=0;


right.ontouchstart=()=>rotation=-0.04;
right.ontouchend=()=>rotation=0;





function animate(){

requestAnimationFrame(animate);



if(keys["w"])
speed=0.3;

if(keys["s"])
speed=-0.2;


if(keys["a"])
rotation=0.04;

if(keys["d"])
rotation=-0.04;



car.rotation.y+=rotation;

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
Math.round(Math.abs(speed)*100)+" km/h";



renderer.render(
scene,
camera
);

}


animate();





window.onresize=()=>{

camera.aspect=
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

};
