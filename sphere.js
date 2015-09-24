var boidAnimation = {
	Particle: function(x, y, z, radius, color) {
		this.x = x;
		this.y = y;
		this.z = z;
    this.flag = false;
		this.geometry = new THREE.SphereGeometry(radius, 8, 8);
		this.material = new THREE.MeshBasicMaterial({ color: color ,wireframe:true});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.rotSpeed = 0.02 + Math.random() * .01;
		this.putInPlace = function() {
			this.mesh.position.set(this.x, this.y, this.z);
		};
	},
	init: function() {
		boidAnimation.scene = new THREE.Scene();
		boidAnimation.W =  window.innerWidth;
		boidAnimation.H = window.innerHeight;
		boidAnimation.camera = new THREE.PerspectiveCamera(45, boidAnimation.W / boidAnimation.H, 0.01, 1000);
		boidAnimation.renderer = new THREE.WebGLRenderer();
		boidAnimation.particles = [];

		boidAnimation.renderer.setClearColor(0x17293a);
		boidAnimation.renderer.setSize(boidAnimation.W, boidAnimation.H);

		boidAnimation.mainSphere = new THREE.Mesh(new THREE.SphereGeometry(40, 20, 20), new THREE.MeshBasicMaterial({color: "red", wireframe: true}));
		boidAnimation.mainSphere.position.set(0, 0, 0);
    // console.log('scene.position:', boidAnimation.scene.position);
    boidAnimation.scene.add(boidAnimation.mainSphere);

		boidAnimation.camera.position.set(0, 50, 100);
		boidAnimation.camera.lookAt(new THREE.Vector3(0, 0, 0));

	 // console.log(boidAnimation.renderer.domElement);
    document.body.appendChild(boidAnimation.renderer.domElement);

		boidAnimation.makeParticles(50);

		boidAnimation.render();
	},
	makeParticles: function(num) {
     // console.log(boidAnimation.mainSphere.geometry.boundingSphere);

    var radius = boidAnimation.mainSphere.geometry.boundingSphere.radius,
			particle;
		for (var i = 0; i <= num; i++) {
			if (i % 2 === 0) {
				particle = new boidAnimation.Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, 3.5, 0xe74c3c);
        if (i == 0) console.log(particle);
      } 
      else {
        particle = new boidAnimation.Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, 3.5, 0xf39c12);
			}
			particle.putInPlace();
			particle.mesh.position.normalize();
      // particle.mesh.position.set(0.1, 0.1, 0.1);
			particle.mesh.position.multiplyScalar(radius);
			boidAnimation.scene.add(particle.mesh);
			boidAnimation.particles.push(particle);
		}
	},
	updateParticles: function(p) {
		var x = p.mesh.position.x,
			y = p.mesh.position.y,
			z = p.mesh.position.z;
    // console.log(x,y,z);
    p.mesh.position.x = x * Math.cos(p.rotSpeed) + z * Math.sin(p.rotSpeed);
		p.mesh.position.z = z * Math.cos(p.rotSpeed) - x * Math.sin(p.rotSpeed);
    if (!p.flag)  {
      console.log(p.mesh.position.x, p.mesh.position.z, p.rotSpeed);
      p.flag = true;
    }
	},
	render: function() {		boidAnimation.particles.forEach(boidAnimation.updateParticles);
		boidAnimation.renderer.render(boidAnimation.scene, boidAnimation.camera);
		requestAnimationFrame(boidAnimation.render);	
                      
	}
};

window.onload = boidAnimation.init;
