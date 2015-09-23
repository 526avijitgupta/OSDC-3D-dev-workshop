window.onload = function() {
  var ww = window.innerWidth,
      wh = window.innerHeight;

  function init(){

    /* WEBGL RENDERER */
    renderer = new THREE.WebGLRenderer({canvas : document.getElementById('scene')});
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x3F3F3F);
    renderer.setSize(ww,wh);

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
    //To allow CrossOrigin
    THREE.ImageUtils.crossOrigin = '';

    elements = new THREE.Object3D();

    /* SIMPLE SPHERE WITH BASIC TEXTURE */

    //Create a sphere
    geometry = new THREE.SphereGeometry(150,32,32);
    //Create a texture that contains the 'picture' of the moon
    texture  =  THREE.ImageUtils.loadTexture( "http://mamboleoo.be/learnThree/img/moon.jpg" );
    texture.minFilter = THREE.LinearFilter;
    //Create a Lambert Material with the moon as the 'map'
    material = new THREE.MeshLambertMaterial({map : texture});
    moon1 = new THREE.Mesh(geometry, material);
    moon1.position.x = -350;
    //Add Jupiter in our Object 3D
    elements.add(moon1);


    /* SAME SPHERE WITH ONLY BUMP */

    //Create a bump map which create a effect of depth but without creating new polygons
    bump  =	THREE.ImageUtils.loadTexture( "http://mamboleoo.be/learnThree/img/moonBump.jpg" );
    bump.minFilter = THREE.LinearFilter;
    //Create a Phong Material with the bump and shininess of my sphere
    material = new THREE.MeshPhongMaterial({
      shininess  :  30,
      bumpMap    :  bump,
      bumpScale  :  6,
    });

    moon2 = new THREE.Mesh(geometry, material);
    moon2.rotation.z = Math.PI/8;
    elements.add(moon2);

    /* SAME SPHERE WITH BUMP AND THE TEXTURE */

    //Create a bump map which create a effect of depth but without creating new polygons
    bump  =	THREE.ImageUtils.loadTexture( "http://mamboleoo.be/learnThree/img/moonBump.jpg" );
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
    moon3.position.x = 350;
    elements.add(moon3);

    scene.add(elements);

  };

  var animate = function () {
    moon1.rotation.y += .01;
    moon2.rotation.y += .01;
    moon3.rotation.y += .01;

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

  };

  init();
};
