import * as THREE from './three_module_min.js';
import {GLTFLoader} from './GLTFLoader.js';
import {OrbitControls} from './OrbitControls.js';

var scene = new THREE.Scene();
var loader = new GLTFLoader();

//Load gltf model
loader.load(
  './assets/js/retro_computer_model/scene.gltf',
  function(gltf){
    scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

    gltf.scene.scale.x = 12;
    gltf.scene.scale.y = 12;
    gltf.scene.scale.z = 12;

  },
  function ( error ) {
		console.log('error');
	}
);

// Configure renderer size
var div = document.querySelector('.home__img');
var div_height = div.offsetHeight;
var div_width = div.offsetWidth;

// Create a basic perspective camera
var target = new THREE.Vector3(-0.5, 1.2, 0);
var intialPos = new THREE.Vector3(
  20* Math.sin(0.2 * Math.PI),
  10,
  20 * Math.cos(0.2 * Math.PI)
);
var scale = div_height * 0.005 + 4.8;
var canvas = document.getElementById('model');
var camera = new THREE.OrthographicCamera(
  -scale,
  scale,
  scale + 2,
  -scale + 2,
  0.01,
  50000
);
camera.position.copy(intialPos);
camera.lookAt(target);


var amibientLight = new THREE.AmbientLight(0xcccccc, 1);
amibientLight.castShadow = true;
scene.add(amibientLight);

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true},{alpha:true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(div_width,div_height);
renderer.outputEncoding = THREE.sRGBEncoding;
canvas.appendChild( renderer.domElement );

// Configure renderer clear color
renderer.setClearColor("#000000",0);

var control = new OrbitControls(camera, renderer.domElement);
control.autoRotate=true;
control.target = target;

console.log(window.innerWidth);

console.log(div_height,div_width);

// Render Loop
var render = function () {
  requestAnimationFrame( render );
 
  control.update();  
  camera.lookAt(target);
  renderer.render(scene, camera);
};

render()