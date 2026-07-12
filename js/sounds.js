// ============================================================
//  SIGA LIVRE — sounds.js
//  Sons de UI gerados por Web Audio API (sem arquivo externo)
// ============================================================

const SOUNDS = {
  _ctx: null,
  ligado: true,

  ctx() {
    if (!this._ctx)
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this._ctx.state === "suspended") this._ctx.resume();
    return this._ctx;
  },

  // Tom simples
  _tom(freq, dur, tipo = "sine", vol = 0.22, delay = 0) {
    if (!this.ligado) return;
    try {
      const c    = this.ctx();
      const osc  = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = tipo;
      osc.frequency.setValueAtTime(freq, c.currentTime + delay);
      gain.gain.setValueAtTime(0, c.currentTime + delay);
      gain.gain.linearRampToValueAtTime(vol, c.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + dur);
      osc.start(c.currentTime + delay);
      osc.stop(c.currentTime + delay + dur + 0.05);
    } catch (e) {}
  },

  // ── Sons do app ───────────────────────────────────────────

  click() {
    this._tom(900, 0.07, "sine", 0.12);
  },

  tab() {
    this._tom(660, 0.08, "sine", 0.10);
  },

  startup() {
    // Acorde ascendente — abertura do app
    [261.6, 329.6, 392.0, 523.2].forEach((f, i) =>
      this._tom(f, 0.35, "sine", 0.18, i * 0.10)
    );
  },

  notify() {
    // Dois tons suaves — notificação do agente
    this._tom(660, 0.18, "sine", 0.20, 0);
    this._tom(880, 0.22, "sine", 0.15, 0.17);
  },

  alertaTransito() {
    // Urgência — trânsito crítico
    this._tom(440, 0.14, "square", 0.18, 0.00);
    this._tom(370, 0.14, "square", 0.18, 0.16);
    this._tom(440, 0.14, "square", 0.18, 0.32);
  },

  success() {
    // Jingle curto de sucesso
    [523.2, 659.3, 783.9].forEach((f, i) =>
      this._tom(f, 0.22, "sine", 0.18, i * 0.12)
    );
  },

  agenteFalando() {
    // Pop suave quando o agente começa a falar
    this._tom(523, 0.08, "sine", 0.14, 0);
    this._tom(659, 0.10, "sine", 0.10, 0.08);
  },

  carroAcelerando() {
    if (!this.ligado) return;
    try {
      const c   = this.ctx();
      const now = c.currentTime;

      // Motor fundamental — sawtooth acelerando de 55Hz → 170Hz
      const eng     = c.createOscillator();
      const engGain = c.createGain();
      eng.type = "sawtooth";
      eng.frequency.setValueAtTime(55, now);
      eng.frequency.exponentialRampToValueAtTime(170, now + 0.50);
      engGain.gain.setValueAtTime(0,    now);
      engGain.gain.linearRampToValueAtTime(0.20, now + 0.04);
      engGain.gain.linearRampToValueAtTime(0.13, now + 0.42);
      engGain.gain.linearRampToValueAtTime(0,    now + 0.62);
      eng.connect(engGain);
      engGain.connect(c.destination);
      eng.start(now); eng.stop(now + 0.65);

      // Harmônico — textura de câmbio/pistão
      const harm     = c.createOscillator();
      const harmGain = c.createGain();
      harm.type = "square";
      harm.frequency.setValueAtTime(110, now);
      harm.frequency.exponentialRampToValueAtTime(340, now + 0.45);
      harmGain.gain.setValueAtTime(0,    now);
      harmGain.gain.linearRampToValueAtTime(0.06, now + 0.04);
      harmGain.gain.linearRampToValueAtTime(0,    now + 0.55);
      harm.connect(harmGain);
      harmGain.connect(c.destination);
      harm.start(now); harm.stop(now + 0.60);

      // Barulho de escapamento — noise burst filtrado
      const bufLen  = Math.floor(c.sampleRate * 0.18);
      const buf     = c.createBuffer(1, bufLen, c.sampleRate);
      const d       = buf.getChannelData(0);
      for (let i = 0; i < bufLen; i++) d[i] = Math.random() * 2 - 1;
      const noise       = c.createBufferSource();
      const noiseFilt   = c.createBiquadFilter();
      const noiseGain   = c.createGain();
      noiseFilt.type          = "bandpass";
      noiseFilt.frequency.value = 320;
      noiseFilt.Q.value         = 0.6;
      noiseGain.gain.setValueAtTime(0.16, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      noise.buffer = buf;
      noise.connect(noiseFilt);
      noiseFilt.connect(noiseGain);
      noiseGain.connect(c.destination);
      noise.start(now);
    } catch(e) {}
  },

  toggle(estado) {
    this.ligado = estado;
  }
};
