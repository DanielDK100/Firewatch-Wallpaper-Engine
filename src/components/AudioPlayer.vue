<template>
  <audio v-show="showAudioPlayer" ref="audioPlayer" loop>
    <source :src="require('../assets/audios/firewatch_prologue.mp3')" type="audio/mpeg" />Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: ["properties", "pauseStatus"],
  data() {
    return {
      showAudioPlayer: false,
      audioPlayer: null
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
      }
      newProperties.audioVolume
        ? (this.audioPlayer.volume = newProperties.audioVolume.value / 100)
        : null;
    },
    pauseStatus: function(newPauseStatus) {
      newPauseStatus ? this.audioPlayer.pause() : this.audioPlayer.play();
    }
  }
};
</script>
