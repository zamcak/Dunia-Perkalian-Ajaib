import { Howl } from 'howler';

class SoundManager {
  constructor() {
    this.sounds = {
      click: new Howl({ src: ['/assets/sounds/click.mp3'], volume: 0.5 }),
      correct: new Howl({ src: ['/assets/sounds/correct.mp3'], volume: 0.7 }),
      wrong: new Howl({ src: ['/assets/sounds/wrong.mp3'], volume: 0.5 }),
      complete: new Howl({ src: ['/assets/sounds/complete.mp3'], volume: 0.6 }),
      bgMusic: new Howl({ src: ['/assets/sounds/bg-music.mp3'], loop: true, volume: 0.3 })
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    }
  }

  stopBgMusic() {
    if (this.sounds.bgMusic) {
      this.sounds.bgMusic.stop();
    }
  }

  startBgMusic() {
    if (this.sounds.bgMusic) {
      this.sounds.bgMusic.play();
    }
  }
}

export default new SoundManager();