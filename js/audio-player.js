/**
 * Advanced Audio Player Component
 * Play/Pause, -5s/+5s, timeline slider, speed selector (0.75x, 1x, 1.25x, 1.5x)
 */

class AudioPlayerComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.audio = new Audio();
    this.isPlaying = false;
    this.currentTrack = null;
    this.playbackRate = 1.0;
    this.initEvents();
  }

  setTrack(trackSrc, title) {
    if (!trackSrc) return;
    this.currentTrack = trackSrc;
    this.audio.src = trackSrc;
    this.audio.playbackRate = this.playbackRate;
    this.isPlaying = false;

    if (this.container) {
      this.render(title);
    }
  }

  render(title = "Audio Track") {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="custom-audio-player card">
        <div class="player-top-row">
          <div class="track-info">
            <span class="track-icon">🎧</span>
            <div>
              <div class="track-title">${title}</div>
              <div class="track-file">${this.currentTrack || "No track loaded"}</div>
            </div>
          </div>
          <div class="speed-control">
            <label>Tezlik:</label>
            <select id="audioSpeedSelect" class="speed-select">
              <option value="0.75" ${this.playbackRate === 0.75 ? "selected" : ""}>0.75x</option>
              <option value="1.0" ${this.playbackRate === 1.0 ? "selected" : ""}>1.0x (Norm)</option>
              <option value="1.25" ${this.playbackRate === 1.25 ? "selected" : ""}>1.25x</option>
              <option value="1.5" ${this.playbackRate === 1.5 ? "selected" : ""}>1.5x</option>
            </select>
          </div>
        </div>

        <div class="player-controls-row">
          <button type="button" id="audioBack5Btn" class="btn-player btn-rewind" title="5 soniya orqaga">
            <span class="icon">⏪</span> -5s
          </button>

          <button type="button" id="audioPlayBtn" class="btn-player btn-play-large" title="Ijro / Pauza">
            <span id="audioPlayIcon" class="icon">${this.isPlaying ? "⏸️" : "▶️"}</span>
          </button>

          <button type="button" id="audioForward5Btn" class="btn-player btn-forward" title="5 soniya oldinga">
            +5s <span class="icon">⏩</span>
          </button>

          <div class="timeline-container">
            <span id="audioCurrentTime" class="time-label">0:00</span>
            <input type="range" id="audioSeekSlider" class="seek-slider" min="0" max="100" value="0">
            <span id="audioDuration" class="time-label">0:00</span>
          </div>

          <div class="volume-container">
            <button type="button" id="audioMuteBtn" class="btn-icon" title="Ovoz">🔊</button>
            <input type="range" id="audioVolumeSlider" class="volume-slider" min="0" max="1" step="0.05" value="1">
          </div>
        </div>
      </div>
    `;

    this.bindDOMEvents();
  }

  bindDOMEvents() {
    const playBtn = document.getElementById("audioPlayBtn");
    const backBtn = document.getElementById("audioBack5Btn");
    const fwdBtn = document.getElementById("audioForward5Btn");
    const seekSlider = document.getElementById("audioSeekSlider");
    const speedSelect = document.getElementById("audioSpeedSelect");
    const muteBtn = document.getElementById("audioMuteBtn");
    const volSlider = document.getElementById("audioVolumeSlider");

    if (playBtn) playBtn.onclick = () => this.togglePlay();
    if (backBtn) backBtn.onclick = () => this.seekDelta(-5);
    if (fwdBtn) fwdBtn.onclick = () => this.seekDelta(5);

    if (speedSelect) {
      speedSelect.onchange = (e) => {
        this.playbackRate = parseFloat(e.target.value);
        this.audio.playbackRate = this.playbackRate;
      };
    }

    if (seekSlider) {
      seekSlider.oninput = (e) => {
        if (this.audio.duration) {
          const seekTo = (e.target.value / 100) * this.audio.duration;
          this.audio.currentTime = seekTo;
        }
      };
    }

    if (volSlider) {
      volSlider.oninput = (e) => {
        this.audio.volume = parseFloat(e.target.value);
        if (muteBtn) muteBtn.textContent = this.audio.volume === 0 ? "🔇" : "🔊";
      };
    }

    if (muteBtn) {
      muteBtn.onclick = () => {
        this.audio.muted = !this.audio.muted;
        muteBtn.textContent = this.audio.muted ? "🔇" : "🔊";
      };
    }
  }

  initEvents() {
    this.audio.ontimeupdate = () => {
      const cur = document.getElementById("audioCurrentTime");
      const dur = document.getElementById("audioDuration");
      const slider = document.getElementById("audioSeekSlider");

      if (cur) cur.textContent = this.formatTime(this.audio.currentTime);
      if (dur && this.audio.duration) dur.textContent = this.formatTime(this.audio.duration);

      if (slider && this.audio.duration) {
        slider.value = (this.audio.currentTime / this.audio.duration) * 100;
      }
    };

    this.audio.onloadedmetadata = () => {
      const dur = document.getElementById("audioDuration");
      if (dur && this.audio.duration) dur.textContent = this.formatTime(this.audio.duration);
    };

    this.audio.onplay = () => {
      this.isPlaying = true;
      const icon = document.getElementById("audioPlayIcon");
      if (icon) icon.textContent = "⏸️";
    };

    this.audio.onpause = () => {
      this.isPlaying = false;
      const icon = document.getElementById("audioPlayIcon");
      if (icon) icon.textContent = "▶️";
    };

    this.audio.onended = () => {
      this.isPlaying = false;
      const icon = document.getElementById("audioPlayIcon");
      if (icon) icon.textContent = "▶️";
      const slider = document.getElementById("audioSeekSlider");
      if (slider) slider.value = 0;
    };
  }

  togglePlay() {
    if (!this.audio.src) return;
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(e => console.warn("Audio play prevented:", e));
    }
  }

  seekDelta(seconds) {
    if (!this.audio) return;
    const newTime = Math.max(0, Math.min(this.audio.duration || 0, this.audio.currentTime + seconds));
    this.audio.currentTime = newTime;
  }

  formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
