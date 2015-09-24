window.onload = function() {
  var ww = window.innerWidth,
      wh = window.innerHeight;

  function init(){
    /* WEBGL RENDERER */
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(ww,wh);
    document.body.appendChild( renderer.domElement );

    /* SCENE */
    scene = new THREE.Scene();

    /* CAMERA */
    camera = new THREE.PerspectiveCamera(50, ww/wh, 1, 10000 );
    camera.position.set(0, 0, 700);
    scene.add(camera);

    /* LIGHT */
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set( 0, 250, 700 );
    scene.add(light);

    createBox();

    renderer.render(scene,camera);

    animate();
  };

  function createBox(){
    THREE.ImageUtils.crossOrigin = '';

    elements = new THREE.Object3D();

    /* SIMPLE SPHERE WITH BASIC TEXTURE */

    //Create a sphere
    geometry = new THREE.SphereGeometry(150,32,32);
    //Create a texture that contains the 'picture' of the moon
    texture  =  THREE.ImageUtils.loadTexture( "earth.png" );
    texture.minFilter = THREE.LinearFilter;
    //Create a Lambert Material with the moon as the 'map'
    material = new THREE.MeshLambertMaterial({map : texture});
    bump  =	THREE.ImageUtils.loadTexture( "earthBump.png" );
    bump.minFilter = THREE.LinearFilter;
    //Create the same material than moon2 but with a map
    material = new THREE.MeshPhongMaterial({
      shininess  :  30,
      bumpMap    :  bump,
      map        :  texture,
      bumpScale  :  6,
    });

    moon3 = new THREE.Mesh(geometry, material);
    moon3.rotation.z = Math.PI/8;
    moon3.position.x = 0;
    elements.add(moon3);

    scene.add(elements);
  };

  var animate = function () {
    moon3.rotation.y += .01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  init();
  document.addEventListener("keydown", function(evt) {
    if(evt.keyCode === 37)
      camera.position.x -= 30;
    else if(evt.keyCode === 39)
      camera.position.x += 30;
    else if(evt.keyCode === 38)
      camera.position.y += 30;
    else if(evt.keyCode === 40)
      camera.position.y -= 30;
  })
};
