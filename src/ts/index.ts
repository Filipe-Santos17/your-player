// import CreateHTMLContainerVideo from "./createHTML"

class yourPlayer {
  #yourPlayerElement;
  #yourPlayerContainer!: HTMLElement;
  #yourPlayerVideo!: HTMLVideoElement;
  #yourPlayerBtnPlayPause!: HTMLButtonElement;
  #yourPlayerBtnChangeScreen!: HTMLButtonElement;
  #yourPlayerRangeVolume!: HTMLInputElement;
  #yourPlayerBtnVolume!: HTMLButtonElement;
  // #yourPlayerTimeLineControl!;

  constructor(elemParam: HTMLVideoElement | String, objConfig: Object) {
    if (typeof elemParam === "string") {
      const videoElement = document.querySelector(`video${elemParam}`);

      if (videoElement !== null && videoElement instanceof HTMLVideoElement) {
        this.#yourPlayerElement = videoElement;
      } else {
        console.warn("Seletor invalido");
      }
    } else if (elemParam instanceof HTMLVideoElement) {
      this.#yourPlayerElement = elemParam;
    } else {
      console.warn("Informe um seletor ou um elemento de video");
    }

    if (this.#yourPlayerElement) {
      this.init();
    }
  }

  // First Process
  #generateIdKey() {
    return Math.random().toString(36).substring(2, 7);
  }

  #createHTML() {
    const container = CreateHTMLContainerVideo(this.#yourPlayerElement!, this.#generateIdKey());

    if (container instanceof HTMLElement) {
      this.#yourPlayerContainer = container;
    } else {
      throw new Error("CreateHTMLContainerVideo did not return an HTMLElement")
    }
  }

  #getElementsVideo() {
    this.#yourPlayerVideo = this.#yourPlayerContainer.querySelector("video")!;
    this.#yourPlayerBtnPlayPause = this.#yourPlayerContainer.querySelector("button.play-pause-btn")!;
    this.#yourPlayerBtnChangeScreen = this.#yourPlayerContainer.querySelector("button.screen-video-btn")!;
    this.#yourPlayerRangeVolume = this.#yourPlayerContainer.querySelector(".your-player-volume-container input")!;
    this.#yourPlayerBtnVolume = this.#yourPlayerContainer.querySelector(".your-player-volume-container button")!;

    // this.#yourPlayerTimeLineControl = this.#yourPlayerContainer.querySelector(".your-player-timeline-control");

    // this.currentTime = this.#yourPlayerContainer.querySelector(".duration-container .current-time");

    // this.btnSettings = this.#yourPlayerContainer.querySelector(".settings-video-btn");
    // this.contMsgEndVideo = this.#yourPlayerContainer.querySelector(".msgs-videoend");
    // this.settingPainel = this.#yourPlayerContainer.querySelector(".settings-painel");
  }

  // Play & Pause
  handlePlayPauseVideo = () => {
    if (this.#yourPlayerVideo.paused) {
      this.#yourPlayerVideo.play()
      this.#rmClassVideoContainer("paused");
    } else {
      this.#yourPlayerVideo.pause();
      this.#adClassVideoContainer("paused");
    }
  };

  // Change full screen
  handleScreen = () => {
    this.#toClassVideoContainer("full-screen");
    if (this.#yourPlayerContainer.classList.contains("full-screen")) {
      this.#yourPlayerContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
      console.log('saiu')
    }
  };

  leaveFullScreen = () => {
    debugger;
    this.#adClassVideoContainer("full-screen");
    this.handleScreen();
  }

  //Volume
  muteVideo = () => {
    this.#yourPlayerVideo.muted = true;
    this.#yourPlayerRangeVolume.value = '0';
    this.#adClassVideoContainer('muted');
  }

  desMuteVideo = (val: string) => {
    this.#yourPlayerVideo.muted = false;
    this.#yourPlayerRangeVolume.value = val;
    this.#rmClassVideoContainer('muted');
  }

  handleVolumeBtn = () => {
    const isMuted = !this.#yourPlayerVideo.muted;

    if (isMuted) {
      this.muteVideo()
    } else {
      this.desMuteVideo('1')
    }

    this.#yourPlayerVideo.volume = +this.#yourPlayerRangeVolume.value;

    this.handleRangeScroll(this.#yourPlayerRangeVolume);
  };

  handleVolumeVideo = (e: Event) => {
    const inputElement = e.currentTarget as HTMLInputElement;

    this.#yourPlayerVideo.volume = +inputElement.value;

    this.handleRangeScroll(inputElement);

    const volumeValue = +(+this.#yourPlayerRangeVolume.value).toFixed(2)

    if (volumeValue < .5) {
      this.#rmClassVideoContainer('muted')
      this.#adClassVideoContainer('vol-dw')
    } else {
      this.#rmClassVideoContainer('vol-dw')
    }

    if (this.#yourPlayerVideo.volume === 0) {
      this.muteVideo();
    } else {
      this.desMuteVideo(inputElement.value);
    }
  };

  handleSetVolumeByArrow = (num: number) => {
    const currentVol = +this.#yourPlayerRangeVolume.value
    const vol = currentVol + num >= 1 ? 1 : currentVol + num <= 0 ? 0 : currentVol + num;

    this.#yourPlayerRangeVolume.value = `${vol}`;

    this.#yourPlayerVideo.volume = +this.#yourPlayerRangeVolume.value;

    this.handleRangeScroll(this.#yourPlayerRangeVolume);
  };

  handleSetVolShowModalVolValue = () => {
    
  }

  // TimeLine

  // Press Key
  #enableKeyActions = () => {
    document.addEventListener('keydown', this.handlePressKeyAction)
  }

  #isInFocus = () => {
    const selectedEl = document.activeElement

    console.log(selectedEl)

    // if (selectedEl instanceof this.#yourPlayerContainer) {}
  }

  handlePressKeyAction = ({ key }: { key: string }) => {
    console.log(document.activeElement === this.#yourPlayerVideo)
    switch (key.toLowerCase()) {
      case "f":
        this.handleScreen();
        break;
      case "escape":
        this.leaveFullScreen();
        break;
      case "k":
      case "spacebar":
      case " ":
        this.handlePlayPauseVideo();
        break;
      case "m":
        this.handleVolumeBtn();
        break;
      case "j":
      case "arrowleft":
        //this.skipTime(-5);
        break;
      case "l":
      case "arrowright":
        //this.skipTime(5);
        break;
      case "arrowup":
        this.handleSetVolumeByArrow(0.05);
        break;
      case "arrowdown":
        this.handleSetVolumeByArrow(-0.05);
        break;
      default:
        return;
    }
  };

  // Change color of Inputs
  handleRangeScroll = (cTarget: HTMLInputElement) => {
    const value = ((+cTarget.value - +cTarget.min) / (+cTarget.max - +cTarget.min)) * 100;

    cTarget.style.background = `linear-gradient(to right, #003863 0%, #003863 ${value}%, rgba(242, 243, 244, 0.5)  ${value}%, rgba(242, 243, 244, 0.5) 100%)`;
  };

  // Utils
  #toClassVideoContainer = (htmlClass: string) => {
    this.#yourPlayerContainer.classList.toggle(htmlClass);
  };

  #rmClassVideoContainer = (htmlClass: string) => {
    this.#yourPlayerContainer.classList.remove(htmlClass);
  };

  #adClassVideoContainer = (htmlClass: string) => {
    this.#yourPlayerContainer.classList.add(htmlClass);
  }

  // Start
  #addEvents() {
    this.#yourPlayerVideo.addEventListener("click", this.handlePlayPauseVideo);
    this.#yourPlayerBtnPlayPause.addEventListener("click", this.handlePlayPauseVideo);
    this.#yourPlayerBtnChangeScreen.addEventListener("click", this.handleScreen);
    this.#yourPlayerRangeVolume.addEventListener("input", this.handleVolumeVideo);
    this.#yourPlayerBtnVolume.addEventListener("click", this.handleVolumeBtn);

  }

  init() {
    this.#createHTML();
    this.#getElementsVideo();
    this.#addEvents();
    this.#enableKeyActions();
  }
}
