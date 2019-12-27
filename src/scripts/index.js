import { TimelineLite, CSSPlugin, AttrPlugin, Power1 } from "gsap/all";
import { Power0 } from 'gsap';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import '../stylesheets/style.scss';
import textureWallNormalMap from '../images/pano-background-Artboard1.jpg';
import textureWallNormalMapRight from '../images/pano-background-Artboard2.jpg';
import textureWallNormalMapleft from '../images/pano-background-Artboard4.jpg';
import textureWallNormalMapBack from '../images/pano-background-Artboard3.jpg';

class RDX {
  constructor() {
    this.preloader();
    this.showMenu();
    this.initVideoPlayer();
    this.initTrigger();
    this.initSplit();
    this.initFull();
    this.initActionStrip();
    this.init3DScene();
    this.logoHandler();
  }

  logoHandler = () => {
    const logo = document.querySelector('.rdx-logo');
    logo.addEventListener('click', (e) => {
      window.location.href = 'https://studiosupermassive.com/radix/';
    });
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
    
    let light = new THREE.PointLight(0xffffff, .8, 50);
    light.position.set(-3, 6, -3);
    light.castShadow = true;
    light.shadow.camera.near = .01;
    light.shadow.camera.far = 25;
    scene.add(light);
    
    // Back Wall
    geometry = new THREE.PlaneGeometry( 60, 32, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: backWallNormalMap,
    });
    
    let back = new THREE.Mesh( geometry, material );
    scene.add( back );
    back.position.z -= 20;

    camera.position.x = 0;
    camera.position.y += 0;
    camera.position.z += 0;
    
    // Right Wall
    geometry = new THREE.PlaneGeometry( 60, 32, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: rightWallNormalMap,
    });
    
    let right = new THREE.Mesh( geometry, material );
    scene.add( right );
    right.position.x += 30;
    right.rotation.y -= (Math.PI / 2);
    right.position.z += 10;
    
    // Left Wall
    geometry = new THREE.PlaneGeometry( 60, 32, 64, 64 );
    material = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      wireframe: false,
      map: leftWallNormalMap,
    });
    
    let left = new THREE.Mesh( geometry, material );
    scene.add( left );
    left.position.x -= 30;
    left.rotation.y += (Math.PI / 2);
    left.position.z += 10;
    
    // Front Wall
    geometry = new THREE.PlaneGeometry( 60, 32, 64, 64 );
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
    front.position.z += 40;

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

    document.querySelector('.rdx').appendChild( renderer.domElement );

    animate();

    function keyDown(event) {
      keyboard[event.keyCode] = true;
    }
    
    function keyUp(event) {
      keyboard[event.keyCode] = false;
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    const exploreCenter = document.querySelector('.btn[data-explore]') && document.querySelector('.btn[data-explore]');
    if(exploreCenter) {
      exploreCenter.addEventListener('click', (evt) => {
        evt.preventDefault();
  
        const plugins = [ CSSPlugin, AttrPlugin ];
        const timeline = new TimelineLite();
  
        let tween = timeline.to(camera.position, 1, {
          z: 10,
          ease: Power1.easeOut
        });
  
        const hiddenFigures = document.querySelectorAll('[data-hidden=false]');
        hiddenFigures.forEach((h) => {
          h.style.display = "none";
        });
  
      });
    }
  }

  initTrigger = () => {
    // init controller
    let controller = new ScrollMagic.Controller();
    const rdxPillars = [].slice.call(document.querySelectorAll('.rdx-pillars--image'));
    const offset = 400;

    if(rdxPillars.length) {
      rdxPillars.forEach((pillar) => {
        // create a scene
        let scene = new ScrollMagic.Scene({
          triggerElement: pillar,
          offset: `-${offset}px`,
          reverse: false
        })
        // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
        .setClassToggle(pillar, 'fade-in')
        .addTo(controller);
      });
    }
  }
  
  initSplit = () => {
    // init controller
    let controller = new ScrollMagic.Controller();
    const rdxSplitImage = [].slice.call(document.querySelectorAll('.rdx-split--content_image'));
    const rdxSplitDesc = [].slice.call(document.querySelectorAll('.rdx-split--content_desc'));
    const offset = 400;

    if(rdxSplitImage.length) {
      rdxSplitImage.forEach((image) => {
        // create a scene
        const scene = new ScrollMagic.Scene({
          triggerElement: image,
          offset: `-${offset}px`,
          reverse: false
        })
        // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
        .setClassToggle(image, 'fade-in')
        .addTo(controller);
      });
    }
    
    if(rdxSplitImage.length) {
      rdxSplitDesc.forEach((desc) => {
        // create a scene
        const scene = new ScrollMagic.Scene({
          triggerElement: desc,
          offset: `-${offset}px`,
          reverse: false
        })
        // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
        .setClassToggle(desc, 'fade-in')
        .addTo(controller);
      });
    }
  }
  
  initFull = () => {
    // init controller
    let controller = new ScrollMagic.Controller();
    const rdxFullImage = [].slice.call(document.querySelectorAll('.rdx-full--content_image'));
    const rdxFullWrapper = [].slice.call(document.querySelectorAll('.rdx-full--content_image-wrapper'));
    const offset = 400;

    rdxFullImage.forEach((image) => {
      // create a scene
      const scene = new ScrollMagic.Scene({
        triggerElement: image,
        offset: `-${offset}px`,
        reverse: false
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(image, 'fade-in')
      .addTo(controller);
    });
    
    rdxFullWrapper.forEach((desc) => {
      // create a scene
      const scene = new ScrollMagic.Scene({
        triggerElement: desc,
        offset: `-${offset}px`,
        reverse: false
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(desc, 'fade-in')
      .addTo(controller);
    });
  }
  
  initActionStrip = () => {
    // init controller
    let controller = new ScrollMagic.Controller();
    const rdxActionStrip = document.querySelector('.rdx-action--strip');
    const rdxActionText = document.querySelector('.rdx-action--text');
    const rdxActionButton = document.querySelector('.btn.-line.-dark');
    const rdxFooter = document.querySelector('.rdx-footer');
    const offset = 400;

    // create a scene

    if(rdxActionStrip) {
      const scene = new ScrollMagic.Scene({
        triggerElement: rdxActionStrip,
        offset: `-${offset}px`
      })
      .setClassToggle(rdxActionStrip, 'fade-in')
      .addTo(controller);
    }
    
    if(rdxFooter) {
      // create a scene
      const scene = new ScrollMagic.Scene({
        triggerElement: rdxFooter,
        offset: `-600px`
      })
      .setClassToggle(rdxFooter, 'fade-in')
      .addTo(controller);
    }
  }

  animateMainBanner = () => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    const timeline = new TimelineLite();

    const fitness = document.querySelector('.rdx-header--pillar.-fitness') && document.querySelector('.rdx-header--pillar.-fitness');
    if(fitness) {
      let tween = timeline.from(fitness, 1, {
        opacity: 0,
        x: 50,
        ease: Power1.easeOut
      });
    }
    
    const enhancement = document.querySelector('.rdx-header--pillar.-enhancement') && document.querySelector('.rdx-header--pillar.-enhancement');
    if(enhancement) {
      let tween = timeline.from(enhancement, 1, {
        opacity: 0,
        x: -50,
        ease: Power1.easeOut
      }, '-=.5');
    }
    
    const center = document.querySelector('.rdx-header--pillar.-center') && document.querySelector('.rdx-header--pillar.-center');
    if(center) {
      let tween = timeline.from(center, 1, {
        opacity: 0,
        x: 50,
        ease: Power1.easeOut
      }, '-=.5');
    }
    
    const content = document.querySelector('.rdx-content--wrapper') && document.querySelector('.rdx-content--wrapper');
    if(content) {
      let tween = timeline.from(content, 1, {
        opacity: 0,
        y: 25,
        ease: Power1.easeOut
      }, '-=.75');
    }
    
    const social = document.querySelector('.rdx-social') && document.querySelector('.rdx-social');
    if(social) {
      let tween = timeline.from(social, 1, {
        opacity: 0,
        y: 25,
        ease: Power1.easeOut
      }, '-=.75');
    }
  }

  animateBanner = () => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    const timeline = new TimelineLite();

    const banner = document.querySelector('.rdx-banner--full.-approach') && document.querySelector('.rdx-banner--full.-approach');
    if(banner) {
      let tween = timeline.from(banner, 5, {
        opacity: 0,
        ease: Power1.easeOut
      });
    }

    const bannerTitle = document.querySelector('.rdx-banner--text') && document.querySelector('.rdx-banner--text');
    if(bannerTitle) {
      let tween = timeline.from(bannerTitle, 1.25, {
        opacity: 0,
        x: -50,
        ease: Power4.easeOut
      }, '-=3');
    }
    
    const bannerSubTitle = document.querySelector('.rdx-banner--subtext') && document.querySelector('.rdx-banner--subtext');
    if(bannerSubTitle) {
      let tween = timeline.from(bannerSubTitle, 1.25, {
        opacity: 0,
        x: -50,
        ease: Power4.easeOut
      }, '-=2.75');
    }

    const form = document.querySelector('.rdx-contact--form') && document.querySelector('.rdx-contact--form');
    if(form) {
      let tween = timeline.from(form, 1.25, {
        opacity: 0,
        y: 50,
        ease: Power4.easeOut
      }, '-=2.75');
    }
  }

  preloader = () => {
    const rdxPreloader = document.querySelector('.rdx-preloader');
    const rdxPreloaderSVGMask = document.querySelector('.rdx-prealoder--svg_mask');
    const rdxPreloaderSVGClip = document.querySelector('#rdx-defs--clip');
    const rdxPreloaderSVGFill = document.querySelector('.rdx-logo--svg_fill');
    const rdxPreloaderSVG = document.querySelector('.rect--svg');

    rdxPreloaderSVG.setAttribute('data-active', 'true');

    setTimeout(() => {
      rdxPreloaderSVGClip.remove();
      rdxPreloader.setAttribute('data-active', 'false');
      rdxPreloaderSVGMask.setAttribute('data-active', 'true');
      rdxPreloaderSVGFill.setAttribute('data-active', 'true');

      setTimeout(() => {
        rdxPreloader.style.display = "none";
      }, 3000);
      this.animateBanner();
      this.animateMainBanner();
    }, 5000);
  }

  initVideoPlayer = () => {
    const rdxinitVideo = document.querySelector('.rdx-video');
    const rdxVideoTrigger = document.querySelector('.btn[data-video="true"]');
    const rdxVideoExit = document.querySelector('.rdx-video--exit');

    if(rdxVideoTrigger) {
      rdxVideoTrigger.addEventListener('click', (evt) => {
        rdxinitVideo.setAttribute('data-active', 'true');
      });
    }
    
    if(rdxVideoExit) {
      rdxVideoExit.addEventListener('click', (evt) => {
        rdxinitVideo.setAttribute('data-active', 'false');
      });
    }
  }

  showMenu = () => {
    const rdxMenu = document.querySelector('.rdx-menu');
    const rdxDropdown = document.querySelector('.rdx-dropdown');
    const rdxBgImage = document.querySelector('.rdx-dropdown--image');
    const rdxDropDownList = document.querySelector('.rdx-dropdown--list');
    let active = false;

    if(rdxMenu) {
      rdxMenu.addEventListener('click', (evt) => {
        if(active === false) {
          active = true;
          rdxDropdown.setAttribute('data-active', `${active}`);
          rdxDropDownList.setAttribute('data-active', `${active}`);
          rdxBgImage.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxMenu.setAttribute('data-active', `${active}`);        
          }, 100);
        } else {
          active = false;
          rdxDropDownList.setAttribute('data-active', `${active}`);
          rdxBgImage.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxDropdown.setAttribute('data-active', `${active}`);
            rdxMenu.setAttribute('data-active', `${active}`);
          }, 1800);
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RDX();
});