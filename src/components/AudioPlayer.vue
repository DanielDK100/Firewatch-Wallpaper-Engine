<template>
  <audio v-show="showAudioPlayer" ref="audioPlayer" loop>
    <source :src="require('../assets/audios/firewatch_prologue.mp3')" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</template>

<script>
export default {
  props: ['properties'],
  data() {
    return {
      showAudioPlayer: false
    }
  },
  watch: {
    properties: function(newProperties) {
      const audioPlayer = this.$refs.audioPlayer
      if (newProperties.isAudioPlayerEnabled) {
        newProperties.isAudioPlayerEnabled.value ? audioPlayer.play() : audioPlayer.pause()
        audioPlayer.currentTime = 0
      }
      newProperties.audioVolume ? audioPlayer.volume = newProperties.audioVolume.value / 100 : null
    }
  }
}
</script>
