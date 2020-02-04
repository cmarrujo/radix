import { TimelineLite, CSSPlugin, AttrPlugin, Power1 } from "gsap/all";
import { Power0 } from 'gsap';
import * as THREE from 'three';
import { AmbientLight } from 'three';
import '../stylesheets/style.scss';
import textureWallNormalMap from '../images/pano-background-wall-1.jpg';
import textureWallNormalMapRight from '../images/pano-background-wall-2.jpg';
import textureWallNormalMapleft from '../images/pano-background-wall-4.jpg';
import textureWallNormalMapBack from '../images/pano-background-wall-3.jpg';
import autoprefixer from "autoprefixer";
import data from "../scripts/rdxdata.json";

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
    this.orbsInteraction();
    // this.initAnimations();
    this.preloadImages();
    this.counter = 0;
    this.panoCount = 0;
  }

  preloadImages = () => {
    this.imagesPreload = [];
    for (var i = 1; i <= 4; ++i) {
      this.imagesPreload[i] = new Image();
      this.imagesPreload[i].src = `https://www.radixrecovery.com/images/method-nav-scroll-performance-seq${[i]}.jpg`;
    }
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

    modalExit.addEventListener('click', (evt) => {
      modal.setAttribute('data-active', 'false');
    });
  }

  initAnimations = () => {
    let frames = [].slice.call(document.querySelectorAll('.rdx-pillars--image'));
    frames.forEach((frame) => {
      frame.addEventListener('mouseover', (e) => {
        this.setFrames(frame);
      });
      
      frame.addEventListener('mouseout', (e) => {
        this.setFrames(frame, 'true');
      });
    });
  }

  setFrames = (t, unset='false') => {
    if(unset === 'true') {
      t.style.backgroundImage = `url(https://www.radixrecovery.com/images/method-nav-scroll-performance-seq1.jpg)`;
      t.style.backgroundSize = `cover`;
      this.counter = 0;
    }else{
      const interval = setInterval(() => {
        this.counter++;
  
        if(this.counter >= 4) {
          clearInterval(interval);
          this.counter = 4;
        }
  
        t.style.backgroundImage = `url(https://www.radixrecovery.com/images/method-nav-scroll-performance-seq${this.counter}.jpg)`;
        t.style.backgroundSize = `cover`;
      }, 200);
    }
  }

  logoHandler = () => {
    const logo = document.querySelector('.rdx-logo');
    logo.addEventListener('click', (e) => {
      window.location.href = 'https://radixrecovery.com';
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
      control.addEventListener('click', (evt) => {
        const direction = evt.target.getAttribute('data-dir');
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
        offset: `-${offset}px`,
        reverse: false
      })
      .setClassToggle(rdxActionStrip, 'fade-in')
      .addTo(controller);
    }
    
    if(rdxFooter) {
      // create a scene
      const scene = new ScrollMagic.Scene({
        triggerElement: rdxFooter,
        offset: `-600px`,
        reverse: false
      })
      .setClassToggle(rdxFooter, 'fade-in')
      .addTo(controller);
    }
  }

  animateMainBanner = () => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    const timeline = new TimelineLite();

    const fitness = document.querySelector('.rdx-header') && document.querySelector('.rdx-header');
    if(fitness) {
      if(window.innerWidth <= 360) {
        let tween = timeline.to(fitness, 10, {
          x: '-1000vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 480) {
        let tween = timeline.to(fitness, 10, {
          x: '-900vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 768) {
        let tween = timeline.to(fitness, 10, {
          x: '-750vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 1024) {
        let tween = timeline.to(fitness, 10, {
          x: '-625vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 1280) {
        let tween = timeline.to(fitness, 10, {
          x: '-525vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 1440) {
        let tween = timeline.to(fitness, 10, {
          x: '-480vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth <= 1920) {
        let tween = timeline.to(fitness, 10, {
          x: '-400vw',
          ease: Power1.easeOut
        });
      }else if(window.innerWidth > 1920) {
        let tween = timeline.to(fitness, 10, {
          x: '-305vw',
          ease: Power1.easeOut
        });
      }
    }
    
    const content = document.querySelector('.rdx-content--wrapper') && document.querySelector('.rdx-content--wrapper');
    if(content) {
      let tween = timeline.from(content, 1, {
        opacity: 0,
        y: '-25%',
        ease: Power1.easeOut
      }, '-=4');
    }
    
    const social = document.querySelector('.rdx-social') && document.querySelector('.rdx-social');
    if(social) {
      let tween = timeline.from(social, 1.5, {
        opacity: 0,
        ease: Power1.easeOut
      }, '-=10');
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
    
    const bannerLarge = document.querySelector('.rdx-banner--full.-performance') && document.querySelector('.rdx-banner--full.-performance');
    if(bannerLarge) {
      let tween = timeline.from(bannerLarge, 5, {
        opacity: 0,
        ease: Power1.easeOut
      });
    }
    
    const dynamicBanner = document.querySelector('.rdx-banner--full.-dynamic') && document.querySelector('.rdx-banner--full.-dynamic');
    if(dynamicBanner) {
      let tween = timeline.from(dynamicBanner, 5, {
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
    // const rdxBgImage = document.querySelector('.rdx-dropdown--image');
    const rdxDropDownList = document.querySelector('.rdx-dropdown--list');
    let active = false;

    if(rdxMenu) {
      rdxMenu.addEventListener('click', (evt) => {
        if(active === false) {
          active = true;
          rdxDropdown.style.display = 'block';

          setTimeout(() => {
            rdxDropdown.setAttribute('data-active', `${active}`);
            rdxDropDownList.setAttribute('data-active', `${active}`);
            // rdxBgImage.setAttribute('data-active', `${active}`);
          }, 100);

          setTimeout(() => {
            rdxMenu.setAttribute('data-active', `${active}`);        
          }, 200);
        } else {
          active = false;
          rdxDropDownList.setAttribute('data-active', `${active}`);
          // rdxBgImage.setAttribute('data-active', `${active}`);

          setTimeout(() => {
            rdxDropdown.setAttribute('data-active', `${active}`);
            rdxMenu.setAttribute('data-active', `${active}`);
          }, 1500);
          
          setTimeout(() => {
            rdxDropdown.style.display = 'none';
          }, 1800);
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RDX();
});