document.addEventListener("DOMContentLoaded", function(event) {

    // Get the canvas element from our HTML above
    var canvas = document.querySelector("#render");

    // Load the BABYLON 3D engine
    var engine = new BABYLON.Engine(canvas, true);

    // This begins the creation of a function that we will 'call' just after it's built
    var createScene = function() {

        var scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 7, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setTarget(new BABYLON.Vector3(-0.5,-0.5,-0.5));
        camera.attachControl(canvas, false);

        var dim = 2
        for (var x = 0; x < dim; x++) {
            for (var y = 0; y < dim; y++) {
                for (var z = 0; z < dim; z++) {

                    var offset = dim / 2

                    // Set up random bulb color
                    //var randomColor = new BABYLON.Color3.Random()
                    var randomColor = new BABYLON.Color3(1,1,0,1)

                    // Create bulb body
                    var bulb = BABYLON.Mesh.CreateSphere(x+""+y+z, 16, 0.1, scene);
                    bulb.position = {
                        x: -(offset) + x,
                        y: -(offset) + y,
                        z: -(offset) + z
                    }

                    // Set "skin" of bulb to appear lit, even when there is no light on it
                    bulb.material = new BABYLON.StandardMaterial('LED', scene);
                    bulb.material.emissiveColor = randomColor

                    // Create light inside body such that bulb lights other objects
                    var bulbLight = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 0, 0), scene);
                    bulbLight.parent = bulb;
                    bulbLight.intensity = 0
                    bulbLight.position.copyFrom(bulb.position);

                }
            }
        }
        //scene.getMeshByName("000").isVisible = false
        scene.getMeshByName("000").material.emissiveColor = new BABYLON.Color3(1,0,0,1)
        scene.getMeshByName("000")._children[0].diffuse = new BABYLON.Color3(1,0,0,1)
        scene.getMeshByName("000")._children[0].specular = new BABYLON.Color3(1,0,0,1)

        return scene;

    }

    var scene = createScene();

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });

});
