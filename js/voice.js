// ============================================================
//  SIGA LIVRE — voice.js
//  ElevenLabs (voz real, sotaque real) + fallback browser TTS
// ============================================================

const VOICE = {
  falando:    false,
  audioAtual: null,
  _ouvintesFala: [],

  // Permite que outras partes do app (ex: reconhecimento de voz do Modo Condução)
  // saibam quando o app começa/termina de falar, pra pausar o microfone e não
  // ouvir a própria voz (o que causaria um loop de retroalimentação)
  aoMudarFala(cb) { this._ouvintesFala.push(cb); },
  _notificarFala(falando) { this._ouvintesFala.forEach(cb => { try { cb(falando); } catch(e) {} }); },

  // ── Config persistida ─────────────────────────────────────
  get cfg()    { try { return JSON.parse(localStorage.getItem("sl_v2")||"{}"); } catch{ return {}; } },
  save(obj)    { localStorage.setItem("sl_v2", JSON.stringify({...this.cfg,...obj})); },

  get apiKey() { return this.cfg.apiKey || ""; },

  // Voice ID por (sotaque + gênero) — preenchido pelo wizard
  getVoiceId(sotaque, genero) {
    return this.cfg[`vid_${sotaque}_${genero}`]
        || this.cfg[`vid_brasiliense_${genero}`]
        || (genero==="feminino" ? "EXAVITQu4vr4xnSDxMaL" : "VR6AewLTigWG4xSOukaG");
  },

  // ── Descrições para Voice Design por sotaque ──────────────
  DESC: {
    brasiliense: {
      f: "Brazilian woman from Brasília, clear and neutral Brazilian Portuguese accent, friendly and professional.",
      m: "Brazilian man from Brasília, clear neutral Brazilian Portuguese, confident and professional."
    },
    nordestino: {
      f: "Brazilian woman from Bahia, Northeastern Brazil. Strong warm Nordestino accent with natural expressions like 'oxe', 'visse', 'meu rei'. Expressive and friendly.",
      m: "Brazilian man from Ceará, Northeastern Brazil. Confident with authentic Nordestino accent, uses 'oxe', 'arretado', warm tone."
    },
    carioca: {
      f: "Brazilian woman from Rio de Janeiro, Carioca accent. Energetic, relaxed, uses typical Rio expressions, warm and casual.",
      m: "Brazilian man from Rio de Janeiro, Carioca accent. Relaxed, uses 'cara', 'véi', casual and friendly tone."
    },
    paulistano: {
      f: "Brazilian woman from São Paulo, fast-paced Paulistano accent, professional and direct, uses 'mano' naturally.",
      m: "Brazilian man from São Paulo, fast speech, Paulistano accent, confident and businesslike."
    },
    mineiro: {
      f: "Brazilian woman from Minas Gerais. Soft Mineiro accent, naturally uses 'uai' and 'sô', warm and slightly slower speech.",
      m: "Brazilian man from Minas Gerais. Authentic Mineiro accent, calm, naturally uses 'uai sô', measured speech."
    },
    gaucho: {
      f: "Brazilian woman from Rio Grande do Sul. Gaúcho accent, warm, naturally uses 'bah', 'tchê', slightly formal.",
      m: "Brazilian man from Rio Grande do Sul. Deep voice with authentic Gaúcho accent, naturally uses 'bah tchê', confident."
    },
    nortista: {
      f: "Brazilian woman from Pará, Amazonian region. Authentic Nortista accent, warm, naturally uses 'égua bicho'.",
      m: "Brazilian man from Pará, Northern Brazil. Warm Amazonian accent, naturally uses 'égua', 'bicho'."
    },
    catarinense: {
      f: "Brazilian woman from Santa Catarina. Southern Brazilian accent, distinct from Gaúcho, warm and clear.",
      m: "Brazilian man from Santa Catarina. Southern Brazilian accent, calm and friendly."
    },
    // ── Espanha ──────────────────────────────────────────────
    madrilenho: {
      f: "Spanish woman from Madrid, clear Castilian Spanish, professional and energetic, natural use of 'tío' and 'mola'.",
      m: "Spanish man from Madrid, crisp Castilian accent, confident, uses 'tío', 'macho' naturally."
    },
    sevillano: {
      f: "Spanish woman from Seville, Andalusian accent with Sevillano flair, warm and expressive, uses 'illo' and 'salero'.",
      m: "Spanish man from Seville, distinctive Sevillano accent, relaxed and charming, uses 'illo', 'arsa'."
    },
    andaluz: {
      f: "Spanish woman from Andalusia, southern Spanish accent, warm and melodic, aspires final consonants naturally.",
      m: "Spanish man from Andalusia, strong southern Spanish accent, relaxed rhythm, natural Andalusian speech."
    },
    catalan: {
      f: "Spanish woman from Catalonia (Barcelona area), Catalan-influenced Spanish, clear and measured pace.",
      m: "Spanish man from Barcelona, Catalan-accented Spanish, precise and direct."
    },
    vasco: {
      f: "Spanish woman from the Basque Country, Basque-accented Spanish, deliberate and warm, uses 'tío' sparingly.",
      m: "Spanish man from Bilbao, Basque Spanish accent, measured pace, deep and clear voice."
    },
    gallego: {
      f: "Spanish woman from Galicia, Galician-influenced Spanish, soft melodic accent, slightly slower cadence.",
      m: "Spanish man from A Coruña, Galician Spanish accent, warm and rhythmic."
    },
    valenciano: {
      f: "Spanish woman from Valencia, Valencian-influenced Spanish, bright and friendly, clear pronunciation.",
      m: "Spanish man from Valencia, Valencian accent, clear and upbeat."
    },
    canario: {
      f: "Spanish woman from the Canary Islands, Canarian accent, soft and flowing, similar to Latin American Spanish.",
      m: "Spanish man from Tenerife, Canarian Spanish, relaxed and friendly, resembles Caribbean Spanish."
    },
    castellano: {
      f: "Spanish woman from Castile, classic Castilian Spanish, clear 'c' and 'z' distinction, formal and articulate.",
      m: "Spanish man from Castile, pure Castilian accent, clear and formal."
    },
    // ── Portugal ─────────────────────────────────────────────
    lisboeta: {
      f: "Portuguese woman from Lisbon, European Portuguese, fast-paced Lisbon accent, uses 'pá', 'fixe', 'epá' naturally.",
      m: "Portuguese man from Lisbon, crisp Lisboeta accent, direct and energetic, uses 'pá' and 'tipo'."
    },
    portuense: {
      f: "Portuguese woman from Porto, Northern Portuguese accent, stronger and more open vowels, uses 'mano' and 'bué'.",
      m: "Portuguese man from Porto, distinct Portuense accent, confident and warm, natural use of 'mano'."
    },
    minhoto: {
      f: "Portuguese woman from Minho (Braga), Minho regional accent, warm Northern Portuguese, slightly musical intonation.",
      m: "Portuguese man from Braga, Minho accent, clear and warm, traditional Northern Portuguese."
    },
    alentejano: {
      f: "Portuguese woman from Alentejo, slow and melodic Southern Portuguese accent, very warm, relaxed speech.",
      m: "Portuguese man from Évora, Alentejano accent, deep and unhurried, very warm tone."
    },
    algarvio: {
      f: "Portuguese woman from Algarve, Southern Portuguese with slight Algarvian lilt, friendly and relaxed.",
      m: "Portuguese man from Faro, Algarvio accent, warm Southern Portuguese."
    }
  },

  // ── Parâmetros ElevenLabs por sotaque ─────────────────────
  EL_PARAMS: {
    brasiliense: { stability:0.50, similarity_boost:0.75, style:0.25 },
    nordestino:  { stability:0.28, similarity_boost:0.82, style:0.72 },
    carioca:     { stability:0.38, similarity_boost:0.78, style:0.58 },
    paulistano:  { stability:0.55, similarity_boost:0.72, style:0.22 },
    mineiro:     { stability:0.62, similarity_boost:0.80, style:0.42 },
    gaucho:      { stability:0.48, similarity_boost:0.78, style:0.48 },
    nortista:    { stability:0.32, similarity_boost:0.82, style:0.62 },
    catarinense: { stability:0.52, similarity_boost:0.76, style:0.36 },
  },

  // ── Velocidade browser TTS por sotaque (fallback) ─────────
  BR_RATE: {
    brasiliense:1.45, nordestino:1.55, carioca:1.45,
    paulistano:1.62, mineiro:1.22, gaucho:1.32,
    nortista:1.50, catarinense:1.38
  },

  // ── FALAR — ponto de entrada ──────────────────────────────
  async falar(texto, perfil, onStart, onEnd) {
    this.parar();
    if (this.apiKey) {
      try {
        await this._falarEL(texto, perfil, onStart, onEnd);
        return;
      } catch(e) {
        console.warn("ElevenLabs:", e.message);
      }
    }
    this._falarBrowser(texto, perfil, onStart, onEnd);
  },

  // ── ElevenLabs TTS ────────────────────────────────────────
  async _falarEL(texto, perfil, onStart, onEnd) {
    const sotaque = perfil?.sotaque || "brasiliense";
    const genero  = perfil?.genero  || "feminino";
    const humor   = perfil?.humor   || "normal";
    const voiceId = this.getVoiceId(sotaque, genero);
    const p       = this.EL_PARAMS[sotaque] || this.EL_PARAMS.brasiliense;
    const speedMod = humor==="direto"?1.12 : humor==="zen"?0.88 : humor==="extrovertido"?1.06 : 1.0;

    const resp = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`,
      {
        method:"POST",
        headers:{ "xi-api-key":this.apiKey, "Content-Type":"application/json" },
        body: JSON.stringify({
          text: this._limpar(texto),
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability:p.stability, similarity_boost:p.similarity_boost,
                            style:p.style, use_speaker_boost:true }
        })
      }
    );
    if (!resp.ok) {
      const j = await resp.json().catch(()=>({}));
      throw new Error(j?.detail?.message || `HTTP ${resp.status}`);
    }
    const blob  = await resp.blob();
    const url   = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.playbackRate = speedMod;
    this.audioAtual    = audio;
    this.falando       = true;
    if (onStart) onStart();
    this._notificarFala(true);
    audio.onended = () => { this.falando=false; URL.revokeObjectURL(url); this._notificarFala(false); if(onEnd)onEnd(); };
    audio.onerror = () => { this.falando=false; URL.revokeObjectURL(url); this._notificarFala(false); if(onEnd)onEnd(); };
    audio.play();
  },

  // ── Locale por idioma da interface ────────────────────────
  LOCALE: { pt:"pt-BR", es:"es-ES", en:"en-US", ptpt:"pt-PT" },

  // ── Velocidade browser TTS por sotaque ES ─────────────────
  ES_RATE: {
    madrilenho:1.50, sevillano:1.30, andaluz:1.28, catalan:1.38,
    vasco:1.25, gallego:1.32, valenciano:1.40, canario:1.35,
    castellano:1.45, murciano:1.33, aragones:1.38, asturiano:1.30,
    extremenho:1.22, balear:1.35
  },

  // ── Velocidade browser TTS por sotaque PT ─────────────────
  PT_RATE: {
    lisboeta:1.38, portuense:1.45, minhoto:1.40, transmontano:1.22,
    alentejano:1.15, algarvio:1.32, acoriano:1.28, madeirense:1.30,
    beirao:1.25, coimbrão:1.35, ribatejano:1.32
  },

  // ── Browser TTS (fallback) ────────────────────────────────
  _falarBrowser(texto, perfil, onStart, onEnd) {
    const s = window.speechSynthesis; if(!s) return; s.cancel();
    const sotaque = perfil?.sotaque||"brasiliense";
    const genero  = perfil?.genero ||"feminino";
    const humor   = perfil?.humor  ||"normal";
    const idioma  = perfil?.idioma ||"pt";
    const pais    = perfil?.pais   ||"BR";
    const lang    = this.LOCALE[idioma] || this.LOCALE.pt;
    const prefixo = lang.split("-")[0];
    const baseRate = pais === "ES" ? (this.ES_RATE[sotaque]||1.40)
                   : pais === "PT" ? (this.PT_RATE[sotaque]||1.32)
                   : (this.BR_RATE[sotaque]||1.40);
    const rate    = baseRate * (humor==="direto"?1.1:humor==="zen"?0.88:1);
    const vozes   = s.getVoices().filter(v=>v.lang.startsWith(prefixo));
    let voz = genero==="feminino"
      ? vozes.find(v=>/ana|female|fem|maria/i.test(v.name))||vozes[0]
      : vozes.find(v=>/daniel|male|ricardo/i.test(v.name))||vozes[1]||vozes[0];
    const u    = new SpeechSynthesisUtterance(this._limpar(texto));
    if(voz) u.voice=voz; u.lang=lang; u.rate=rate;
    u.pitch    = genero==="feminino"?1.05:0.92; u.volume=1;
    u.onstart  = ()=>{ this.falando=true;  this._notificarFala(true);  if(onStart)onStart(); };
    u.onend    = ()=>{ this.falando=false; this._notificarFala(false); if(onEnd)onEnd();   };
    u.onerror  = ()=>{ this.falando=false; this._notificarFala(false); if(onEnd)onEnd();   };
    s.speak(u);
  },

  // ── ElevenLabs API helpers ────────────────────────────────

  // Valida a chave fazendo uma chamada de usuário
  async validarChave(key) {
    const r = await fetch("https://api.elevenlabs.io/v1/user", {
      headers:{ "xi-api-key": key }
    });
    if (!r.ok) throw new Error("Chave inválida");
    return await r.json();
  },

  // Busca vozes do usuário + vozes compartilhadas pt-BR
  async buscarVozes(key) {
    const headers = { "xi-api-key": key };
    // Vozes próprias do usuário
    const proprias = await fetch("https://api.elevenlabs.io/v1/voices", { headers })
      .then(r=>r.json()).then(d=>d.voices||[]).catch(()=>[]);
    // Vozes compartilhadas em português
    const compartilhadas = await fetch(
      "https://api.elevenlabs.io/v1/shared-voices?page_size=30&language=pt&sort=trending",
      { headers }
    ).then(r=>r.json()).then(d=>d.voices||[]).catch(()=>[]);

    return [...proprias, ...compartilhadas];
  },

  // Gera voz regional via Voice Design (cria voz nova na conta do usuário)
  async gerarVozRegional(sotaque, genero) {
    if (!this.apiKey) throw new Error("Configure a chave ElevenLabs primeiro");
    const g   = genero==="feminino"?"f":"m";
    const desc = this.DESC[sotaque]?.[g] || this.DESC.madrilenho?.[g] || this.DESC.lisboeta?.[g] || this.DESC.brasiliense[g];
    const _pais3 = (typeof STATE !== "undefined" ? STATE.perfil.pais : null) || "BR";
    const txt  = _pais3 === "ES"
      ? "¡Hola! Estoy analizando el tráfico ahora. ¡Puedes contar conmigo!"
      : _pais3 === "PT"
        ? "Olá! Estou a analisar o trânsito agora. Pode contar comigo!"
        : "Oi, estou analisando o trânsito agora. Pode contar comigo!";

    // Passo 1 — gerar preview
    const prev = await fetch("https://api.elevenlabs.io/v1/text-to-voice/create-previews", {
      method:"POST",
      headers:{ "xi-api-key":this.apiKey, "Content-Type":"application/json" },
      body: JSON.stringify({ voice_description:desc, text:txt })
    }).then(r=>r.json());

    const gvid = prev.previews?.[0]?.generated_voice_id;
    if (!gvid) throw new Error("ElevenLabs não retornou preview");

    // Passo 2 — salvar como voz permanente
    const saved = await fetch("https://api.elevenlabs.io/v1/text-to-voice/create", {
      method:"POST",
      headers:{ "xi-api-key":this.apiKey, "Content-Type":"application/json" },
      body: JSON.stringify({
        voice_name: `SL_${sotaque}_${genero}`,
        voice_description: desc,
        generated_voice_id: gvid
      })
    }).then(r=>r.json());

    if (!saved.voice_id) throw new Error("Falha ao salvar voz");
    // Persiste o voice_id para esse sotaque+gênero
    this.save({ [`vid_${sotaque}_${genero}`]: saved.voice_id });
    return saved.voice_id;
  },

  // ── Helpers ───────────────────────────────────────────────
  _limpar(t) {
    return t.replace(/[🎉🔥🚀😊😱🚨💨🏠💪😂😄⚠️📻🎙️👨‍⚕️🪖👨‍🍳🏋️🏗️🛍️👔⚖️🎓🚗🏛️🌵🏖️🏙️⛏️🐎🌿🌊✅❌●📍⏰🌅🏢]/gu,"")
             .replace(/\*\*/g,"").replace(/\s{2,}/g," ").trim();
  },
  parar() {
    const estavaFalando = this.falando;
    if(this.audioAtual){ this.audioAtual.pause(); this.audioAtual=null; }
    window.speechSynthesis?.cancel();
    this.falando=false;
    if (estavaFalando) this._notificarFala(false);
  },
  init(){}
};
