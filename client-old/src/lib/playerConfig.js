export const videoJsOptions = videoLink => ({
  autoplay: false,
  controls: true,
  sources: [
    {
      src: videoLink,
      type: 'video/mp4'
    }
  ],
  fluid: 'true', // put the player in the VideoPlayerWrap box
  playbackRates: [0.75, 1, 1.5, 2],
  controlBar: {
    volumePanel: {
      inline: false // vertical VolumeControl
    }
  }
})
