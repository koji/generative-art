let container;
let camera, scene, renderer;
let uniforms;
let gui = new dat.GUI();

let stats = new Stats();
document.body.appendChild(stats.dom);

init();
animate();

function addControlGui(controlObject) {
    gui.add(controlObject, 'floatVal1', -15.0, 15.0).onChange(updateVal);
    //gui.add(controlObject, 'opacity', -1.00, 1.00);
}

function updateVal() {
    uniforms.floatVal1.value = control.floatVal1
}


function init() {
    container = document.getElementById('container');
    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    control = new function () {
        this.floatVal1 = 15.0;
        //this.opacity = 0.6;
    };
    addControlGui(control);



    let geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        //v_texcoord: { type: 'v2', value: new THREE.Vector2() }
        floatVal1: { type: 'f', value: control.floatVal1 },
        pos: { type: 'v2', value: new THREE.Vector2() }
    }

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.onmousemove = function (e) {
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
    }
}

function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
    stats.update();
    requestAnimationFrame(animate);
    render();
}

function render() {
    uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}
