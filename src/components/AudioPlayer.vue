<template>
  <audio id="audio-player" ref="audioPlayer" loop>
    <source :src="require('../assets/audios/firewatch_prologue.mp3')" type="audio/mpeg" />Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: ["properties", "pauseStatus"],
  data() {
    return {
      audioPlayer: null,
      isAudioPlayerEnabled: false
    };
  },
  mounted() {
    this.audioPlayer = this.$refs.audioPlayer;
  },
  watch: {
    properties: function(newProperties) {
      if (newProperties.isAudioPlayerEnabled) {
        newProperties.isAudioPlayerEnabled.value
          ? this.audioPlayer.play()
          : this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.isAudioPlayerEnabled = newProperties.isAudioPlayerEnabled.value;
      }
      newProperties.audioVolume
        ? (this.audioPlayer.volume = newProperties.audioVolume.value / 100)
        : null;
    },
    pauseStatus: function(newPauseStatus) {
      if (this.isAudioPlayerEnabled) {
        newPauseStatus ? this.audioPlayer.pause() : this.audioPlayer.play();
      }
    }
  }
};
</script>
