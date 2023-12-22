function CreateHTMLContainerVideo(elem: HTMLVideoElement, idKey: string)  {
  const templateVideo = () => /*html*/`
    <div class="your-player-video-container paused" js-your-player="${idKey}">
      <!--topo-->
      <div class="your-player-video-controls-container">
        <div class="your-player-timeline-container">
          <input type="range" class="your-player-timeline-control" min="0" max="1" step="any" value="0">
          <div class="your-player-duration-container">
            <p class="your-player-current-time"></p>
          </div>
        </div>
        <div class="controls">
          <div class="sub-control">
            <button class="play-pause-btn">
              <svg class="play-icon" stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z">
                </path><path d="M8 5v14l11-7z"></path>
              </svg>
              <svg class="pause-icon" stroke="white" fill="white" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
              </svg>
            </button>
            <div class="your-player-volume-container">
              <button>
                <svg class="volume-up" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
                <svg class="volume-down" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M18.5 12A4.5 4.5 0 0016 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path>
                </svg>
                <svg class="volume-off" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path>
                </svg>
              </button>
              <input type="range" class="your-player-volume-control" min="0" max="1" step="any" value="1">
            </div>
          </div>
          <div class="sub-control">
            <button class="settings-video-btn">
              <!-- <svg>
                <use xlink:href="#settings-video"></use>
              </svg> -->
            </button>
            <button class="screen-video-btn">
              <svg class="full-screen" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
              </svg>
              <svg class="full-screen-exit" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <video preload="auto" id="">
        <source src="./dist/video.mp4" type="video/mp4"></source>
        Desculpa, o seu navegador não suporta o vídeo incorporado.
      </video>
    </div>
  `;

  const attrs = [...elem.attributes]

  //TODO: change src position and filter control

  elem.insertAdjacentHTML("beforebegin", templateVideo());
  elem.remove();

  const yourPlayerContainer = document.querySelector(`.your-player-video-container[js-your-player^="${idKey}"]`);

  if(yourPlayerContainer){
    yourPlayerContainer.removeAttribute("js-your-player");

    const video = yourPlayerContainer.querySelector('video');

    attrs.forEach(attr => video?.setAttribute(attr.name, attr.value));
  }

  return yourPlayerContainer;
}
