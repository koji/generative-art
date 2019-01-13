let container;
let camera, scene, renderer;
let uniforms;
let gui = new dat.GUI();

let stats = new Stats();
document.body.appendChild(stats.dom);

init();
animate();

function addControlGui(controlObject) {
    gui.add(controlObject, 'u_slider1', 0.0, 1.0, 0.01).onChange(updateVal);
    gui.add(controlObject, 'u_slider2', .0, 1.0, 0.01).onChange(updateVal);
    gui.add(controlObject, 'u_slider3', .0, 1.0, 0.01).onChange(updateVal);
    gui.add(controlObject, 'u_slider4', 0.0, 5.0, 0.01).onChange(updateVal);
    gui.add(controlObject, 'u_slider5', 0.0, 5.0, 0.01).onChange(updateVal);
    gui.add(controlObject, 'u_slider6', 0.0, 10.0, 0.1).onChange(updateVal);
    //gui.add(controlObject, 'opacity', -1.00, 1.00);
}

function updateVal() {
    uniforms.u_slider1.value = control.u_slider1
    uniforms.u_slider2.value = control.u_slider2
    uniforms.u_slider3.value = control.u_slider3
    uniforms.u_slider4.value = control.u_slider4
    uniforms.u_slider5.value = control.u_slider5
    uniforms.u_slider6.value = control.u_slider6
}


function init() {
    container = document.getElementById('container');
    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();

    control = new function () {
        this.u_slider1 = 1.0;
        this.u_slider2 = 1.0;
        this.u_slider3 = 1.0;
        this.u_slider4 = 1.0;
        this.u_slider5 = .5;
        this.u_slider6 = 5.5;
        //this.opacity = 0.6;
    };
    addControlGui(control);



    let geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        //v_texcoord: { type: 'v2', value: new THREE.Vector2() }
        //floatVal1: { type: 'f', value: control.floatVal1 },
        pos: { type: 'v2', value: new THREE.Vector2() },
        u_slider1: { type: 'f', value: control.u_slider1 },
        u_slider2: { type: 'f', value: control.u_slider2 },
        u_slider3: { type: 'f', value: control.u_slider3 },
        u_slider4: { type: 'f', value: control.u_slider4 },
        u_slider5: { type: 'f', value: control.u_slider5 },
        u_slider6: { type: 'f', value: control.u_slider6 },

    }

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    const mesh = new THREE.Mesh(geometry, material);
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
