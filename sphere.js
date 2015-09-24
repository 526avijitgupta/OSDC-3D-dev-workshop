var VIEW_ANGLE = 45;
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ASPECT = WIDTH/HEIGHT,
    NEAR = 0.1,
    FAR = 1000;

// light source materials:
// MeshLambertMaterial, MeshPhongMaterial
var material = 'MeshLambertMaterial';

window.onload = function(){
  // scene, camera, renderer
  var scene = new THREE.Scene();
  
  var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,  ASPECT, NEAR, FAR
  );
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE);  // background color
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;  // enable shadows
  
  // axes
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);
  
  // plane
  var planeGeo = new THREE.PlaneGeometry(60,20);
  var planeMat = new THREE[material]({color:0xffffff});
  var plane = new THREE.Mesh(planeGeo, planeMat);
  scene.add(plane);
  
  plane.rotation.x = -0.5*Math.PI;
  plane.position.set(15,0,0);
  plane.receiveShadow = true;
  
  // cube
  var cubeGeo = new THREE.CubeGeometry(4,4,4);
  var cubeMat = new THREE[material]({color:0xff0000});
  var cube = new THREE.Mesh(cubeGeo, cubeMat);
  scene.add(cube);
  
  cube.position.set(-4,3,0);
  cube.castShadow = true;
  
  // sphere
  var sphereGeo = new THREE.SphereGeometry(4,20,20);
  var sphereMat = new THREE[material]({color:0x7777ff});
  var sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);
  
  sphere.position.set(20,4,2);
  sphere.castShadow = true;
  
  // camera position
  camera.position.set(-30,40,30);
  camera.lookAt(scene.position);
  
  // light source
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40,60,-10);
  scene.add(spotLight);
  
  spotLight.castShadow = true;
  
  // render
  document.body.appendChild(renderer.domElement);
  render();
  
  var t = 0;
  
  // render function
  function render(){
    // rotate cube
    cube.rotation.y += 0.02;
    
    // bouncing ball
    t += 0.04;
    sphere.position.x = 20 + 10*Math.cos(t);
    sphere.position.y = 2 + 10*Math.abs(Math.sin(t));
    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
};

