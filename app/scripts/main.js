document.addEventListener("DOMContentLoaded", function(event) {

  console.log("Hello BabylonJS");

  // Get the canvas element from our HTML above
  var canvas = document.querySelector("#render");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);

	// This begins the creation of a function that we will 'call' just after it's built
  var createScene = function () {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to black.
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // This creates and positions a free camera
		 var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    light.intensity = 5;

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
		var dim = 3
		for (var x = 0; x < dim; x++) {
			for (var y = 0; y < dim; y++) {
				for (var z = 0; z < dim; z++) {
					var sphere = BABYLON.Mesh.CreateSphere("sphere"+x+y+z, 16, 0.1, scene);
					sphere.position={x : x, y : y, z: z}
		}
	}
}



    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Leave this function
    return scene;

  };  // End of createScene function

  var scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });

});
