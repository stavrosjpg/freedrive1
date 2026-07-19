let selectedCar="";


const cars={

"Audi RS6":{
color:0x222222,
max:3.8,
acc:0.06
},

"BMW M4 Competition":{
color:0x0066ff,
max:4.2,
acc:0.07
},

"Mercedes C63":{
color:0xffffff,
max:4,
acc:0.065
}

};



function selectCar(car){

selectedCar=car;

document.getElementById("selected").innerHTML=
"Ausgewählt: "+car;

}



function startGame(){

if(!selectedCar){

alert("Auto auswählen");

return;

}


document.getElementById("garage").style.display="none";

createWorld();

}




function createWorld(){


let scene=new THREE.Scene();

scene.background=
new THREE.Color(0x87ceeb);



let camera=new THREE.PerspectiveCamera(

70,
innerWidth/innerHeight,
0.1,
5000

);



let renderer=new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
innerWidth,
innerHeight
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





// große Stadtfläche

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

for(let i=-600;i<=600;i+=200){


let road1=new THREE.Mesh(

new THREE.BoxGeometry(
40,
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
40
),

new THREE.MeshLambertMaterial({
color:0x222222
})

);

road2.position.z=i;

scene.add(road2);


}




// Häuser

for(let i=0;i<150;i++){


let building=new THREE.Mesh(

new THREE.BoxGeometry(
40+Math.random()*40,
80+Math.random()*150,
40+Math.random()*40
),

new THREE.MeshLambertMaterial({

color:
0x888888

})

);



building.position.x=
Math.random()*2400-1200;


building.position.z=
Math.random()*2400-1200;


building.position.y=
building.geometry.parameters.height/2;


scene.add(building);


}





// Auto


let data=cars[selectedCar];


let car=new THREE.Mesh(

new THREE.BoxGeometry(
2.4,
1,
5
),

new THREE.MeshLambertMaterial({

color:data.color

})

);


car.position.y=1;

scene.add(car);



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

speed+=data.acc;

}


if(keys["s"]){

speed-=0.1;

}


speed*=0.98;



if(speed>data.max)
speed=data.max;



if(keys["a"])
car.rotation.y+=0.04;


if(keys["d"])
car.rotation.y-=0.04;




car.translateZ(speed);





camera.position.lerp(

new THREE.Vector3(

car.position.x,

car.position.y+8,

car.position.z+15

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



loop();


}
