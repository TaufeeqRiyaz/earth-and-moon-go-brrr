var spaceScene = new THREE.Scene();
var spaceCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100000);
var spaceRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
var spaceControls = new THREE.OrbitControls(spaceCamera, spaceRenderer.domElement);

spaceRenderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(spaceRenderer.domElement);
var spaceLoadingImage = document.getElementById("loading_image_page");

spaceCamera.position.x = 2200;
spaceCamera.position.y = 500;
spaceCamera.position.z = 1500;
spaceCamera.lookAt(-8, 0, 0);
spaceCamera.zoom = 40;

var earth;
var earthRadius = 30;
var earthGeometry = new THREE.SphereGeometry(earthRadius, 50, 50);
var earthSurfaceImage = './earth.jpg';
var earthTextureLoader = new THREE.TextureLoader();
earthTextureLoader.crossOrigin = true;
earthTextureLoader.load(earthSurfaceImage, function(texture) {
  var material = new THREE.MeshLambertMaterial({map: texture});
  earth = new THREE.Mesh(earthGeometry, material);
  earth.position.x = -15;
  earth.rotation.y = -1.8;
  spaceScene.add(earth);
});

var moon;
var moonRadius = earthRadius * .2725;
var moonGeometry = new THREE.SphereGeometry(moonRadius, 50, 50);
var moonTextureImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg';
var moonTextureLoader = new THREE.TextureLoader();
moonTextureLoader.crossOrigin = true;
moonTextureLoader.load(moonTextureImage, function(texture) {
  var moonMaterial = new THREE.MeshLambertMaterial({map: texture});
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.x = 37;
  moon.rotation.y = 1.8;
  spaceScene.add(moon);
});

var lightAmbient = new THREE.AmbientLight(0xffffff, 1);
spaceScene.add(lightAmbient);
var lightPoint1 = new THREE.PointLight(0xcccccc, .5, 0, 0);
lightPoint1.position.set(25, 25, 1000);
spaceScene.add(lightPoint1);
var lightPoint2 = new THREE.PointLight(0xbbbbbb, .2, 0, 0);
lightPoint2.position.set(-25, 25, -1000);
spaceScene.add(lightPoint2);

function displayLoadingImageIfDocumentNotReady() {
  document.onreadystatechange = () => {
    if (document.readyState === "complete") {
      setTimeout(function(){ spaceLoadingImage.style.visibility = "hidden"; }, 1000);
    }
  }
}

function render() {
  requestAnimationFrame(render);
  earth.rotation.y += 0.002;
  moon.rotation.y += 0.002;
  spaceCamera.updateProjectionMatrix();
  spaceRenderer.render(spaceScene, spaceCamera);
};

displayLoadingImageIfDocumentNotReady();
render();

window.addEventListener('resize', function() {
  spaceCamera.aspect = window.innerWidth / window.innerHeight;
  spaceCamera.updateProjectionMatrix();
  spaceRenderer.setSize(window.innerWidth, window.innerHeight);
}, false);
