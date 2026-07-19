let selectedCar = null;


const cars = {

"Audi RS6":{
color:0x222222,
speed:0.35
},


"BMW M4 Competition":{
color:0x0066ff,
speed:0.4
},


"Mercedes C63":{
color:0xffffff,
speed:0.38
}

};



// AUTO AUSWAHL


document.getElementById("rs6").onclick=function(){

selectCar("Audi RS6");

};


document.getElementById("m4").onclick=function(){

selectCar("BMW M4 Competition");

};


document.getElementById("c63").onclick=function(){

selectCar("Mercedes C63");

};





function selectCar(name){

selectedCar=name;

document.getElementById("selected").innerHTML=

"Ausgewählt: "+name;

}




document.getElementById("start").onclick=function(){

if(selectedCar==null){

alert("Bitte erst ein Auto auswählen");

return;

}


document.getElementById("garage").style.display="none";

startGame();

};






function startGame(){


let scene=new THREE.Scene();

scene.background=
new THREE.Color(0x87ceeb);



let camera=new THREE.PerspectiveCamera(

70,

window.innerWidth/window.innerHeight,

0.1,

1000

);



let renderer=new THREE.WebGLRenderer({

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

light.position.set(50,100,50);

scene.add(light);





// Boden

let ground=new THREE.Mesh(

new THREE.PlaneGeometry(1000,1000),

new THREE.MeshLambertMaterial({

color:0x228822

})

);


ground.rotation.x=-Math.PI/2;

scene.add(ground);





// Straße

let road=new THREE.Mesh(

new THREE.BoxGeometry(

30,

0.1,

1000

),

new THREE.MeshLambertMaterial({

color:0x333333

})

);


road.position.y=0.05;

scene.add(road);





// Auto


let data=cars[selectedCar];


let car=new THREE.Mesh(

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

5,

10

);



let keys={};

let speed=0;



document.addEventListener("keydown",function(e){

keys[e.key.toLowerCase()]=true;

});


document.addEventListener("keyup",function(e){

keys[e.key.toLowerCase()]=false;

});





function animate(){


requestAnimationFrame(animate);



if(keys["w"]){

speed=data.speed;

}


else{

speed*=0.95;

}



if(keys["s"]){

speed=-0.15;

}





if(keys["a"]){

car.rotation.y+=0.04;

}



if(keys["d"]){

car.rotation.y-=0.04;

}



car.translateZ(speed);





camera.position.lerp(

new THREE.Vector3(

car.position.x,

car.position.y+5,

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


}
