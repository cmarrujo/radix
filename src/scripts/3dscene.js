import { TimelineLite, CSSPlugin, AttrPlugin, Power1 } from "gsap/all";
import { Power0 } from 'gsap';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import textureWallNormalMap from '../images/pano-background-wall-1.jpg';
import textureWallNormalMapRight from '../images/pano-background-wall-2.jpg';
import textureWallNormalMapleft from '../images/pano-background-wall-4.jpg';
import textureWallNormalMapBack from '../images/pano-background-wall-3.jpg';
import autoprefixer from "autoprefixer";

class RDX3D {
  constructor() {
    this.init3DScene();
    this.orbsInteraction();
    this.counter = 0;
    this.panoCount = 0;
  }

  orbsInteraction = () => {
    const orbs = [].slice.call(document.querySelectorAll('.rdx-orbs--point'));
    const modal = document.querySelector('.rdx-modal') && document.querySelector('.rdx-modal');
    let modalImage = document.querySelector('.rdx-modal--content_image') && document.querySelector('.rdx-modal--content_image');
    let modalTitle = document.querySelector('.rdx-modal--content_copy-header') && document.querySelector('.rdx-modal--content_copy-header');
    let modalText = document.querySelector('.rdx-modal--content_copy-text') && document.querySelector('.rdx-modal--content_copy-text');
    let modalUrl = document.querySelector('.rdx-modal--content_copy .-cta.btn') && document.querySelector('.rdx-modal--content_copy .-cta.btn');
    const modalExit = document.querySelector('.rdx-modal--exit') && document.querySelector('.rdx-modal--exit');

    if(orbs.length) {
      orbs.forEach((orb) => {
        orb.addEventListener('click', (evt) => {
          const id = evt.target.getAttribute('data-id');

          modal.setAttribute('data-active', 'true');

          modalImage.style.background = `url('${data[this.panoCount].plane[id].image}') top center no-repeat`;
          modalImage.style.backgroundSize = `cover`;
          modalTitle.innerHTML = data[this.panoCount].plane[id].title;
          modalText.innerHTML = data[this.panoCount].plane[id].text;
          modalUrl.setAttribute('href', `${data[this.panoCount].plane[id].url}`);
        });
      });
    }

    if(modalExit) {
      modalExit.addEventListener('click', (evt) => {
        modal.setAttribute('data-active', 'false');
      });
    }
  }

  init3DScene = () => {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer();
    let geometry = null;
    let material = null

    let backWallNormalMap;
    let rightWallNormalMap;
    let leftWallNormalMap;
    let frontWallNormalMap;
    
    let textureLoader = new THREE.TextureLoader();
    backWallNormalMap = new textureLoader.load(`${textureWallNormalMap}`);
    rightWallNormalMap = new textureLoader.load(`${textureWallNormalMapRight}`);
    leftWallNormalMap = new textureLoader.load(`${textureWallNormalMapleft}`);
    frontWallNormalMap = new textureLoader.load(`${textureWallNormalMapBack}`);

    renderer.setSize( window.innerWidth, window.innerHeight );
    window.addEventListener('resize', () => {
      renderer.setSize( window.innerWidth, window.innerHeight );
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    let ambientLight = new AmbientLight(0xffffff, .65);
    scene.add(ambientLight);
    
    let light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = .01;
    light.shadow.camera.far = 25;
    scene.add(light);

    geometry = new THREE.PlaneGeometry( 44, 44, 64, 64 );
    material = new THREE.MeshBasicMaterial( {
      color: 0x008efc, 
      opacity: .15,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: true
    } );
    let plane = new THREE.Mesh( geometry, material );
    scene.add( plane );

    plane.rotation.x = (Math.PI / 2);
    plane.position.y -= 14.75;
    plane.position.z += 4;
    
    geometry = new THREE.PlaneGeometry( 44, 44, 64, 64 );
    material = new THREE.MeshBasicMaterial( {
      color: 0x008efc, 
      opacity: .15,
      transparent: true,
      side: THREE.DoubleSide,
      wireframe: true
    } );
    let ceiling = new THREE.Mesh( geometry, material );
    scene.add( ceiling );

    ceiling.rotation.x = (Math.PI / 2);
    ceiling.position.y += 14.55;
    ceiling.position.z += 4;

    // Back Wall
    geometry = new THREE.PlaneGeometry( 50, 30, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: backWallNormalMap,
    });
    
    let back = new THREE.Mesh( geometry, material );
    scene.add( back );
    back.position.z -= 18.5;

    camera.position.x = 0;
    camera.position.y += 0;
    camera.position.z -= 2;
    
    // Right Wall
    geometry = new THREE.PlaneGeometry( 50, 31, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: rightWallNormalMap,
    });
    
    let right = new THREE.Mesh( geometry, material );
    scene.add( right );
    right.position.x += 23;
    right.rotation.y -= (Math.PI / 2);
    right.position.z += 3.40;
    
    // Left Wall
    geometry = new THREE.PlaneGeometry( 50, 31, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: leftWallNormalMap,
    });
    
    let left = new THREE.Mesh( geometry, material );
    scene.add( left );
    left.position.x -= 23;
    left.rotation.y += (Math.PI / 2);
    left.position.z += 4;
    
    // Front Wall
    geometry = new THREE.PlaneGeometry( 50, 32, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: frontWallNormalMap,
    });
    
    let front = new THREE.Mesh( geometry, material );
    scene.add( front );
    front.position.x = 0;
    front.rotation.y = -(Math.PI / 1);
    front.position.z += 28;

    let keyboard = {};
    
    function animate() {
      requestAnimationFrame( animate );

      if(keyboard[37]) {
        camera.rotation.y -= Math.PI * 0.005;
        console.log(camera.rotation.y);
      }
      
      if(keyboard[39]) {
        camera.rotation.y += Math.PI * 0.005;
        console.log(camera.rotation.y);
      }

      renderer.render( scene, camera );
    }

    const threeScene = document.querySelector('.rdx[data-three]') && document.querySelector('.rdx[data-three]');
    
    if(threeScene) {
      threeScene.appendChild( renderer.domElement );
    }

    animate();

    function keyDown(event) {
      keyboard[event.keyCode] = true;
    }
    
    function keyUp(event) {
      keyboard[event.keyCode] = false;
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    const controls = [].slice.call(document.querySelectorAll('.rdx-panoramic--bumper'));
    controls.forEach((control) => {
      control.addEventListener('click', (evt, index) => {
        const direction = control.getAttribute('data-dir');
        const orbsPoints = [].slice.call(document.querySelectorAll('.rdx-orbs--point'));

        if(direction === 'next') {
          const plugins = [ CSSPlugin, AttrPlugin ];
          const timeline = new TimelineLite();
    
          let tween = timeline.to(camera.rotation, 1, {
            y: (camera.rotation.y - (Math.PI / 2)),
            ease: Power1.easeOut
          });

          if(this.panoCount >= 3) {
            this.panoCount = 0;  
          }else {
            this.panoCount++;
          }

          if(orbsPoints.length) {
            orbsPoints.forEach((point, index) => {
              const p = point.getAttribute('data-detail');
              point.setAttribute('data-active', 'false');

              if(p === `${data[this.panoCount].plane[0].detail.toLowerCase()}`) {
                point.setAttribute('data-active', 'true');
              }else if(p === `${data[this.panoCount].plane[1].detail.toLowerCase()}`) {
                point.setAttribute('data-active', 'true');
              }
            });
          }

        }else if(direction === 'prev') {
          const plugins = [ CSSPlugin, AttrPlugin ];
          const timeline = new TimelineLite();
    
          let tween = timeline.to(camera.rotation, 1, {
            y: (camera.rotation.y + (Math.PI / 2)),
            ease: Power1.easeOut
          });

          if(this.panoCount <= 0) {
            this.panoCount = 3;  
          }else {
            this.panoCount--;
          }

          if(orbsPoints.length) {
            orbsPoints.forEach((point, index) => {
              const p = point.getAttribute('data-detail');
              point.setAttribute('data-active', 'false');
              
              if(p === `${data[this.panoCount].plane[0].detail.toLowerCase()}`) {
                point.setAttribute('data-active', 'true');
              }else if(p === `${data[this.panoCount].plane[1].detail.toLowerCase()}`) {
                point.setAttribute('data-active', 'true');
              }
            });
          }
        }
      });
    });

    const exploreCenter = document.querySelector('.btn[data-explore]') && document.querySelector('.btn[data-explore]');
    if(exploreCenter) {
      exploreCenter.addEventListener('click', (evt) => {
        evt.preventDefault();
  
        const plugins = [ CSSPlugin, AttrPlugin ];
        const timeline = new TimelineLite();
  
        let tween = timeline.to(camera.position, 1, {
          z: 4,
          ease: Power1.easeOut
        });
  
        const orbs = [].slice.call(document.querySelectorAll('.rdx-orbs--point'));
        if(orbs.length) {
          orbs[0].setAttribute('data-active', 'true');
          orbs[1].setAttribute('data-active', 'true');
        }
        
        const panoramic = document.querySelector('.rdx-panoramic') && document.querySelector('.rdx-panoramic');
        panoramic.setAttribute('data-active', 'true');

        const hiddenFigures = document.querySelectorAll('[data-hidden=false]');
        hiddenFigures.forEach((h) => {
          h.style.display = "none";
        });
  
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RDX3D();
});