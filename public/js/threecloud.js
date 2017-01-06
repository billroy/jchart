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
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 2, 5000 );
    camera.position.y = 200;
    camera.position.z = 2000;
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
    geometry = new THREE.Geometry();
    sprite = new THREE.TextureLoader().load( "/js/three.js/examples/textures/sprites/disc.png" );

    // points and labels
    if (chartData && chartData.points) chartData.points.forEach(function(point) {
        var vertex = new THREE.Vector3(point.x, point.y, point.z || 0);
        geometry.vertices.push(vertex);

        var spritey = makeTextSprite(point.name, {
            fontsize: 24,
            borderColor: point.color,           // {r:255, g:0, b:0, a:1.0},
            backgroundColor: {r:32, g:32, b:32, a:0.8}
        });
        spritey.position.set(point.x, point.y, point.z || 0);
        scene.add( spritey );
    });

    material = new THREE.PointsMaterial( {
        map: sprite,
        size: 35,
        sizeAttenuation: true,
        alphaTest: 0.5,
        transparent: true,
        color: 'green'
    } );
    //material.color.setHSL( 1.0, 0.3, 0.7 );
    particles = new THREE.Points( geometry, material );
    scene.add( particles );

    // lines
    function randomPoint() {
        var point = chartData.points[Math.floor(Math.random() * chartData.points.length)];
        return new THREE.Vector3(point.x, point.y, point.z);
    }
    var line_material = new THREE.LineBasicMaterial({color: 0x202020, opacity: 0.01});
    if (0 && chartData) for (var i=0; i < chartData.length; i++) {
        var line_geometry = new THREE.Geometry();
        line_geometry.vertices.push(randomPoint(), randomPoint());
        var line_layer = new THREE.Line(line_geometry, line_material);
        scene.add(line_layer);
    }

    // axes
    function drawAxis(x, y, z, color) {
        var axis_material = new THREE.LineBasicMaterial({color: color, opacity: .5});
        var axis_geometry = new THREE.Geometry();
        var start = new THREE.Vector3(0, 0, 0);
        var end = new THREE.Vector3(x, y, z);
        axis_geometry.vertices.push(start, end);
        var axis_layer = new THREE.Line(axis_geometry, axis_material);
        scene.add(axis_layer);
    }
    drawAxis(1000, 0, 0, 'red');
    drawAxis(0, 1000, 0, 'green');
    drawAxis(0, 0, 1000, 'blue');

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
    //controls.minDistance = -Infinity;
    controls.addEventListener( 'change', render );
}

function makeTextSprite( message, parameters ) {
	if ( parameters === undefined ) parameters = {};

	var fontface = parameters.hasOwnProperty("fontface") ?
		parameters["fontface"] : "Arial";

	var fontsize = parameters.hasOwnProperty("fontsize") ?
		parameters["fontsize"] : 18;

	var borderThickness = parameters.hasOwnProperty("borderThickness") ?
		parameters["borderThickness"] : 4;

	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

	//var spriteAlignment = THREE.SpriteAlignment.topLeft;

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;

	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;

	// background color
    if (typeof(backgroundColor) == 'object') {
    	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
    								  + backgroundColor.b + "," + backgroundColor.a + ")";
    }
    else context.fillStyle = backgroundColor;

	// border color
    if (typeof(borderColor) == 'object') {
    	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
    								  + borderColor.b + "," + borderColor.a + ")";
    }
    else context.strokeStyle = borderColor;

	context.lineWidth = borderThickness;
	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.

	// text color
	//context.fillStyle = "rgba(0, 0, 0, 1.0)";
    context.fillStyle = "rgba(255, 255, 255, 0.8)";

	context.fillText( message, borderThickness, fontsize + borderThickness);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas)
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        //useScreenCoordinates: false,
        //alignment: spriteAlignment
        // TODO: fog: true
    });
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1.0);
	return sprite;
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();
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
