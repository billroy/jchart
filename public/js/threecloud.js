//if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats;
var camera, scene, renderer, particles, geometry, material, i, h, color, sprite, size;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
//init();
//animate();
function init(chartData) {
    //container = document.createElement( 'div' );
    //document.body.appendChild( container );
    container = document.getElementById('chart');
    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 2, 5000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    geometry = new THREE.Geometry();
    sprite = new THREE.TextureLoader().load( "/js/three.js/examples/textures/sprites/disc.png" );
    //for ( i = 0; i < 10000; i ++ ) {
    //    var vertex = new THREE.Vector3();
    //    vertex.x = 2000 * Math.random() - 1000;
    //    vertex.y = 2000 * Math.random() - 1000;
    //    vertex.z = 2000 * Math.random() - 1000;
    //    geometry.vertices.push( vertex );
    //}

    if (chartData) chartData.forEach(function(point) {
        var vertex = new THREE.Vector3();
        vertex.x = point.x;
        vertex.y = point.y;
        vertex.z = point.z;
        geometry.vertices.push(vertex);
    });

    material = new THREE.PointsMaterial( {
        map: sprite,
        size: 35,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true
    } );
    material.color.setHSL( 1.0, 0.3, 0.7 );
    particles = new THREE.Points( geometry, material );
    scene.add( particles );
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    //
    stats = new Stats();
    container.appendChild( stats.dom );
    //
    //document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    //document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );

    // trackball controls
    controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseDown( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
//
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
    controls.update();
}
function render() {
    //var time = Date.now() * 0.00005;
    //camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    //camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    //camera.lookAt( scene.position );
    //h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    //material.color.setHSL( h, 0.5, 0.5 );
    renderer.render( scene, camera );
}
