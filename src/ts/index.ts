class yourPlayer {
  #yourPlayerElement;
  #yourPlayerContainer;

  constructor(elemParam: HTMLVideoElement | String, objConfig: Object) {
    if (typeof elemParam === "string") {
      const videoElement = document.querySelector(`video${elemParam}`);

      if (videoElement !== null && videoElement instanceof HTMLVideoElement) {
        this.#yourPlayerElement = videoElement;
        this.init();
      } else {
        console.warn("Seletor invalido");
      }
    } else if (elemParam instanceof HTMLVideoElement) {
      this.#yourPlayerElement = elemParam;
      this.init();
    } else {
      console.warn("Informe um seletor ou um elemento de video");
    }
  }

  #generateIdKey() {
    return Math.random().toString(36).substring(2, 7);
  }

  #createHTML() {
    this.#yourPlayerContainer = CreateHTMLContainerVideo(this.#yourPlayerElement!, this.#generateIdKey());
  }

  #getElementsVideo() {
    this.yourPlayerVideo = this.#yourPlayerContainer.querySelector("video");
    this.yourPlayerBtnPlayPause = this.#yourPlayerContainer.querySelector("button.play-pause-btn");
    this.yourPlayerBtnChangeScreen = this.#yourPlayerContainer.querySelector("button.screen-video-btn");
    this.yourPlayerRangeVolume = this.#yourPlayerContainer.querySelector(".your-player-volume-container input");

    this.btnVolume = this.#yourPlayerContainer.querySelector(".volume-container button");
    this.btnSettings = this.#yourPlayerContainer.querySelector(".settings-video-btn");
    this.currentTime = this.#yourPlayerContainer.querySelector(".duration-container .current-time");
    this.timeLineControl = this.#yourPlayerContainer.querySelector(".timeline-control");
    this.contMsgEndVideo = this.#yourPlayerContainer.querySelector(".msgs-videoend");
    this.settingPainel = this.#yourPlayerContainer.querySelector(".settings-painel");
  }

  #changeClassVideoContainer = (htmlClass: String) => {
    this.#yourPlayerContainer.classList.toggle(htmlClass);
  };

  handlePlayPauseVideo = () => {
    this.yourPlayerVideo.paused ? this.yourPlayerVideo.play() : this.yourPlayerVideo.pause();
    this.#changeClassVideoContainer("paused");
  };

  handleScreen = () => {
    this.#changeClassVideoContainer("full-screen");
    // display none no botão de full e adicionar um evento no btn de exit
    if (this.#yourPlayerContainer.classList.contains("full-screen")) {
      this.yourPlayerVideo.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

   //Volume
   handleVolumeBtn = () => {
    this.yourPlayerVideo.muted = !this.yourPlayerVideo.muted;
    if (this.yourPlayerVideo.muted) {
      this.rangeVolume.value = 0;
    } else {
      this.rangeVolume.value = 1;
    }
    this.yourPlayerVideo.volume = this.rangeVolume.value;
    this.handleRangeScroll(this.rangeVolume);
  };

  handleVolumeVideo = ({ currentTarget }) => {
    this.yourPlayerVideo.volume = currentTarget.value;
    this.handleRangeScroll(currentTarget);
    if (this.yourPlayerVideo.volume == 0) {
      this.yourPlayerVideo.muted = true;
    } else {
      this.yourPlayerVideo.muted = false;
    }
  };

  handleRangeScroll = (cTarget) => {
    this.value = ((cTarget.value - cTarget.min) / (cTarget.max - cTarget.min)) * 100;
    cTarget.style.background = `linear-gradient(to right, #003863 0%, #003863 ${this.value}%, rgba(242, 243, 244, 0.5)  ${this.value}%, rgba(242, 243, 244, 0.5) 100%)`;
  };



  #addEvents() {
    this.yourPlayerBtnPlayPause.addEventListener("click", this.handlePlayPauseVideo);
    this.yourPlayerBtnChangeScreen.addEventListener("click", this.handleScreen);
    this.yourPlayerRangeVolume.addEventListener("input", this.handleVolumeVideo)
  }

  init() {
    this.#createHTML();
    this.#getElementsVideo();
    this.#addEvents();
  }
}
