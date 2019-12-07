import { TimelineLite, CSSPlugin, AttrPlugin, Power1 } from "gsap/all";
import { Power0 } from 'gsap';
import '../stylesheets/style.scss';

class RDX {
  constructor() {
    this.preloader();
    this.showMenu();
    this.initVideoPlayer();
    this.initTrigger();
    this.initSplit();
    this.initFull();
    this.initActionStrip();
  }

  initTrigger = () => {
    // init controller
    var controller = new ScrollMagic.Controller();
    const rdxPillars = [].slice.call(document.querySelectorAll('.rdx-pillars--image'));
    const offset = 400;

    rdxPillars.forEach((pillar) => {
      // create a scene
      var scene = new ScrollMagic.Scene({
        triggerElement: pillar,
        offset: `-${offset}px`
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(pillar, 'fade-in')
      .addTo(controller);
    });
  }
  
  initSplit = () => {
    // init controller
    var controller = new ScrollMagic.Controller();
    const rdxSplitImage = [].slice.call(document.querySelectorAll('.rdx-split--content_image'));
    const rdxSplitDesc = [].slice.call(document.querySelectorAll('.rdx-split--content_desc'));
    const offset = 400;

    rdxSplitImage.forEach((image) => {
      // create a scene
      var scene = new ScrollMagic.Scene({
        triggerElement: image,
        offset: `-${offset}px`
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(image, 'fade-in')
      .addTo(controller);
    });
    
    rdxSplitDesc.forEach((desc) => {
      // create a scene
      var scene = new ScrollMagic.Scene({
        triggerElement: desc,
        offset: `-${offset}px`
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(desc, 'fade-in')
      .addTo(controller);
    });
  }
  
  initFull = () => {
    // init controller
    var controller = new ScrollMagic.Controller();
    const rdxFullImage = [].slice.call(document.querySelectorAll('.rdx-full--content_image'));
    const rdxFullWrapper = [].slice.call(document.querySelectorAll('.rdx-full--content_image-wrapper'));
    const offset = 400;

    rdxFullImage.forEach((image) => {
      // create a scene
      var scene = new ScrollMagic.Scene({
        triggerElement: image,
        offset: `-${offset}px`
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(image, 'fade-in')
      .addTo(controller);
    });
    
    rdxFullWrapper.forEach((desc) => {
      // create a scene
      var scene = new ScrollMagic.Scene({
        triggerElement: desc,
        offset: `-${offset}px`
      })
      // .setTween(".rdx-pillars--image.-dev", {opacity: 1})
      .setClassToggle(desc, 'fade-in')
      .addTo(controller);
    });
  }
  
  initActionStrip = () => {
    // init controller
    var controller = new ScrollMagic.Controller();
    const rdxActionStrip = document.querySelector('.rdx-action--strip');
    const rdxActionText = document.querySelector('.rdx-action--text');
    const rdxActionButton = document.querySelector('.btn.-line.-dark');
    const rdxFooter = document.querySelector('.rdx-footer');
    const offset = 400;

    // create a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: rdxActionStrip,
      offset: `-${offset}px`
    })
    .setClassToggle(rdxActionStrip, 'fade-in')
    .addTo(controller);
    
    // create a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: rdxActionText,
      offset: `-${offset}px`
    })
    .setClassToggle(rdxActionText, 'fade-in')
    .addTo(controller);
    
    // create a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: rdxActionButton,
      offset: `-${offset}px`
    })
    .setClassToggle(rdxActionButton, 'fade-in')
    .addTo(controller);
    
    // create a scene
    var scene = new ScrollMagic.Scene({
      triggerElement: rdxFooter,
      offset: `-600px`
    })
    .setClassToggle(rdxFooter, 'fade-in')
    .addTo(controller);
  }

  animateBanner = () => {
    const plugins = [ CSSPlugin, AttrPlugin ];
    const timeline = new TimelineLite();

    const banner = document.querySelector('.rdx-banner--full.-approach');
    let tween = timeline.from(banner, 5, {
      opacity: 0,
      ease: Power1.easeOut
    });

     const bannerTitle = document.querySelector('.rdx-banner--text');
     tween = timeline.from(bannerTitle, 1.25, {
       opacity: 0,
       x: -50,
       ease: Power4.easeOut
     }, '-=3');
     
     const bannerSubTitle = document.querySelector('.rdx-banner--subtext');
     tween = timeline.from(bannerSubTitle, 1.25, {
       opacity: 0,
       x: -50,
       ease: Power4.easeOut
     }, '-=2.75');
  }

  preloader = () => {
    const rdxPreloader = document.querySelector('.rdx-preloader');
    const rdxPreloaderSVG = document.querySelector('.rect--svg');

    rdxPreloaderSVG.setAttribute('data-active', 'true');

    setTimeout(() => {
      rdxPreloader.setAttribute('data-active', 'false');
      setTimeout(() => {
        rdxPreloader.style.display = "none";
      }, 3000);
      this.animateBanner();
    }, 7000);
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
    const rdxLogo = document.querySelector('.rdx-logo');
    const rdxMenu = document.querySelector('.rdx-menu');
    const rdxDropdown = document.querySelector('.rdx-dropdown');
    const rdxSocial = document.querySelector('.rdx-social');
    // const rdxBgImage = document.querySelector('.rdx-dropdown--image');
    const rdxDropDownList = document.querySelector('.rdx-dropdown--list');
    let active = false;

    if(rdxMenu) {
      rdxMenu.addEventListener('click', (evt) => {
        if(active === false) {
          active = true;
          rdxLogo.setAttribute('data-active', `${active}`);
          rdxDropdown.setAttribute('data-active', `${active}`);
          rdxDropDownList.setAttribute('data-active', `${active}`);
          // rdxBgImage.setAttribute('data-active', `${active}`);
          rdxSocial && rdxSocial.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxMenu.setAttribute('data-active', `${active}`);        
          }, 100);
        }else {
          active = false;
          rdxDropDownList.setAttribute('data-active', `${active}`);
          // rdxBgImage.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxDropdown.setAttribute('data-active', `${active}`);
            rdxLogo.setAttribute('data-active', `${active}`);
            rdxMenu.setAttribute('data-active', `${active}`);
            rdxSocial && rdxSocial.setAttribute('data-active', `${active}`);
          }, 3000);
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RDX();
});