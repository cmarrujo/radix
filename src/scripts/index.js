import '../stylesheets/style.scss';

class RDX {
  constructor() {
    this.preloader();
    this.showMenu();
    this.initVideoPlayer();
  }

  preloader = () => {
    const rdxPreloader = document.querySelector('.rdx-preloader');
    const rdxPreloaderSVG = document.querySelector('.rect--svg');

    rdxPreloaderSVG.setAttribute('data-active', 'true');

    setTimeout(() => {
      rdxPreloader.setAttribute('data-active', 'false');
      setTimeout(() => {
        rdxPreloader.style.display = "none";
      }, 30);
    }, 70);
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
    const rdxBgImage = document.querySelector('.rdx-dropdown--image');
    const rdxDropDownList = document.querySelector('.rdx-dropdown--list');
    let active = false;

    if(rdxMenu) {
      rdxMenu.addEventListener('click', (evt) => {
        if(active === false) {
          active = true;
          rdxLogo.setAttribute('data-active', `${active}`);
          rdxDropdown.setAttribute('data-active', `${active}`);
          rdxDropDownList.setAttribute('data-active', `${active}`);
          rdxBgImage.setAttribute('data-active', `${active}`);
          rdxSocial && rdxSocial.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxMenu.setAttribute('data-active', `${active}`);        
          }, 100);
        }else {
          active = false;
          rdxDropDownList.setAttribute('data-active', `${active}`);
          rdxBgImage.setAttribute('data-active', `${active}`);
          setTimeout(() => {
            rdxDropdown.setAttribute('data-active', `${active}`);
            rdxLogo.setAttribute('data-active', `${active}`);
            rdxMenu.setAttribute('data-active', `${active}`);
            rdxSocial && rdxSocial.setAttribute('data-active', `${active}`);
          }, 2000);
        }
      });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RDX();
});